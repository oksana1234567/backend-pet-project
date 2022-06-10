const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    bio: String,
    image: String,
    favorites: [],
    following: [] || Boolean,
});

// UserSchema.methods.toProfileJSONFor = function(user){
//   return {
//     username: this.username,
//     bio: this.bio || 'default',
//     image: this.image || 'https://static.productionready.io/images/smiley-cyrus.jpg',
//     following: user ? user.isFollowing(this._id) : false
//   };
// };

// UserSchema.methods.toAuthJSON = function(){
//   return {
//     username: this.username,
//     email: this.email,
//     token: this.generateJWT(),
//     bio: this.bio || 'default',
//     image: this.image
//   };
// };

// UserSchema.methods.favorite = function(id){
//   if(this.favorites.indexOf(id) === -1){
//     this.favorites.push(id);
//   }

//   return this.save();
// };

// UserSchema.methods.unfavorite = function(id){
//   this.favorites.remove(id);
//   return this.save();
// };

// UserSchema.methods.isFavorite = function(id){
//   return this.favorites.some(function(favoriteId){
//     return favoriteId.toString() === id.toString();
//   });
// };

// UserSchema.methods.follow = function(id){
//   if(this.following.indexOf(id) === -1){
//     this.following.push(id);
//   }

//   return this.save();
// };

// UserSchema.methods.unfollow = function(id){
//   this.following.remove(id);
//   return this.save();
// };

// UserSchema.methods.isFollowing = function(id){
//   return this.following.some(function(followId){
//     return followId.toString() === id.toString();
//   });
// };

const User = mongoose.model('User', UserSchema);



module.exports = User;
