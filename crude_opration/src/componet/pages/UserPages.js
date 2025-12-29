import { useEffect, useState } from "react";
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser
} from "../services/userService";

import UserForm from "../forms/Userform";
import UserTable from "../forms/UserTable";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [editableUser, setEditableUser] = useState(null);

  const loadUsers = () =>
    getUsers().then((res) => setUsers(res.data));

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSubmit = async (user) => {
    if (editableUser) {
      await updateUser(editableUser.id, user);
      setEditableUser(null);
    } else {
      await addUser(user);
    }
    loadUsers();
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    loadUsers();
  };

  return (
    <div>
      <h2>React CRUD Example</h2>

      <UserForm
        onSubmit={handleSubmit}
        editableUser={editableUser}
      />

      <UserTable
        users={users}
        onEdit={setEditableUser}
        onDelete={handleDelete}
      />
    </div>
  );
}
