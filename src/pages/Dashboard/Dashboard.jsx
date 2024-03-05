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
import { useEffect, useState } from "react";

const Dashboard = () => {
  const isAdmin = true;
  const [users, setUsers] = useState([]);
  console.log(users);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div style={{ padding: "0 20px" }}>
      <h1 style={{ marginBottom: "20px" }}>Dashboard</h1>
      {isAdmin ? <h2>Admin Home</h2> : <h2>User Home</h2>}

      {isAdmin && (
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
                          onClick={() => handleMakeAdmin(user.id)}>
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
      )}
    </div>
  );
};

export default Dashboard;
