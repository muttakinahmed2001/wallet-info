import WalletForm from "../components/WalletForm";

const Home = () => {
  return (
    <div>
      <div
        style={{
          backgroundColor: "#9b1fe9",
          color: "white",
          padding: "30px",
          textAlign: "center",
          marginBottom: "50px",
        }}>
        <h4>Notice</h4>
      </div>

      <div style={{ padding: "20px" }}>
        <h1
          style={{
            color: "#9b1fe9",
            marginBottom: "20px",
            fontSize: "35px",
            fontWeight: "600",
          }}>
          Request testnet LINK
        </h1>
        <p style={{ color: "#6d7380", lineHeight: "25px" }}>
          Get testnet LINK for an account on one of the supported blockchain
          testnets so you can create and test your own oracle and Chainlinked
          smart contract
        </p>
      </div>
      <WalletForm></WalletForm>
    </div>
  );
};

export default Home;
