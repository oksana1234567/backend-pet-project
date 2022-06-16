import mongoose from 'mongoose';
import Profile from '../shared/interfaces/profile.interface';
import { UserResponse, Users } from '../shared/interfaces/user.interface';

let UserSchema = new mongoose.Schema({
    username: { type: String, required: true, index: { unique: true, dropDups: true } },
    email: { type: String, required: true, index: { unique: true, dropDups: true } },
    password: { type: String, required: true },
    bio: String,
    image: String,
    favorites: Array,
    following: Array
});

UserSchema.methods.sendAsProfileResult = function (profileUser: Profile) {
    if (profileUser) {
        return {
            username: profileUser.username,
            bio: profileUser.bio,
            image: profileUser.image,
            following: profileUser.following,
        }
    } else return;
};
  
UserSchema.methods.sendAsUserResult = function(user: UserResponse) {
    return {
        username: user.username,
        bio: user.bio,
        image: user.image,
        email: user.email,
    }
};

const User = mongoose.model('User', UserSchema);

export default User;
