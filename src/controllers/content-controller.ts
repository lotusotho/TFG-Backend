import { NextFunction, Request, Response } from 'express';
import {
  getContent,
  getUserByName,
  getUserByToken,
  postContent,
} from '../services/methodsDB';

export const postContentController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const token = req.headers.authorization;

  const currentUser = await getUserByToken(token as string);

  await postContent(currentUser.ID, req.body.text_content, req.body.md_content);

  res.status(201).send({
    message: 'The content has been posted.',
  });
};

export const getContentControllerToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const token = req.headers.authorization;

  const currentUser = await getUserByToken(token as string);

  const content = await getContent(currentUser.ID);

  res.status(200).send({
    content,
  });
};

export const getContentControllerQuery = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const query = req.query.blog;

  const currentUser = await getUserByName(query as string);

  const content = await getContent(currentUser!.ID);

  res.status(200).send({
    content,
  });
};
