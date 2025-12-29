import { useState, useEffect } from "react";

const initialState = { name: "", email: "" };

export default function UserForm({ onSubmit, editableUser }) {
  const [user, setUser] = useState(initialState);

  useEffect(() => {
    if (editableUser) setUser(editableUser);
  }, [editableUser]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(user);
    setUser(initialState);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <input
        name="name"
        placeholder="Enter name"
        value={user.name}
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Enter email"
        value={user.email}
        onChange={handleChange}
      />

      <button type="submit">
        {editableUser ? "Update User" : "Add User"}
      </button>
    </form>
  );
}

