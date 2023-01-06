import User from './user';
import Role from './role';

export const initRoles = async () =>
	await Role.create(
		{
			name: 'Super Administrator',
			description: 'test'
		},
		{
			name: 'User',
			description: 'test'
		},
		{
			name: 'Ezra',
			description: 'not test'
		}
	);

export const initUsers = async () => {
	const roleSuperAdministrator = await Role.findOne({ name: 'Super Administrator' });
	const roleUser = await Role.findOne({ name: 'User' });
	const roleEzra = await Role.findOne({ name: 'Ezra' });

	await User.create(
		{
			name: 'mahmoud emad',
			userName: 'superadmin',
			email: 'memad@kashier.io',
			userType: 'admin',
			roles: [roleSuperAdministrator, roleUser]
		},
		{
			name: 'marwan salman',
			userName: 'moderator',
			email: 'msalman@kashier.io',
			userType: 'user',
			roles: [roleUser]
		},
		{
			name: 'ezra',
			userName: 'ezra',
			email: 'mgamal@kashier.io',
			roles: [roleEzra]
		}
	);
};

export default { initUsers, initRoles };
