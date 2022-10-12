import React, { useContext, useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Navigate, useNavigate } from "react-router-dom";
import { GET_MOVIECATALOG } from "./MovieCatalog";
import { AuthContext } from "../context/authContext";

export default function MovieForm() {
  const navigate = useNavigate();
  const CREATE_MOVIE = gql`
    mutation createMovie(
      $title: String!
      $image: String!
      $description: String!
      $userCreated: String!
    ) {
      createMovie(
        title: $title
        image: $image
        description: $description
        userCreated: $userCreated
      ) {
        _id
        title
      }
    }
  `;

  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  let [userCreated, setUserCreated] = useState("");
  const { user } = useContext(AuthContext);

  if (user && user.username) {
    userCreated = user.username;
    console.log("user ", user.username);
  }
  const [createMovie] = useMutation(CREATE_MOVIE, {
    refetchQueries: [{ query: GET_MOVIECATALOG, variables: { userCreated } }],
  });
  return (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <div className="card">
          <div className="card-body">
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                //creating the new document in the collection
                await createMovie({
                  variables: { title, image, description, userCreated },
                });
                //redirect to the list
                navigate("/");
              }}
            >
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="imagen" className="form-label">
                  Imagen
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="imagen"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="descripcion" className="form-label">
                  Descripción
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="descripcion"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-success">
                Guardar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
