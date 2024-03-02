import express from 'express';

// Importing necessary functions from the users database file
import { deleteUserById, getUsers, getUserById } from '../db/users';

// Function to get all users
export const getAllUsers = async (req: express.Request, res: express.Response) => {
  try {
    // Fetch all users from the database
    const users = await getUsers();

    // Return the users
    return res.status(200).json(users);
  } catch (error) {
    // Log the error and return a 400 status code
    console.log(error);
    return res.sendStatus(400);
  }
};

// Function to delete a user
export const deleteUser = async (req: express.Request, res: express.Response) => {
  try {
    // Extract the user id from the request parameters
    const { id } = req.params;

    // Delete the user from the database
    const deletedUser = await deleteUserById(id);

    // Return the deleted user
    return res.json(deletedUser);
  } catch (error) {
    // Log the error and return a 400 status code
    console.log(error);
    return res.sendStatus(400);
  }
}

// Function to update a user
export const updateUser = async (req: express.Request, res: express.Response) => {
  try {
    // Extract the user id and username from the request parameters and body
    const { id } = req.params;
    const { username } = req.body;

    // If username is not provided, return a 400 status code
    if (!username) {
      return res.sendStatus(400);
    }

    // Fetch the user from the database
    const user = await getUserById(id);
    
    // Update the username and save the user
    user.username = username;
    await user.save();

    // Return the updated user
    return res.status(200).json(user).end();
  } catch (error) {
    // Log the error and return a 400 status code
    console.log(error);
    return res.sendStatus(400);
  }
}
