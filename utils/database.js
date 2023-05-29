import mongoose from 'mongoose';

let isConnected = false; // track the connection status

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('MongoDB is alredy connexted');
    return;
  }

	try {
		
		await mongoose.connect(process.env.MONGODB_URI, {
			dbName: 'share-prompts'
		})

		isConnected = true;
		console.log('MongoDB connected');
	} catch (error) {
		console.error(error);
	}
};
