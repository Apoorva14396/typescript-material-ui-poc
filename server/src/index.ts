require('dotenv').config();
require('./config/db.js');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const seedUser = require('./Auth/seed/userSeeder');
const User = require('./Auth/models/userModel');
const authRouter = require('./Auth/authRoute');
const userRouter = require('./App/routes/userRoute');

var app = express();

const port = process.env.PORT || 3004;

app.use(cors());
app.use(bodyParser.json());

app.use('/uploads', express.static('uploads'));
app.use('/', authRouter);
app.use('/user', userRouter);

User.find()
  .exec()
  .then((users: any) => {
    if (!users.length) {
      seedUser();
    } else {
      return true;
    }
  })
  .catch((err: any) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`server started at ${port}`);
});
