// Importing the crypto module
import crypto from 'crypto';

// Defining a secret constant for the HMAC
const SECRET = 'PIERRE-REST-API';

// Function to authenticate a user
export const authentication = (salt: string, password: string): string => {
  // Create a HMAC with the SHA256 algorithm, using the salt and password
  // Update it with the secret and return the digest in hexadecimal format
  return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex');
}

// Function to generate a random string
export const random = () => {
  // Generate 128 random bytes and return them as a base64 string
  return crypto.randomBytes(128).toString('base64');
}
