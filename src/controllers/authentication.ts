import express from 'express';

import { getUserByEmail, createUser } from '../db/users';
import { authentication, random } from '../helpers';

// Login function
export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.sendStatus(400);
    }

    // Get the user by email
    const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');

    // If user does not exist, return 400
    if (!user) {
      return res.sendStatus(400);
    }

    // Authenticate the user
    const expectedHash = authentication(user.authentication.salt, password);
    
    // If password does not match, return 403
    if (user.authentication.password != expectedHash) {
      return res.sendStatus(403);
    }

    // Generate a new session token for the user
    const salt = random();
    user.authentication.sessionToken = authentication(salt, user._id.toString());

    // Save the user with the new session token
    await user.save();

    // Set the session token as a cookie
    res.cookie('PIERRE-AUTH', user.authentication.sessionToken, { domain: 'localhost', path: '/' });

    // Return the user
    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

// Register function
export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;

    // Check if email, password, and username are provided
    if (!email || !password || !username) {
      return res.sendStatus(400);
    }

    // Check if a user with the same email already exists
    const existingUser = await getUserByEmail(email);
  
    // If user already exists, return 400
    if (existingUser) {
      return res.sendStatus(400);
    }

    // Create a new user
    const salt = random();
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    // Return the newly created user
    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}
