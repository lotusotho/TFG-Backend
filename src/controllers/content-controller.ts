import { NextFunction, Request, Response } from 'express';
import {
  getContent,
  getUserByName,
  getUserByToken,
  postContent,
} from '../services/methodsDB';
import { HttpError } from '../classes/HttpError';
import { ChangeToken } from './auth-controller.js';

interface ContentRequest {
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
      throw new HttpError('No authorization token provided', 401);
    }

    const currentUser = await getUserByToken(token);
    if (!currentUser) {
      throw new HttpError('User not found', 404);
    }

    const { text_content, md_content } = req.body as ContentRequest;
    if (!text_content || !md_content) {
      throw new HttpError('Missing required content fields', 400);
    }

    await postContent(currentUser.ID, text_content, md_content);
    res.status(201).json({ message: 'Content posted successfully' });
  } catch (error) {
    next(error);
  }
};

export const getContentControllerToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = await ChangeToken(req, res, next);

    const currentUser = await getUserByToken(token);
    if (!currentUser) {
      throw new HttpError('User not found', 404);
    }

    const content = await getContent(currentUser.ID);
    if (!content) {
      throw new HttpError('Content not found', 404);
    }

    res.status(200).json({ content });
  } catch (error) {
    next(error);
  }
};

export const getContentControllerQuery = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const query = req.query.blog;
    if (!query || typeof query !== 'string') {
      throw new HttpError('Invalid blog query parameter', 400);
    }

    const currentUser = await getUserByName(query);
    if (!currentUser) {
      throw new HttpError('User not found', 404);
    }

    const content = await getContent(currentUser.ID);
    if (!content) {
      throw new HttpError('Content not found', 404);
    }

    res.status(200).json({ content });
  } catch (error) {
    next(error);
  }
};
