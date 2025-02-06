import bcrypt from 'bcryptjs';

async function encryptPasswords(password: string) {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export default encryptPasswords;
