import { AppDataSource } from './data-source.js';
import { AuthToken } from '../models/Authtoken.js';
import { HttpError } from '../classes/HttpError.js';
import { Userdata } from '../models/Userdata.js';
import { Postdata } from '../models/Postdata.js';
import { Usertype } from '../models/Usertype.js';

export const loginQuery = async (
  username?: string,
  email?: string
): Promise<Userdata | null> => {
  try {
    const userRepository = AppDataSource.getRepository(Userdata);
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
    const userRepository = AppDataSource.getRepository(Userdata);
    const userTypeRepository = AppDataSource.getRepository(Usertype); // Repositorio para UserType

    // Verifica si el tipo de usuario existe
    const userType = await userTypeRepository.findOne({
      where: { ID: Number(newType) },
    });
    if (!userType) {
      throw new Error('User type does not exist');
    }

    // Verifica si el usuario ya existe
    const existingUser = await userRepository.findOne({
      where: [{ username: newUsername }, { email: newEmail }],
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    // Crea el nuevo usuario
    const newUser = userRepository.create({
      username: newUsername,
      email: newEmail,
      password: newPass,
      type: newType, // Asegúrate de asignar el tipo de usuario existente
    });
    await userRepository.save(newUser);

    return newUser;
  } catch (error) {
    console.error('Error during user creation:', error);
    throw new Error('Error during user creation');
  }
}

export async function getToken(username: string) {
  try {
    const userRepository = AppDataSource.getRepository(Userdata);
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
    const userRepository = AppDataSource.getRepository(Userdata);
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

    const newToken: AuthToken = tokenRepository.create({
      ID: getUser.ID,
      token: token,
    });
    await tokenRepository.save(newToken);

    return newToken;
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

export async function postContent(
  userId: number,
  json_c: string,
  markdown_c: string
) {
  const postRepository = AppDataSource.getRepository(Postdata);
  try {
    const getPost = await postRepository.findOne({
      where: { ID: Number(userId) },
    });

    const newPost: Postdata = postRepository.create({
      ID: Number(userId),
      text_content: json_c,
      md_content: markdown_c,
    });

    await postRepository.save(newPost);

    return getPost;
  } catch (error) {
    throw error;
  }
}

export async function getContent(userId: number) {
  const postRepository = AppDataSource.getRepository(Postdata);
  try {
    const getPost = await postRepository.findOne({
      where: { ID: Number(userId) },
    });

    return getPost;
  } catch (error) {
    throw error;
  }
}

export async function getUserBySubdomain(
  subdomain: string
): Promise<Userdata | null> {
  const userRepository = AppDataSource.getRepository(Userdata);
  try {
    const user = await userRepository.findOne({
      where: { username: subdomain },
    });
    return user;
  } catch (error) {
    throw error;
  }
}
