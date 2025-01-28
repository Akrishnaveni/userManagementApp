import React, { useState } from "react";
import "./UserList.css"; // Added CSS file

const UserList = ({ users, onEdit, onDelete }) => {
  const [editingUserId, setEditingUserId] = useState(null);
  const [editingUserData, setEditingUserData] = useState({});

  const handleEditClick = (user) => {
    setEditingUserId(user.id);
    setEditingUserData(user); // Initialize editing data
  };

  const handleInputChange = (field, value) => {
    setEditingUserData({ ...editingUserData, [field]: value });
  };

  const handleSave = () => {
    onEdit(editingUserData);
    setEditingUserId(null); // Exit editing mode
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  return (
    <div className="user-list">
      <h2>User List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                {editingUserId === user.id ? (
                  <input
                    type="text"
                    value={editingUserData.firstName}
                    disabled // Prevent changing the first name
                  />
                ) : (
                  user.firstName
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <input
                    type="text"
                    value={editingUserData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    onKeyPress={handleKeyPress}
                  />
                ) : (
                  user.lastName
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <input
                    type="email"
                    value={editingUserData.email}
                    onChange={(e) =>
                      handleInputChange("email", e.target.value)
                    }
                    onKeyPress={handleKeyPress}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <input
                    type="text"
                    value={editingUserData.department}
                    onChange={(e) =>
                      handleInputChange("department", e.target.value)
                    }
                    onKeyPress={handleKeyPress}
                  />
                ) : (
                  user.department
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <button onClick={handleSave}>Save</button>
                ) : (
                  <button onClick={() => handleEditClick(user)}>Edit</button>
                )}
                <button onClick={() => onDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
