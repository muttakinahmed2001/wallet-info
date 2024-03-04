import { AppBar, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import "./Header.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("Ethereum Kovan");
  const [menuIcon, setMenuIcon] = useState(" /images/menuIcon1.webp");

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const handleSelectItem = (value, icon) => {
    setSelectedValue(value);
    setIsOpen(false);
    setMenuIcon(icon);
  };
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
            <button className="wallet-button">
              <AccountBalanceWalletIcon></AccountBalanceWalletIcon>
              Connect Wallet
            </button>
            <button>user icon</button>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
