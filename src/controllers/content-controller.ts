import { NextFunction, Request, Response } from 'express';
import { getUserByToken, postContent } from '../services/methodsDB.js';

export const contentContoller = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const token = req.cookies.authToken;

  const currentUser = await getUserByToken(token);

  await postContent(currentUser.ID, req.body.text_content);

  res.status(201).send({
    message: 'The content has been posted.',
  });
};
