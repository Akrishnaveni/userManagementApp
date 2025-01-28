import React, { useState, useEffect } from "react";
import "./UserForm.css"; // Added CSS file

const UserForm = ({ onAdd, onUpdate, selectedUser, clearSelection }) => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedUser) {
      setUser(selectedUser);
    } else {
      setUser({ firstName: "", lastName: "", email: "", department: "" });
    }
  }, [selectedUser]);

  const validateForm = () => {
    let formErrors = {};
    if (!user.firstName) formErrors.firstName = "First Name is required.";
    if (!user.lastName) formErrors.lastName = "Last Name is required.";
    if (!user.email || !/\S+@\S+\.\S+/.test(user.email)) {
      formErrors.email = "Valid email is required.";
    }
    if (!user.department) formErrors.department = "Department is required.";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (selectedUser) {
        onUpdate(user);
      } else {
        onAdd(user);
      }
      clearSelection(); // Hide the form after adding or updating user
    }
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <h2>{selectedUser ? "Edit User" : "Add User"}</h2>
      <input
        type="text"
        placeholder="First Name"
        value={user.firstName}
        onChange={(e) => setUser({ ...user, firstName: e.target.value })}
        required
      />
      {errors.firstName && <span>{errors.firstName}</span>}

      <input
        type="text"
        placeholder="Last Name"
        value={user.lastName}
        onChange={(e) => setUser({ ...user, lastName: e.target.value })}
        required
      />
      {errors.lastName && <span>{errors.lastName}</span>}

      <input
        type="email"
        placeholder="Email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        required
      />
      {errors.email && <span>{errors.email}</span>}

      <input
        type="text"
        placeholder="Department"
        value={user.department}
        onChange={(e) => setUser({ ...user, department: e.target.value })}
        required
      />
      {errors.department && <span>{errors.department}</span>}

      <button type="submit">{selectedUser ? "Update" : "Add"} User</button>
    </form>
  );
};

export default UserForm;
