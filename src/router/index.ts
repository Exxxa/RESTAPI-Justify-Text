import express from 'express';
import authentication from './authentication';
import users from './users';
import { justifyTextHandler, wordCounterHandler } from '../controllers/utils';

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  users(router);

  // Add route for justifying text
  router.post('/justify', justifyTextHandler);

  // Add route for counting words
  router.post('/count-words', wordCounterHandler);

  return router;
};
