import { DataSource } from 'typeorm';
import { User } from '../models/User.js';
import { Post } from '../models/Post.js';
import { UserType } from '../models/Usertype.js';
import { AuthToken } from '../models/AuthToken.js';
import { dbConfig } from '../config.js';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  entities: [User, Post, UserType, AuthToken],
  logging: false,
});
