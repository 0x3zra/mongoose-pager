import mongoose from 'mongoose';
const roleSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true
		},
		description: {
			type: String,
			default: ''
		}
	},
	{
		timestamps: true
	}
);

const Role = mongoose.model('roles', roleSchema);
export default Role;
