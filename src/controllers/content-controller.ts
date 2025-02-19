import { NextFunction, Request, Response } from 'express';
import {
  deletePost,
  getAllPosts,
  getPostsByUser,
  getUserByName,
  getUserByToken,
  postContent,
} from '../services/methodsDB';
import { ChangeToken } from './auth-controller.js';
import createHttpError from 'http-errors';

interface ContentRequest {
  title: string;
  emoji: string;
  text_content: string;
  md_content: string;
}

export const postContentController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = await ChangeToken(req, res, next);

    if (!token) {
      throw createHttpError(401, 'No authorization token provided');
    }

    const currentUser = await getUserByToken(token);
    if (!currentUser) {
      throw createHttpError(404, 'User not found');
    }

    const { title, emoji, text_content, md_content } =
      req.body as ContentRequest;
    if (!title || !emoji || !text_content || !md_content) {
      throw createHttpError(400, 'Missing required content fields');
    }

    await postContent(currentUser.ID, title, emoji, text_content, md_content);
    res.status(201).json({ message: 'Content posted successfully' });
  } catch (error) {
    next(error);
  }
};

export const getAllPostsController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    let postsData;
    if (req.query.blog) {
      const username = req.query.blog as string;
      postsData = await getPostsByUser(username);
    } else {
      postsData = await getAllPosts();
    }

    if (!postsData) {
      throw createHttpError(400, 'Posts not found');
    }

    res.status(200).send({ data: postsData });
  } catch (error) {
    next(error);
  }
};

export const deletePostController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = await ChangeToken(req, res, next);
    if (!token) {
      throw createHttpError(401, 'No authorization token provided');
    }
    const currentUser = await getUserByToken(token);
    if (!currentUser) {
      throw createHttpError(404, 'User not found');
    }
    const postId = Number(req.params.id);
    if (isNaN(postId)) {
      throw createHttpError(400, 'Invalid post id');
    }
    const result = await deletePost(postId, currentUser.ID);
    if (!result) {
      throw createHttpError(
        400,
        'Unable to delete post: you can only delete your own post'
      );
    }
    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
};
