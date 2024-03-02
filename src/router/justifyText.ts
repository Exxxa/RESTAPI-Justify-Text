import express from 'express';
import { justifyTextHandler } from '../controllers/justifyText';
import { isAuthenticated } from '../middleware';

export default (router: express.Router) => {
    
  router.post('/justify', isAuthenticated, justifyTextHandler);
};
