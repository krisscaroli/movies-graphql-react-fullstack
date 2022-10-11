# movies-graphql-react-fullstack
Se require desarrollar una aplicacion full-stack para un nuevo proveedor de streaming de peliculas llamado Oura Movies , la consultoria consiste en desarrollar un backend que nos permita servir la informacion de las peliculas atreves de una API REST basada en Node JS y GraphQL. 

![alt text](https://i.ibb.co/PFCv7vH/mern.jpg)

# Backend: Write your query or mutation here
query getMovieCatalogs{
  getMovieCatalogs{
    _id
    title
    image
    description
    likes
    userCreated
  }
}

mutation createMovie ($title: String!, $image: String!,  $description: String!, $userCreated: String!){
  createMovie(title:$title, image: $image, description:$description, userCreated:$userCreated){
    _id
    title
  }
}

mutation deleteMovie($_id:ID){
  deleteMovie(_id:$_id){
    _id
    title
  }
}

mutation updateLikeMovie($_id:ID!,$likes:Int!){
  updateLikeMovie(_id:$_id,likes:$likes){
    _id
    title
    likes
  }
}

mutation createUser($username:String!,$email:String!,$password:String!){
  createUser(username:$username,email:$email,password:$password){
    _id
  }
}

query getMovieByUser($userCreated:String){
  getMovieByUser(userCreated:$userCreated){
    _id
    title
    image
    description
    likes
    userCreated
  }
}
