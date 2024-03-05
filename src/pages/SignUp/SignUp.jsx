import { Google, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  IconButton,
  InputAdornment,
  InputLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import "./SignUp.css";
import { Link } from "react-router-dom";
import { useGoogleLogin } from "react-google-login";
import { AuthContext } from "../../providers/AuthProvider";
import { gapi } from "gapi-script";
import Swal from "sweetalert2";
import axios from "axios";
const SignUp = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };
  const clientId =
    "530113864987-ihglodi7irh0c5ito7m6kk0bvlieoqtm.apps.googleusercontent.com";
  const { setUser } = useContext(AuthContext);

  // Email login

  const handleEmailLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    axios
      .post("http://localhost:5000/users", { name, email, password })
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            title: "You have successfully signUp",
            icon: "success",
            confirmButtonText: "OK",
          });
          setUser(res.data);
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
        const userProfile = response.profileObj;
        setUser(userProfile);
        axios
          .post("http://localhost:5000/users", { userProfile })

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
    <div className="signUp-container">
      <Paper style={{ padding: "20px" }} elevation={3}>
        {" "}
        <Typography variant="h4" align="center" gutterBottom>
          SignUp
        </Typography>
        <form onSubmit={handleEmailLogin}>
          <div className="input-container">
            <InputLabel
              style={{
                color: "black",
                fontSize: "14px",
                marginBottom: "none",
              }}
              htmlFor="name">
              Name
            </InputLabel>
            <TextField
              style={{ marginBottom: "20px" }}
              id="name"
              type="name"
              name="name"
              placeholder="Enter Your Name"
              variant="standard"
              autoComplete="new-password"
              fullWidth
            />
          </div>
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
              value="SignUp"
            />
          </div>
        </form>
        <p style={{ textAlign: "center" }}>
          Already have an account?{" "}
          <Link style={{ textDecoration: "none" }} to={"/login"}>
            Login
          </Link>
        </p>
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
  );
};

export default SignUp;
