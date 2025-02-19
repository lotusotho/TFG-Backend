import { Request, Response, NextFunction } from 'express';
import { registerController } from '../controllers/register-controller.js';

describe('UserController', () => {
  describe('registerController', () => {
    it('debería crear un usuario y retornar 201 en caso exitoso', async () => {
      const req = {
        body: {
          username: 'UsuarioTest',
          email: 'test@example.com',
          password: 'secret',
          type: 1,
        },
      } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;
      const next: NextFunction = jest.fn();

      await registerController(req, res, next);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith({
        message: 'A new user has been created',
      });
    });

    it('debería retornar error 400 cuando faltan campos requeridos', async () => {
      const req = { body: {} } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;
      const next: NextFunction = jest.fn();

      await registerController(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        error: 'All fields are required.',
      });
    });
  });
});
