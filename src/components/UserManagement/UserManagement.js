import React, { useState, useEffect } from "react";
import axios from "axios";
import UserList from "../UserList/UserList";
import UserForm from "../UserForm/UserForm";
import "./UserManagement.css"; // Added CSS file

const API_URL = "https://jsonplaceholder.typicode.com/users";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5); // You can change the number of users per page

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      const formattedUsers = response.data.map((user) => {
        const [firstName, lastName] = user.name.split(" ");
        return {
          ...user,
          firstName: firstName || "",
          lastName: lastName || "",
          department: user.company?.name || "N/A", // Defaulting department to company name
        };
      });
      setUsers(formattedUsers);
    } catch (error) {
      alert("Failed to fetch users.");
    }
  };

  const addUser = async (user) => {
    try {
      const response = await axios.post(API_URL, user);
      const [firstName, lastName] = response.data.name.split(" ");
      setUsers([...users, { 
        ...response.data,
        id: users.length + 1, // Simulating a new ID
        firstName: firstName || "",
        lastName: lastName || "",
        department: user.department || "N/A",
      }]);
      setShowForm(false); // Hide the form after adding user
    } catch (error) {
      alert("Failed to add user.");
    }
  };

  const updateUser = (user) => {
    setUsers(users.map((u) => (u.id === user.id ? user : u)));
  };

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const paginateUsers = (users, currentPage, usersPerPage) => {
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    return users.slice(indexOfFirstUser, indexOfLastUser);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const paginatedUsers = paginateUsers(users, currentPage, usersPerPage);

  return (
    <div className="user-management">
      <h1>User Management</h1>
      {showForm ? (
        <UserForm
          user={selectedUser}
          onAdd={(user) => addUser(user)}
          onUpdate={(user) => updateUser(user)}
          clearSelection={() => setShowForm(false)} // Hide form after adding or updating user
        />
      ) : (
        <button
          className="new-user-btn"
          onClick={() => {
            setSelectedUser(null);
            setShowForm(true);
          }}
        >
          New User
        </button>
      )}
      <UserList
        users={paginatedUsers}
        onEdit={(updatedUser) => updateUser(updatedUser)}
        onDelete={(id) => deleteUser(id)}
      />
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage * usersPerPage >= users.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserManagement;
