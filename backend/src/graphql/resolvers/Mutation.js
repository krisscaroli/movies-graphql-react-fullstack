import Movie_Catalog from "../../models/Movie_Catalog";
import User from "../../models/User";
import bcrypt from "bcrypt";

const jwt = require("jsonwebtoken");
const Mutation = {
  createMovie: async (_, { title, image, description, userCreated }) => {
    const newMovie = new Movie_Catalog({
      title,
      image,
      description,
      userCreated,
    });
    return await newMovie.save();
  },
  updateLikeMovie: async (_, { _id, likes }) => {
    return await Movie_Catalog.findOneAndUpdate(
      { _id },
      {
        $set: {
          likes,
        },
      },
      {
        new: true,
      }
    );
  },

  deleteMovie: async (_, { _id }) => {
    return await Movie_Catalog.findByIdAndRemove(_id);
  },
  createUser: async (_, { username, email, password }) => {
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      throw new Error("User ya registrado con ese email " + email);
    }

    var encryptedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username: username,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    const token = jwt.sign({ user_id: newUser._id, email }, "UNSAFESTRING", {
      expiresIn: "2h",
    });

    newUser.token = token;

    return await newUser.save();
  },

  login: async (_, { email, password }) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("Email no encontrado");
      }

      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign({ user_id: user._id, email }, "UNSAFESTRING", {
          expiresIn: "2h",
        });

        // save user token
        user.token = token;

        return {
          id: user.id,
          ...user._doc,
        };
      } else {
        throw new Error("Incorrect password", "INCORRECT_PASSWORD");
      }
    } catch (e) {
      throw new Error(e);
    }
  },
};

export default Mutation;
