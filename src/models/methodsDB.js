import conxPool from './createConnection.js';
import encryptPasswords from '../utils/bcryptEncryptor.js';

export async function listUsers() {
  try {
    const query = 'SELECT * FROM `user`';
    const [result] = await conxPool.execute(query);

    console.log(result);
  } catch (error) {
    throw error;
  }
}

export async function createUser(newUsername, newEmail, newPass, newType) {
  try {
    const hashedPassword = await encryptPasswords(newPass);
    const newUser = {
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
