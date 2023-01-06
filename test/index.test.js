import { dbConnect, dbDisconnect } from './setuptestdb';
import { initUsers, initRoles } from './dummyData';
import User from './user';
import Role from './role';

beforeAll(async () => {
	await dbConnect();
	await initRoles();
	await initUsers();
});

afterAll(async () => {
	await dbDisconnect();
});

describe('Initial DB', () => {
	it('Should retrieve one user and one role', async () => {
		const createdRole = await Role.findOne();
		const createdUser = await User.findOne();

		expect([createdRole._id, createdUser.email, createdUser.name]).toBeDefined();
	});
});

describe('Pagination', () => {
	it('Should retrieve users with pagination data', async () => {
		const createdUser = await User.paginate({}, 'roles.description');

		expect(createdUser.totalResults).toBeDefined();
		expect(createdUser.page).toBeGreaterThan(0);
		expect(createdUser.limit).toBeGreaterThan(0);
	});
});

describe('Pagination & Population', () => {
	it('Should retrieve users with pagination data and population', async () => {
		const createdUser = await User.paginate({}, 'roles.description');

		expect(createdUser.totalResults).toBeGreaterThan(0);

		expect(createdUser.page).toBeGreaterThan(0);
		expect(createdUser.limit).toBeGreaterThan(0);

		expect(createdUser.results[0].roles).toBeDefined();
		expect(createdUser.results[0].roles.length).toBeGreaterThan(0);
	});
});

describe('Pagination & Population & Query', () => {
	it('Should retrieve users with pagination data, population and find query', async () => {
		const createdUser = await User.paginate({}, 'roles.description', {
			email: {
				$regex: 'kashier',
				$options: 'i'
			}
		});

		expect(createdUser.totalResults).toBeGreaterThan(0);

		expect(createdUser.page).toBeGreaterThan(0);
		expect(createdUser.limit).toBeGreaterThan(0);

		expect(createdUser.results[0].roles).toBeDefined();
		expect(createdUser.results[0].roles.length).toBeGreaterThan(0);
	});
});

describe('Pagination & Population & Query ', () => {
	it('Should retrieve users with pagination data, population, find query and descending sorting', async () => {
		const createdUser = await User.paginate({ sortDirection: 'desc', sortBy: 'name' }, 'roles', {
			email: {
				$regex: 'kashier',
				$options: 'i'
			}
		});

		console.log(createdUser);
		expect(createdUser.totalResults).toBeGreaterThan(0);

		expect(createdUser.page).toBeGreaterThan(0);
		expect(createdUser.limit).toBeGreaterThan(0);

		expect(createdUser.results[0].roles).toBeDefined();
		expect(createdUser.results[0].roles.length).toBeGreaterThan(0);
	});
});

describe('Pagination with options & Population & Query ', () => {
	it('Should retrieve users with pagination data, population, find query and pagination data', async () => {
		const createdUser = await User.paginate({ page: 1, limit: 2 }, 'roles.description', {
			email: {
				$regex: 'kashier',
				$options: 'i'
			}
		});

		expect(createdUser.totalResults).toBeGreaterThan(0);

		expect(createdUser.page).toBeGreaterThan(0);
		expect(createdUser.limit).toBeGreaterThan(0);

		expect(createdUser.results.length).toBe(2);

		expect(createdUser.results[0].roles).toBeDefined();
		expect(createdUser.results[0].roles.length).toBeGreaterThan(0);
	});
});
