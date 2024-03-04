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
import { useState } from "react";
import "./SignUp.css";
import { Link } from "react-router-dom";
const SignUp = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };
  return (
    <div className="signUp-container">
      <Paper style={{ padding: "20px" }} elevation={3}>
        {" "}
        <Typography variant="h4" align="center" gutterBottom>
          SignUp
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
        <div className="btn-signUp-container">
          <Button
            sx={{
              backgroundColor: "#9b1fe9",
              width: "100%",
              color: "white",
            }}>
            SignUp
          </Button>
        </div>
        <p style={{ textAlign: "center" }}>
          Don't have an account?{" "}
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
          <Google></Google>
        </div>
      </Paper>
    </div>
  );
};

export default SignUp;
