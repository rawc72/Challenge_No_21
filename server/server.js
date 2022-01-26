require("dotenv").config({ path: "./.env" });
const express = require("express");
const path = require("path");
const db = require("./config/connection");
const routes = require("./routes");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schemas/typeDefs");
const resolvers = require("./schemas/resolvers");
const { getUser } = require("./utils/auth");

const app = express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const authHeader = req.headers.authorization || "";

        if (authHeader) {
            let token = authHeader.split(" ").pop().trim();

            // Try to retrieve a user with the token
            const user = getUser(token);

            // Add the user to the context
            return { user };
        }
    },
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));
}

// app.use(routes);

db.once("open", async() => {
    await server.start();

    server.applyMiddleware({ app });
    app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});