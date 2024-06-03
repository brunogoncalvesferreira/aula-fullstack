import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

import './App.css'

export function App() {
  const [users, setUsers] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    await axios
      .post("http://localhost:8080/users", {
        name,
        email,
      })
      .then(() => {
        alert("Usuário criado com sucesso!");
        getUsers();
        setName("");
        setEmail("");

      }).catch((error) => {
        console.log(error);
      });
  }

  async function getUsers() {
    const response = await axios.get("http://localhost:8080/users");
    const data = await response.data;
    setUsers(data);
  }

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="container">
      <form className="form">
        <input
          type="text"
          placeholder="nome"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={handleSubmit}>Enviar</button>
      </form>
      <div className="border-table">
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>Nome</th>
              <th>Email</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
