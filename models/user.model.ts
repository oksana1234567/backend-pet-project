import mongoose from 'mongoose';
import IProfile from '../interfaces/profile.interface';
import { IUserResponse } from '../interfaces/user.interface';

let UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    bio: String,
    image: String,
    favorites: [],
    following: [] || Boolean,
});

UserSchema.methods.sendAsProfileResult = function(profileUser: IProfile) {
    return {
        username: profileUser.username,
        bio: profileUser.bio,
        image: profileUser.image,
        following: false,
    }
};
  
UserSchema.methods.sendAsUserResult = function(user: IUserResponse) {
    return {
        username: user.username,
        bio: user.bio,
        image: user.image,
        email: user.email,
    }
  };

const User = mongoose.model('User', UserSchema);

export default User;
