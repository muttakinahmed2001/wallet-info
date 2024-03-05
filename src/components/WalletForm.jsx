import {
  Button,
  Container,
  InputLabel,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";

const WalletForm = () => {
  function onChange(value) {
    console.log("Captcha value:", value);
  }

  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  return (
    <div>
      <Container maxWidth="md" style={{ paddingTop: 20 }}>
        <Paper style={{ padding: 20, backgroundColor: "white" }}>
          <div
            style={{
              backgroundColor: "#eef2fe",
              padding: 10,
              marginBottom: 20,
            }}>
            <span
              style={{
                fontWeight: "initial",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "4",
              }}>
              <ReportProblemIcon
                style={{ width: "20px", color: "#9b1fe9" }}></ReportProblemIcon>
              Your wallet is connected to Ethereum Kovan, so you are requesting
              Ethereum Kovan Link/ETH.
            </span>
          </div>

          <form>
            <div>
              <InputLabel
                style={{ color: "#9b1fe9", padding: "2px", fontSize: "20px" }}
                htmlFor="wallet address">
                Wallet Address
              </InputLabel>
              <TextField fullWidth placeholder="Your Wallet address" />
            </div>
            <InputLabel
              style={{
                color: "#9b1fe9",
                padding: "2px",
                fontSize: "20px",
                marginTop: "20px",
              }}
              htmlFor="Request Type">
              Request Type
            </InputLabel>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                marginTop: 10,
              }}>
              <div>
                <TextField placeholder="20 Test Link" />
              </div>
              <div>
                <TextField placeholder="0.5 ETH" />
              </div>
            </div>
            <div style={{ marginTop: "20px" }}>
              <ReCAPTCHA
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                onChange={onChange}
              />
            </div>

            <Button
              style={{
                padding: "10px 12px",
                marginTop: "20px",
                fontSize: "bold",
                backgroundColor: "#9b1fe9",
                color: "white",
              }}
              variant="contained"
              color="primary">
              Send Request
            </Button>
          </form>

          <h3
            style={{
              fontWeight: "600",
              marginTop: "20px",
              marginBottom: "20px",
            }}>
            Request History
          </h3>

          <div style={{ display: "flex" }}>
            <Button
              style={{
                padding: "3px 5px",
                border: "1px solid #ddd",
                fontSize: "small",
                backgroundColor: selectedButton === "eth" ? "blue" : "inherit",
                color: selectedButton === "eth" ? "white" : "inherit",
              }}
              onClick={() => handleButtonClick("eth")}>
              ETH Transaction History
            </Button>
            <Button
              style={{
                padding: "3px 5px",
                border: "1px solid #ddd",
                fontSize: "normal",
                backgroundColor:
                  selectedButton === "testlink" ? "blue" : "inherit",
                color: selectedButton === "testlink" ? "white" : "inherit",
              }}
              onClick={() => handleButtonClick("testlink")}>
              Testlink Transaction History
            </Button>
          </div>

          <TableContainer
            style={{ marginTop: 20, width: "50%", border: "1px solid #ddd" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{
                      borderRight: "1px solid #ddd",
                      fontWeight: "600",
                    }}>
                    Sr
                  </TableCell>
                  <TableCell
                    style={{
                      borderRight: "1px solid #ddd",
                      fontWeight: "600",
                    }}>
                    Time
                  </TableCell>
                  <TableCell
                    style={{
                      borderRight: "1px solid #ddd",
                      fontWeight: "600",
                    }}>
                    Amount
                  </TableCell>
                  <TableCell
                    style={{
                      borderRight: "1px solid #ddd",
                      fontWeight: "600",
                    }}>
                    Hash
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {" "}
                <TableRow>
                  <TableCell style={{ borderRight: "1px solid #ddd" }}>
                    1
                  </TableCell>
                  <TableCell style={{ borderRight: "1px solid #ddd" }}>
                    08:30 AM
                  </TableCell>
                  <TableCell style={{ borderRight: "1px solid #ddd" }}>
                    748
                  </TableCell>
                  <TableCell style={{ borderRight: "1px solid #ddd" }}>
                    7s7effkeurusue4
                  </TableCell>
                </TableRow>{" "}
                <TableRow>
                  <TableCell style={{ borderRight: "1px solid #ddd" }}>
                    2
                  </TableCell>
                  <TableCell style={{ borderRight: "1px solid #ddd" }}>
                    10:23 AM
                  </TableCell>
                  <TableCell style={{ borderRight: "1px solid #ddd" }}>
                    974
                  </TableCell>
                  <TableCell style={{ borderRight: "1px solid #ddd" }}>
                    sfe7r7sr4fer
                  </TableCell>
                </TableRow>{" "}
                <TableRow>
                  <TableCell style={{ borderRight: "1px solid #ddd" }}>
                    3
                  </TableCell>
                  <TableCell style={{ borderRight: "1px solid #ddd" }}>
                    11:10 AM
                  </TableCell>
                  <TableCell style={{ borderRight: "1px solid #ddd" }}>
                    874
                  </TableCell>
                  <TableCell style={{ borderRight: "1px solid #ddd" }}>
                    s4e7s8er
                  </TableCell>
                </TableRow>{" "}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </div>
  );
};

export default WalletForm;
