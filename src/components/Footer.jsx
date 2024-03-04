import { Grid, Paper, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Paper
      elevation={1}
      style={{ padding: "20px", marginTop: "20px", margin: 0 }}>
      <Grid container justifyContent={"center"}>
        <Typography>© copyright 2022 - All Right Reserved by Faucet</Typography>
      </Grid>
    </Paper>
  );
};

export default Footer;
