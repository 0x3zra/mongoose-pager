import mongoose from 'mongoose';
import paginate from '../index';

const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	userName: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	roles: [
		{
			type: mongoose.SchemaTypes.ObjectId,
			ref: 'roles'
		}
	],
	userType: {
		type: String,
		enum: ['user', 'admin'],
		default: 'user'
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

userSchema.plugin(paginate);

const User = mongoose.model('users', userSchema);
export default User;
