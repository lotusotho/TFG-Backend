export function pingController(req, res, next) {
  return res.send({ message: 'pong' });
  next();
}
