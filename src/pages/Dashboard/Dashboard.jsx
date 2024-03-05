import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const { isAdmin } = useContext(AuthContext);
  console.log(isAdmin);

  useEffect(() => {
    fetch("https://task-w3-server.vercel.app/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleMakeAdmin = (user) => {
    fetch(`https://task-w3-server.vercel.app/users/admin/${user._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          Swal.fire({
            title: `${user.name} is an Admin Now!`,
            icon: "success",
            confirmButtonText: "OK",
          });
        }
      });
  };

  return (
    <div style={{ padding: "0 20px" }}>
      <h1 style={{ marginBottom: "20px" }}>Dashboard</h1>
      {isAdmin ? <h2>Admin Home</h2> : <h2>User Home</h2>}

      {isAdmin ? (
        <>
          <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
            Manage Users
          </h1>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ textAlign: "center" }}>Name</TableCell>
                  <TableCell style={{ textAlign: "center" }}>Email</TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    Make Admin
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell style={{ textAlign: "center" }}>
                      {user.name}
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      {user.email}
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      {!user.isAdmin && (
                        <Button
                          variant="outlined"
                          onClick={() => handleMakeAdmin(user)}>
                          Make Admin
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <div>
          <h3 style={{ margin: "20px 0" }}>Welcome {user && user.name}</h3>
          Email: {user && user.email}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
