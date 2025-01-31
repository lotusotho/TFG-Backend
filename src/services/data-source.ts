import { DataSource } from 'typeorm';
import { Userdata } from '../models/Userdata';
import { Postdata } from '../models/Postdata';
import { Usertype } from '../models/Usertype';
import { Authtoken } from '../models/Authtoken';
import { dbConfig } from '../config';

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
