const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Movie = require('./movies');

const UserSchema = new Schema({
    name:String,
    age: Number,
    movies:[{
        type: Schema.Types.ObjectId,
        ref: 'movie'
    }]
});

UserSchema.virtual('countMovies').get(function(){
    return this.movies.length;
})

UserSchema.pre('remove', function (next) {
   Movie.remove({_id: {$in : this.movies}}).then(() => {
       next();
   })
})

const User = mongoose.model('user', UserSchema, 'USER_COLLEC');

module.exports = User;