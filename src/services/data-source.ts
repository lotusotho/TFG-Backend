import { DataSource } from 'typeorm';
import { Userdata } from '../models/Userdata.js';
import { Postdata } from '../models/Postdata.js';
import { Usertype } from '../models/Usertype.js';
import { Authtoken } from '../models/Authtoken.js';
import { dbConfig } from '../config.js';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  schema: dbConfig.schema,
  entities: [Userdata, Postdata, Usertype, Authtoken],
  logging: false,
  synchronize: false,
  ssl: true,
});
