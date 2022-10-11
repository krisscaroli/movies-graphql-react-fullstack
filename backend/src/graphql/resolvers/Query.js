import Movie_Catalog from "../../models/Movie_Catalog";
const Query = {
  getMovieCatalogs: async () => {
    return await Movie_Catalog.find();
  },
  getMovieByUser: async (_, { userCreated }) => {
    console.log(userCreated);

    return (await userCreated)
      ? Movie_Catalog.find({ userCreated })
      : Movie_Catalog.find();
  },
};

export default Query;
