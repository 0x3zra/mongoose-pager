import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

var mongo;

export const dbConnect = async () => {
	mongo = await MongoMemoryServer.create();
	const uri = mongo.getUri();

	const mongooseOpts = {
		useNewUrlParser: true,
		useUnifiedTopology: true
	};
	mongoose.set('strictQuery', true);
	mongoose.connect(uri, mongooseOpts);
};

export const dbDisconnect = async () => {
	await mongoose.connection.dropDatabase();
	await mongoose.connection.close();
	await mongo.stop();
};
