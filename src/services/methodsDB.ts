import conxPool from './createConnection';
import encryptPasswords from '../utils/bcryptEncryptor';
import { User } from '../interfaces/interfaces';

export async function listUsers() {
  try {
    const query = 'SELECT * FROM `user`';
    const [result] = await conxPool.execute(query);

    return result;
  } catch (error) {
    throw error;
  }
}

export async function loginQuery(username: string) {
  try {
    const query = 'SELECT * from `user` WHERE username=' + username;

    const [result] = await conxPool.execute(query);

    return result;
  } catch (error) {
    throw error;
  }
}

export async function createUser(
  newUsername: string,
  newEmail: string,
  newPass: string,
  newType: number
) {
  try {
    const hashedPassword = await encryptPasswords(newPass);
    const newUser: User = {
      username: newUsername,
      email: newEmail,
      password: hashedPassword,
      type: newType,
    };

    const query =
      'INSERT INTO `user`(username, email, password, type) VALUES(?, ?, ?, ?)';
    const [result] = await conxPool.execute(query, [
      newUser.username,
      newUser.email,
      newUser.password,
      newUser.type,
    ]);
    console.log(result);
  } catch (error) {
    throw error;
  }
}
