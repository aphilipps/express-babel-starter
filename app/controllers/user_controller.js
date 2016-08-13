import jwt from 'jwt-simple';
import User from '../models/user_model';
import config from '../config';


export const signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
};

export const signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  if (!email || !password) {
    return res.status(422).send('You must provide email and password');
  }
  User.findOne({ email })
  .then(found => {
    if (!found) {
      const user = new User();
      user.email = email;
      user.password = password;
      user.name = name;

      user.save()
        .then(result => {
          res.send({ token: tokenForUser(result) });
        })
        .catch(error => {
          res.json({ error: 'first one' });
        });
    } else {
      res.json('User already exists');
    }
  })
  .catch(error => {
    res.json({ error });
  });
};

// encodes a new token for a user object
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}
