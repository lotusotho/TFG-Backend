import { DataSource } from 'typeorm';
import { User } from '../models/User.js';
import { Post } from '../models/Post.js';
import { UserType } from '../models/Usertype.js';
import { AuthToken } from '../models/AuthToken.js';
import { dbConfig } from '../config.js';

export const AppDataSource = new DataSource({
  type: 'mysql',
<<<<<<< HEAD
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
=======
  host: 'sql.freedb.tech',
  port: 3306,
  username: 'freedb_lotusotho',
  password: 'pUMe749r3#uCYqh',
  database: 'freedb_tfg_db',
>>>>>>> 91c4f3a1236ce12b6a1a81d608599058ca6cddb6
  entities: [User, Post, UserType, AuthToken],
  logging: false,
});
