import Paper from "@mui/material/Paper";
import "./Login.css";
import {
  Button,
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
const Login = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };
  const clientId =
    "530113864987-ihglodi7irh0c5ito7m6kk0bvlieoqtm.apps.googleusercontent.com";
  const { setUser, user } = useContext(AuthContext);

  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({ clientId: clientId });
    });
  }, []);
  const { signIn } = useGoogleLogin({
    clientId:
      "530113864987-ihglodi7irh0c5ito7m6kk0bvlieoqtm.apps.googleusercontent.com",
    onSuccess: (response) => {
      console.log("Google Sign-In Success:", response);
      if (response?.profileObj) {
        setUser(response.profileObj);
        fetch("http://localhost:5000/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.insertedId) {
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
          <div className="input-container">
            <InputLabel
              style={{ color: "black", fontSize: "14px", marginBottom: "none" }}
              htmlFor="email">
              Email
            </InputLabel>
            <TextField
              style={{ marginBottom: "20px" }}
              id="email"
              type="email"
              placeholder="Enter Your Email"
              variant="standard"
              autoComplete="new-password"
              fullWidth
            />
          </div>
          <div className="input-container">
            <InputLabel
              style={{ color: "black", fontSize: "14px", marginBottom: "none" }}
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
            <Button
              sx={{
                backgroundColor: "#9b1fe9",
                width: "100%",
                color: "white",
              }}>
              Login
            </Button>
          </div>
          <p style={{ textAlign: "center" }}>
            Don't have an account?{" "}
            <Link style={{ textDecoration: "none" }} to="/signUp">
              {" "}
              <span style={{ color: "#9b1fe9" }}>SignUp</span>
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
    </>
  );
};

export default Login;
