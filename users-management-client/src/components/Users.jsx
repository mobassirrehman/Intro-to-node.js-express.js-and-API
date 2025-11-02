import React, { use, useState } from "react";

const Users = ({ usersPromise }) => {
  const initialUsers = use(usersPromise);
  const [users, setUsers] = useState(initialUsers);

  const handleAddUser = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    console.log(name, email);

    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("after adding user", data);
        const newUsers = [...users, data];
        setUsers(newUsers);
        e.target.reset();
      });
  };
  return (
    <div>
      <div>
        <h2>Add a user</h2>
        <form onSubmit={handleAddUser}>
          <input type="text" name="name" />
          <br />
          <input type="email" name="email" id="" />
          <br />
          <button>Add user</button>
        </form>
      </div>
      {users.map((user) => (
        <p key={user.id}>
          {user.name} Email: {user.email}
        </p>
      ))}
    </div>
  );
};

export default Users;
