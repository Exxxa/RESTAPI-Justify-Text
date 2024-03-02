// Importing necessary modules and functions
import express from 'express';
import { merge, get } from 'lodash';
import { getUserBySessionToken } from '../db/users'; 

// Middleware to check if a user is authenticated
export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    // Extract the session token from the cookies
    const sessionToken = req.cookies['PIERRE-AUTH'];

    // If no session token is provided, return a 403 status code
    if (!sessionToken) {
      return res.sendStatus(403);
    }

    // Get the user associated with the session token
    const existingUser = await getUserBySessionToken(sessionToken);

    // If no user is found, return a 403 status code
    if (!existingUser) {
      return res.sendStatus(403);
    }

    // Merge the existing user into the request object
    merge(req, { identity: existingUser });

    // Call the next middleware
    return next();
  } catch (error) {
    // Log the error and return a 400 status code
    console.log(error);
    return res.sendStatus(400);
  }
}

// Middleware to check if a user is the owner of a resource
export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    // Extract the resource id from the request parameters
    const { id } = req.params;

    // Get the current user's id from the request object
    const currentUserId = get(req, 'identity._id') as string;

    // If no user id is found, return a 400 status code
    if (!currentUserId) {
      return res.sendStatus(400);
    }

    // If the current user is not the owner of the resource, return a 403 status code
    if (currentUserId.toString() !== id) {
      return res.sendStatus(403);
    }

    // Call the next middleware
    next();
  } catch (error) {
    // Log the error and return a 400 status code
    console.log(error);
    return res.sendStatus(400);
  }
}
