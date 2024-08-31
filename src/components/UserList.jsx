import "regenerator-runtime/runtime";
import React, { useState } from "react";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("https://reqres.in/api/users");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setUsers(data.data);
    } catch (err) {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button className="btn" onClick={fetchUsers}>
        Get User List
      </button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {users.length === 0 && !loading && !error && <p>No data found</p>}
      {users.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Avatar</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <img
                    src={user.avatar}
                    alt={`${user.first_name} ${user.last_name}`}
                    style={{ width: 50, height: 50, borderRadius: "50%" }}
                  />
                </td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;
