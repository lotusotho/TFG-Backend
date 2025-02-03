import { NextFunction, Request, Response } from 'express';
import { getContent, getUserByToken, postContent } from '../services/methodsDB';

export const postContentController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const token = req.cookies.authToken;

  const currentUser = await getUserByToken(token);

  await postContent(currentUser.ID, req.body.text_content, req.body.md_content);

  res.status(201).send({
    message: 'The content has been posted.',
  });
};

export const getContentController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const token = req.cookies.authToken;

  const currentUser = await getUserByToken(token);

  const content = await getContent(currentUser.ID);

  res.status(200).send({
    content,
  });
};

export const getContentControllerDomain = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const user = req.user;

  if (!user) {
    return res.status(401).send({ error: 'Unauthorized' });
  }

  const content = await getContent(user.ID);

  res.status(200).send({
    content,
  });
};

export const userPageController = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  if (req.user) {
    const currentUser = req.user;
    const content = await getContent(currentUser.ID);

    res.status(200).send({ content });
  } else {
    res.status(404).send({ error: 'Contenido no encontrado' });
  }
};
