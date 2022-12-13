require('./utils/mongooseConnection.js');
const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const User = require('./models/user.js');

dotenv.config();

const port = process.env.PORT || 5000;
const saltRounds = 10;

app.use(express.json());
app.use(cors());

app.post('/login', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if(!user) return res.status(401).send('Wrong username or password');
  bcrypt.compare(req.body.password, user.password, (err, result) => {
    if(err) return res.status(402).send('Something went wrong');
    if(!result) return res.status(401).send('Wrong username or password');
    return res.status(200).send({ username: user.username, email: user.email });
  });
});

app.post('/register', async (req, res) => {
  if (!req.body.username || !req.body.password || !req.body.email) return res.status(400).send('All fields are required');
  await bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
    if(err) return res.send(err);

    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    await user.save((err, item) => {
      if (err) {
        console.log(err);
        return res.status(400).send(err);
      }
      else {
        console.log('fallowing item was saved:', item)
        return res.status(201).send('User created');
      };
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
