import React, { useContext, useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export default function Login() {
  const navigate = useNavigate();
  const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        username
        email
        token
      }
    }
  `;

  const context = useContext(AuthContext);
  const [errors, setErrors] = useState([]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useMutation(LOGIN, {
    update(_, { data: { login: userData } }) {
      console.log(userData);
      context.login(userData);
      navigate("/");
    },
    variables: { email, password },
  });

  const loginCallback = async function () {
    await login({ variables: { email, password } });
  }.constructor;

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        //creating the new document in the collection
        await login({ variables: { email, password } });
        //redirect to the list
        navigate("/");
      }}
    >
      <div className="mb-3">
        <label htmlFor="user" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="user"
          aria-describedby="emailHelp"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}
