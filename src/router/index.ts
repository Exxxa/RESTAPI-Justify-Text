import express from 'express';
import authentication from './authentication';
import users from './users';
import justifyText  from './justifyText';
const router = express.Router();

export default (): express.Router => {
  authentication(router);
  users(router);
  justifyText(router);
  return router;
};
