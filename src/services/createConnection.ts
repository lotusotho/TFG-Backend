import { AppDataSource } from './data-source';

export const connectDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed', error);
    throw error;
  }
};
