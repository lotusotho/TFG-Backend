import { DataSource } from 'typeorm';
import { User } from '../models/User.js';
import { Post } from '../models/Post.js';
import { UserType } from '../models/Usertype.js';
import { AuthToken } from '../models/AuthToken.js';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'tfg_db',
  entities: [User, Post, UserType, AuthToken],
  logging: false,
});
