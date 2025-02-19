import { AppDataSource } from './data-source';
import { Userdata } from '../models/Userdata';
import { Postdata } from '../models/Postdata';
import { Usertype } from '../models/Usertype';
import { Authtoken } from '../models/Authtoken';

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
    console.error('Error in loginQuery:', error);
    return null;
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
    const userTypeRepository = AppDataSource.getRepository(Usertype);

    const userType = await userTypeRepository.findOne({
      where: { ID: Number(newType) },
    });
    if (!userType) {
      console.error('User type does not exist');
      return null;
    }

    const existingUser = await userRepository.findOne({
      where: [{ username: newUsername }, { email: newEmail }],
    });
    if (existingUser) {
      console.error('User already exists');
      return null;
    }

    const newUser = userRepository.create({
      username: newUsername,
      email: newEmail,
      password: newPass,
      type: newType,
    });
    await userRepository.save(newUser);

    return newUser;
  } catch (error) {
    console.error('Error during user creation:', error);
    return null;
  }
}

export async function getToken(username: string) {
  try {
    const userRepository = AppDataSource.getRepository(Userdata);
    const tokenRepository = AppDataSource.getRepository(Authtoken);

    const getUser = await userRepository.findOne({
      where: [{ username: String(username) }],
    });

    if (!getUser) {
      console.error('User not found');
      return null;
    }

    const getToken = await tokenRepository.findOne({
      where: [{ ID: Number(getUser.ID) }],
    });

    if (!getToken) {
      console.error('Token missing');
      return null;
    }

    return getToken;
  } catch (error) {
    console.error('Error in getToken:', error);
    return null;
  }
}

export async function saveToken(username: number, token: string) {
  try {
    const userRepository = AppDataSource.getRepository(Userdata);
    const tokenRepository = AppDataSource.getRepository(Authtoken);

    const getUser = await userRepository.findOne({
      where: [{ username: String(username) }],
    });

    if (!getUser) {
      console.error('User not found');
      return null;
    }

    const getToken = await tokenRepository.findOne({
      where: [{ token }],
    });

    if (getToken) {
      console.error('Token already exists');
      return null;
    }

    const newToken: Authtoken = tokenRepository.create({
      ID: getUser.ID,
      token: token,
    });
    await tokenRepository.save(newToken);

    return newToken;
  } catch (error) {
    console.error('Error in saveToken:', error);
    return null;
  }
}

export async function deleteToken(token: string) {
  try {
    const tokenRepository = AppDataSource.getRepository(Authtoken);

    const getToken = await tokenRepository.findOne({
      where: [{ token }],
    });

    if (!getToken) {
      console.error("Token doesn't exist");
      return null;
    }

    await tokenRepository.delete(getToken);
    return 'Token has been deleted';
  } catch (error) {
    console.error('Error in deleteToken:', error);
    return null;
  }
}

export async function getUserByToken(token: string) {
  const tokenRepository = AppDataSource.getRepository(Authtoken);
  try {
    const getToken = await tokenRepository.findOne({
      where: { token: String(token) },
      relations: ['user'],
    });

    if (!getToken) {
      console.error('Token does not exist');
      return null;
    }

    return getToken.user;
  } catch (error) {
    console.error('Error in getUserByToken:', error);
    return null;
  }
}

export async function postContent(
  userId: number,
  title: string,
  emoji: string,
  json_c: string,
  markdown_c: string
) {
  const postRepository = AppDataSource.getRepository(Postdata);
  try {
    const newPost: Postdata = postRepository.create({
      ID: Number(userId),
      title,
      emoji,
      text_content: json_c,
      md_content: markdown_c,
    });
    await postRepository.save(newPost);

    return newPost;
  } catch (error) {
    console.error('Error in postContent:', error);
    return null;
  }
}

export async function getUserByName(name: string): Promise<Userdata | null> {
  const userRepository = AppDataSource.getRepository(Userdata);
  try {
    const user = await userRepository.findOne({
      where: { username: name },
    });
    return user;
  } catch (error) {
    console.error('Error in getUserByName:', error);
    return null;
  }
}

export async function getUserByEmail(email: string): Promise<Userdata | null> {
  const userRepository = AppDataSource.getRepository(Userdata);
  try {
    const user = await userRepository.findOne({
      where: { email },
    });
    return user;
  } catch (error) {
    console.error('Error in getUserByEmail:', error);
    return null;
  }
}

export async function verifyUserByEmail(email: string) {
  const userRepository = AppDataSource.getRepository(Userdata);
  try {
    const user = await userRepository.findOne({
      where: { email },
    });

    if (!user) {
      console.error('User not found');
      return null;
    }

    user.isVerified = true;
    await userRepository.save(user);

    return user;
  } catch (error) {
    console.error('Error in verifyUserByEmail:', error);
    return null;
  }
}

export async function updateUserPassword(email: string, newPassword: string) {
  const userRepository = AppDataSource.getRepository(Userdata);
  try {
    const user = await userRepository.findOne({
      where: { email },
    });

    if (!user) {
      console.error('User not found');
      return null;
    }

    user.password = newPassword;
    await userRepository.save(user);

    return user;
  } catch (error) {
    console.error('Error in updateUserPassword:', error);
    return null;
  }
}

export async function getAllPosts() {
  const postRepository = AppDataSource.getRepository(Postdata);
  try {
    const posts = await postRepository
      .createQueryBuilder('post')
      .leftJoin('post.user', 'user')
      .select(['post', 'user.username'])
      .where('post.text_content IS NOT NULL')
      .orWhere('post.md_content IS NOT NULL')
      .getMany();
    return posts;
  } catch (error) {
    console.error('Error in getAllPosts:', error);
    return null;
  }
}

export async function getPostsByUser(username: string) {
  const postRepository = AppDataSource.getRepository(Postdata);
  try {
    const posts = await postRepository
      .createQueryBuilder('post')
      .leftJoin('post.user', 'user')
      .select(['post', 'user.username'])
      .where('user.username = :username', { username })
      .getMany();
    return posts;
  } catch (error) {
    console.error('Error in getPostsByUser:', error);
    return null;
  }
}

export async function deletePost(postId: number, userId: number) {
  try {
    const postRepository = AppDataSource.getRepository(Postdata);
    const post = await postRepository.findOne({
      where: { ID: postId },
      relations: ['user'],
    });
    if (!post) {
      console.error('Post not found');
      return null;
    }

    if (post.user.ID !== userId) {
      console.error('User is not authorized to delete this post');
      return null;
    }
    await postRepository.delete(postId);
    return 'Post deleted successfully';
  } catch (error) {
    console.error('Error in deletePost:', error);
    return null;
  }
}
