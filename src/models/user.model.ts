import mongoose from 'mongoose';
import Profile from '../shared/interfaces/profile.interface';
import { UserResponse, Users } from '../shared/interfaces/user.interface';
import {findFollowedAuthor} from '../shared/helpers/filters/findFollowedAuthor'

let UserSchema = new mongoose.Schema({
    username: { type: String, required: true, index: { unique: true, dropDups: true } },
    email: { type: String, required: true, index: { unique: true, dropDups: true } },
    password: { type: String, required: true },
    bio: String,
    image: String,
    favorites: Array,
    following: Array
});

UserSchema.methods.sendAsProfileResult = function (profileUser: Profile, user: Users) {
    if (profileUser) {
        return {
            username: profileUser.username,
            bio: profileUser.bio,
            image: profileUser.image,
            following: user ? findFollowedAuthor(user.following).includes(profileUser.username) : false
        }
    }
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
