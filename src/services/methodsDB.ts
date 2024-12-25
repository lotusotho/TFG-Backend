import { User } from '../models/User.js';
import { Post } from '../models/Post.js';
import { AppDataSource } from './data-source.js';
import { AuthToken } from '../models/AuthToken.js';
import { HttpError } from '../classes/HttpError.js';

export const loginQuery = async (
  username?: string,
  email?: string
): Promise<User | null> => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: [{ username }, { email }],
    });
    return user;
  } catch (error) {
    throw error;
  }
};

export async function createUser(
  newUsername: string,
  newEmail: string,
  newPass: string,
  newType: number
) {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const postRepository = AppDataSource.getRepository(Post);

    // Verifica si el usuario ya existe
    const existingUser = await userRepository.findOne({
      where: [{ username: newUsername }, { email: newEmail }],
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    // Crea un nuevo usuario
    const newUser = userRepository.create({
      username: newUsername,
      email: newEmail,
      password: newPass,
      type: newType,
    });
    await userRepository.save(newUser);

    // Crea un nuevo post asociado con el usuario
    const newPost = postRepository.create({
      text_content: '',
      user: newUser,
    });
    await postRepository.save(newPost);

    console.log('User and associated post saved');
    return newUser;
  } catch (error) {
    throw error;
  }
}

export async function getToken(username: string) {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const tokenRepository = AppDataSource.getRepository(AuthToken);

    const getUser = await userRepository.findOne({
      where: [{ username: String(username) }],
    });

    if (!getUser) {
      throw new HttpError('User not found', 404);
    }

    const getToken = await tokenRepository.findOne({
      where: [{ ID: Number(getUser.ID) }],
    });

    if (!getToken) {
      throw new HttpError('Token missing', 500);
    }

    return getToken;
  } catch (error) {
    throw error;
  }
}

export async function saveToken(username: number, token: string) {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const tokenRepository = AppDataSource.getRepository(AuthToken);

    const getUser = await userRepository.findOne({
      where: [{ username: String(username) }],
    });

    if (!getUser) {
      throw new HttpError('User not found', 404);
    }

    const getToken = await tokenRepository.findOne({
      where: [{ token }],
    });

    if (getToken) {
      throw new HttpError('Token already exists', 500);
    }

    const newToken = tokenRepository.create({
      ID: getUser.ID,
      token: token,
    });
    await tokenRepository.save(newToken);

    return getToken;
  } catch (error) {
    throw error;
  }
}

export async function getUserByToken(token: string) {
  const tokenRepository = AppDataSource.getRepository(AuthToken);
  try {
    const getToken = await tokenRepository.findOne({
      where: { token: String(token) },
      relations: ['user'],
    });

    if (!getToken) {
      throw new HttpError('Token does not exists', 500);
    }

    return getToken.user;
  } catch (error) {
    throw error;
  }
}

export async function postContent(userId: number, content: string) {
  const postRepository = AppDataSource.getRepository(Post);
  try {
    const getPost = await postRepository.findOne({
      where: { ID: Number(userId) },
    });

    const newPost = postRepository.create({
      ID: Number(userId),
      text_content: String(JSON.stringify(content)),
    });

    await postRepository.save(newPost);

    return getPost;
  } catch (error) {
    throw error;
  }
}

export async function getContent(userId: number) {
  const postRepository = AppDataSource.getRepository(Post);
  try {
    const getPost = await postRepository.findOne({
      where: { ID: Number(userId) },
    });

    return getPost;
  } catch (error) {
    throw error;
  }
}
