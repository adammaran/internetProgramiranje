const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const matchRouter = require('./routers/match');
const teamRouter = require('./routers/team');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(matchRouter);
app.use(teamRouter);

module.exports = app;