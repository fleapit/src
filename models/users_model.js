var mongoose = require('mongoose'), 
	Schema = mongoose.Schema;
var UserSchema = new Schema({
	email:  { type: String, unique: true},
	hashed_password: String,
	firstname: String,
	lastname: String
});
mongoose.model('User', UserSchema);