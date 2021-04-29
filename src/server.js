const express = require("express");
const dotenv = require("dotenv").config();
const Express = require("express");
const cors = require("cors");
const logger = require("./middleware/logger");
const auth = require("./routes/auth");
const root = require("./routes/root");
const validateJwt = require("./middleware/validateJwt");
const session = require("express-session");
const connectRedis = require("connect-redis");
const Redis = require("redis");
const { __prod__ } = require("../constants");
const checkSession = require("./middleware/checkSession");
const classHandler = require("./routes/classes");

const app = Express();

if (process.env.NODE_ENV !== "production") {
    app.use(logger);
}

const RedisStore = connectRedis(session);
const redis = Redis.createClient(process.env.REDIS_URL);

app.use(cors());
app.use(express.json());
app.use(
    session({
        name: "qid",
        cookie: {
            maxAge: 1000 * 30 * 60 * 60 * 24,
            httpOnly: true,
            sameSite: "lax",
            secure: __prod__,
        },
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: new RedisStore({ client: redis, disableTouch: true }),
    })
);

app.use("/v1/auth", auth);
app.use("/v1/", checkSession, validateJwt, root);
app.use("/v1/class", checkSession, validateJwt, classHandler);

module.exports = app;