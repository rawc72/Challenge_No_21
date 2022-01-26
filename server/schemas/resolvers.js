const User = require("../models/User");
const Book = require("../models/Book");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context, info) => {
      const { id, username } = args;
      const user = await User.findOne({
        $or: [{ _id: id }, { username: username }],
      });

      if (!user) {
        return null;
      }

      const token = signToken(user);

      return {
        _id: user._id,
        username: user.username,
        email: user.email,
        password: user.password,
        savedBooks: [...user.savedBooks],
        bookCount: user.bookCount,
      };
    },
  },
  Mutation: {
    login: async (parent, args, context, info) => {
      const { email, password } = args;

      const user = await User.findOne({ email: email });

      if (!user) {
        return null;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        return null;
      } else {
        const token = signToken(user);

        return {
          user: {
            _id: user._id,
            username: user.username,
            email: user.email,
            password: user.password,
            savedBooks: [...user.savedBooks],
            bookCount: user.bookCount,
          },
          token,
        };
      }
    },
    addUser: async (parent, args, context, info) => {
      const { username, email, password } = args.input;
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return {
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          password: user.password,
          savedBooks: [...user.savedBooks],
          bookCount: user.bookCount,
        },
        token,
      };
    },
    saveBook: async (parent, args, context, info) => {
      const { authors, description, bookId, image, link, title } = args.input;

      if (!context.user) return null;

      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        {
          $addToSet: {
            savedBooks: { authors, description, bookId, image, link, title },
          },
        },
        { new: true, runValidators: true }
      );

      return updatedUser;
    },
    removeBook: async (parent, args, context, info) => {
      const { bookId } = args;

      if (!context.user) return null;

      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: { bookId: bookId } } },
        { new: true }
      );

      return updatedUser;
    },
  },
};

module.exports = resolvers;
