import mongoose from 'mongoose';

// User Config
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
  wordCount: { type: Number, default: 0 }, 
});

export const UserModel = mongoose.model('User', UserSchema);

// User Actions
export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({ 'authentication.sessionToken': sessionToken });
export const getUserById = (id: string) => UserModel.findById(id);
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());
export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id });

// Add a function to get the user's word count
export const getUserWordCount = async (sessionToken: string) => {
  const user = await getUserBySessionToken(sessionToken);
  return user ? user.wordCount : null;
};

// Add a function to update the user's word count
export const updateUserWordCount = async (sessionToken: string, wordCount: number) => {
  const user = await getUserBySessionToken(sessionToken);
  if (user) {
    user.wordCount += wordCount;
    await user.save();
  }
};

export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);
