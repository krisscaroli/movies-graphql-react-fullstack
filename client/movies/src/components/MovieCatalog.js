import React, { useContext, useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export const GET_MOVIECATALOG = gql`
  query getMovieByUser($userCreated: String) {
    getMovieByUser(userCreated: $userCreated) {
      _id
      title
      image
      description
      likes
      userCreated
    }
  }
`;

const DELETE_MOVIE = gql`
  mutation deleteMovie($_id: ID) {
    deleteMovie(_id: $_id) {
      _id
      title
    }
  }
`;

const UPDATE_MOVIE = gql`
  mutation updateLikeMovie($_id: ID!, $likes: Int!) {
    updateLikeMovie(_id: $_id, likes: $likes) {
      _id
      title
      likes
    }
  }
`;

const MovieCatalog = () => {
  let [userCreated, setUserCreated] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  if (user && user.username) {
    userCreated = user.username;
    console.log("user ", user.username);
  }
  const [deleteMovie] = useMutation(DELETE_MOVIE, {
    refetchQueries: [{ query: GET_MOVIECATALOG, variables: { userCreated } }],
  });
  const [updateMovie] = useMutation(UPDATE_MOVIE, {
    refetchQueries: [{ query: GET_MOVIECATALOG, variables: { userCreated } }],
  });
  const { loading, error, data } = useQuery(GET_MOVIECATALOG, {
    variables: { userCreated },
  });
  if (error) {
    return <h1>Error:({error})</h1>;
  }

  if (data) {
    console.log(data);
  }

  return (
    <div className="row">
      {data &&
        data.getMovieByUser.map(({ _id, title, image, description, likes }) => (
          <div key={_id} className="col-md-4">
            <div key={_id} className="card m-2">
              <div key={_id} className="card-body">
                <h4>{title}</h4>
                <img src={image} className="img-fluid"></img>
                <p>{description}</p>

                <p>likes:{likes} </p>
              </div>
              {user ? (
                <>
                  <button
                    className="btn btn-success"
                    onClick={async (e) => {
                      // e.preventDefault();
                      likes = likes + 1;
                      console.log(likes);
                      //creating the new document in the collection
                      await updateMovie({ variables: { _id, likes } });
                      //redirect to the list
                      navigate("/");
                    }}
                  >
                    Like
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={async (e) => {
                      // e.preventDefault();
                      console.log({ _id });
                      //creating the new document in the collection
                      await deleteMovie({ variables: { _id } });
                      //redirect to the list
                      navigate("/");
                    }}
                  >
                    Delete
                  </button>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default MovieCatalog;
