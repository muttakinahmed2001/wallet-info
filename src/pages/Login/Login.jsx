import Paper from "@mui/material/Paper";
import "./Login.css";
import {
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Google, Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { useGoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import Swal from "sweetalert2";
import axios from "axios";
const Login = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [error, setError] = useState("");
  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };
  const clientId =
    "530113864987-ihglodi7irh0c5ito7m6kk0bvlieoqtm.apps.googleusercontent.com";
  const { setUser } = useContext(AuthContext);

  //  email login
  const handleEmailLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    axios
      .post("http://localhost:5000/login", { email, password })
      .then((result) => {
        if (result.data.status === "Email is not registered") {
          setError("Email is not registered");
        } else if (result.data.status === "Success") {
          Swal.fire({
            title: "You are successfully logged in",
            icon: "success",
            confirmButtonText: "OK",
          });
          setUser(result.data.user);
          setError("");
        } else {
          setError("Password is incorrect");
        }
      });
  };
  // google login
  useEffect(() => {
    const initializeAuth2 = async () => {
      let auth2 = gapi.auth2.getAuthInstance();

      if (!auth2) {
        auth2 = await gapi.auth2.init({ clientId: clientId });
      }
    };

    initializeAuth2();
  }, []);

  const { signIn } = useGoogleLogin({
    clientId:
      "530113864987-ihglodi7irh0c5ito7m6kk0bvlieoqtm.apps.googleusercontent.com",
    onSuccess: (response) => {
      console.log("Google Sign-In Success:", response);
      if (response?.profileObj) {
        axios
          .post("http://localhost:5000/users", response.profileObj)

          .then((res) => {
            console.log(res.data);
            if (res.data.insertedId) {
              Swal.fire({
                title: "You are successfully logged in",
                icon: "success",
                confirmButtonText: "OK",
              });
            }
          });
      }
    },
    onFailure: (error) => {
      console.error("Google Sign-In Failure:", error);
    },
  });

  return (
    <>
      <div className="login-container">
        <Paper style={{ padding: "20px" }} elevation={3}>
          {" "}
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleEmailLogin}>
            <div className="input-container">
              <InputLabel
                style={{
                  color: "black",
                  fontSize: "14px",
                  marginBottom: "none",
                }}
                htmlFor="email">
                Email
              </InputLabel>
              <TextField
                style={{ marginBottom: "20px" }}
                id="email"
                type="email"
                name="email"
                placeholder="Enter Your Email"
                variant="standard"
                autoComplete="new-password"
                fullWidth
              />
              {error === "Email is not registered" && <p>{error}</p>}
            </div>
            <div className="input-container">
              <InputLabel
                style={{
                  color: "black",
                  fontSize: "14px",
                  marginBottom: "none",
                }}
                htmlFor="password">
                Password
              </InputLabel>
              <TextField
                id="password"
                type={isShowPassword ? "text" : "password"}
                placeholder="Enter Your Password"
                variant="standard"
                autoComplete="new-password"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword} edge="end">
                        {isShowPassword ? (
                          <VisibilityOff></VisibilityOff>
                        ) : (
                          <Visibility></Visibility>
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {error === "Password is incorrect" && <p>{error}</p>}
            </div>
            <div className="btn-login-container">
              <input
                style={{
                  backgroundColor: "#9b1fe9",
                  width: "100%",
                  color: "white",
                  padding: "10px 0",
                  borderRadius: "5px",
                  border: 0,
                }}
                type="submit"
                value="Login"
              />
            </div>
            <p style={{ textAlign: "center" }}>
              Don't have an account?{" "}
              <Link style={{ textDecoration: "none" }} to="/signUp">
                {" "}
                <span style={{ color: "#9b1fe9" }}>SignUp</span>
              </Link>
            </p>
          </form>
          <p style={{ textAlign: "center", margin: "20px 0" }}>Or</p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}>
            <Google onClick={signIn}></Google>
          </div>
        </Paper>
      </div>
    </>
  );
};

export default Login;
