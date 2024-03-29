import {
  AppBar,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import "./Header.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { useGoogleLogout } from "react-google-login";
import Swal from "sweetalert2";
import CloseIcon from "@mui/icons-material/Close";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("Ethereum Kovan");
  const [menuIcon, setMenuIcon] = useState(" /images/menuIcon1.webp");
  const [isUserOpen, setIsUserOpen] = useState(false);

  const { setUser } = useContext(AuthContext);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSelectItem = (value, icon) => {
    setSelectedValue(value);
    setIsOpen(false);
    setMenuIcon(icon);
  };
  const { signOut } = useGoogleLogout({
    clientId:
      "530113864987-ihglodi7irh0c5ito7m6kk0bvlieoqtm.apps.googleusercontent.com",
    onLogoutSuccess: () => {
      console.log("user logged out successfully");
      setUser(false);
      Swal.fire({
        title: "You are successfully logged out",
        icon: "success",
        confirmButtonText: "OK",
      });
      setIsUserOpen(false);
    },
    onFailure: (error) => {
      console.error("LoggedOut fail", error);
    },
  });

  const handleLogout = () => {
    if (user?.googleId) {
      signOut();
    } else {
      setUser(null);
      Swal.fire({
        title: "You are successfully logged out",
        icon: "success",
        confirmButtonText: "OK",
      });
      setIsUserOpen(false);
    }
  };

  const handleUserToggle = () => {
    setIsUserOpen(!isUserOpen);
  };
  const { user } = useContext(AuthContext);
  console.log(user);
  console.log(isUserOpen);
  return (
    <>
      <AppBar
        position="static"
        sx={{
          background: "white",
          boxShadow: "none",
        }}>
        <Toolbar sx={{ justify: "space-between" }}>
          <Typography
            component="div"
            sx={{
              flexGrow: 1,
              color: "#9b1fe9",
              fontSize: "25px",
              fontWeight: "600",
            }}>
            Faucets
          </Typography>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}>
            <div className="dropdown-container">
              <button className="dropdown-button" onClick={handleToggle}>
                <p className="dropdown-button-items">
                  <img className="menuIcon" src={menuIcon} alt="" />
                  {selectedValue}
                  <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
                </p>
              </button>
              {isOpen && (
                <div className="dropdown-menu">
                  <div
                    className="dropdown-item"
                    onClick={() =>
                      handleSelectItem(
                        "Arbitrum Rinkeby",
                        "/images/menuIcon2.svg"
                      )
                    }>
                    <img
                      className="menuIcon"
                      src="/images/menuIcon2.svg"
                      alt=""
                    />
                    Arbitrum Rinkeby
                  </div>
                  <div
                    className="dropdown-item"
                    onClick={() =>
                      handleSelectItem(
                        "Avalanche Fuji",
                        "/images/menuIcon3.png"
                      )
                    }>
                    <img
                      className="menuIcon"
                      src="/images/menuIcon3.png"
                      alt=""
                    />
                    Avalanche Fuji
                  </div>
                  <div
                    className="dropdown-item"
                    onClick={() =>
                      handleSelectItem(
                        "BNB Chain Testnet",
                        "/images/menuIcon4.png"
                      )
                    }>
                    <img
                      className="menuIcon"
                      src="/images/menuIcon4.png"
                      alt=""
                    />
                    BNB Chain Testnet
                  </div>
                  <div
                    className="dropdown-item"
                    onClick={() =>
                      handleSelectItem(
                        "Ethereum Rinkeby",
                        "/images/menuIcon2.svg"
                      )
                    }>
                    <img
                      className="menuIcon"
                      src="/images/menuIcon2.svg"
                      alt=""
                    />{" "}
                    Ethereum Rinkeby
                  </div>
                  <div
                    className="dropdown-item"
                    onClick={() =>
                      handleSelectItem(
                        "Fantom Testnet",
                        "/images/menuIcon6.png"
                      )
                    }>
                    <img
                      className="menuIcon"
                      src="/images/menuIcon6.png"
                      alt=""
                    />
                    Fantom Testnet
                  </div>
                  <div
                    className="dropdown-item"
                    onClick={() =>
                      handleSelectItem(
                        "Harmony Testnet",
                        "/images/menuIcon8.png"
                      )
                    }>
                    <img
                      className="menuIcon"
                      src="/images/menuIcon8.png"
                      alt=""
                    />
                    Harmony Testnet
                  </div>
                  <div
                    className="dropdown-item"
                    onClick={() =>
                      handleSelectItem(
                        "POA Network Sokol",
                        "/images/menuIcon1.webp"
                      )
                    }>
                    <img
                      className="menuIcon"
                      src="/images/menuIcon1.webp"
                      alt=""
                    />{" "}
                    POA Network Sokol
                  </div>
                  <div
                    className="dropdown-item"
                    onClick={() =>
                      handleSelectItem(
                        "Polygon Mumbai",
                        "/images/menuIcon8.png"
                      )
                    }>
                    <img
                      className="menuIcon"
                      src="/images/menuIcon8.png"
                      alt=""
                    />{" "}
                    Polygon Mumbai
                  </div>
                </div>
              )}
            </div>
            <button className="wallet-button" onClick={handleOpenModal}>
              <AccountBalanceWalletIcon></AccountBalanceWalletIcon>
              Connect Wallet
            </button>
            <Dialog open={openModal} onClose={handleCloseModal}>
              <DialogTitle>
                <IconButton
                  onClick={handleCloseModal}
                  sx={{ position: "absolute", right: 8, top: 8 }}>
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <DialogContent>
                <Typography style={{ fontSize: "25px", fontWeight: "600" }}>
                  Connect your wallet here
                </Typography>
                <div style={{ display: "flex", gap: "10px" }}>
                  <div
                    style={{
                      padding: "20px",
                      backgroundColor: "#f5f7fd",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "18px",
                      fontWeight: "600",
                      color: "#9b1fe9",
                      margin: "10px",
                    }}>
                    <img
                      style={{ height: "100px", width: "100px" }}
                      src="/images/modal1.png"
                      alt=""
                    />
                    MetaMask
                  </div>
                  <div
                    style={{
                      padding: "20px",
                      backgroundColor: "#f5f7fd",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "18px",
                      fontWeight: "600",
                      color: "#9b1fe9",
                      margin: "10px",
                    }}>
                    <img
                      style={{ height: "100px", width: "100px" }}
                      src="/images/modal2.svg"
                      alt=""
                    />
                    WalletConnect
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <div className="user-dropdown-container">
              <button className="btn-user" onClick={handleUserToggle}>
                <AccountCircleOutlinedIcon></AccountCircleOutlinedIcon>
              </button>

              {isUserOpen && (
                <div className="user-dropdown-menu">
                  {user ? (
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={handleLogout}
                      className="user-dropdown-item">
                      LogOut
                    </div>
                  ) : (
                    <Link style={{ textDecoration: "none" }} to={"/login"}>
                      <div className="user-dropdown-item">Login</div>
                    </Link>
                  )}
                  <Link style={{ textDecoration: "none" }} to="/signUp">
                    {" "}
                    <div className="user-dropdown-item">SignUp</div>
                  </Link>
                  {user ? (
                    <Link to="/dashboard" style={{ textDecoration: "none" }}>
                      {" "}
                      <div className="user-dropdown-item">Dashboard</div>
                    </Link>
                  ) : (
                    ""
                  )}
                  <Link style={{ textDecoration: "none" }} to="/faq">
                    <div className="user-dropdown-item">FAQ</div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
