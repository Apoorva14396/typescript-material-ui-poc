const mongoose2 = require('mongoose');

mongoose2.connect(
  'mongodb://localhost:27017/typescript-poc',
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err: any) => {
    if (!err) {
      console.log('MongoDB Connection Succeeded..');
    } else {
      console.log('Error in DB connection : ' + err);
    }
  }
);

module.exports = mongoose2;
