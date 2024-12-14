const config = {
  port: process.env.PORT,
  level: process.env.NODE_ENV === 'production' ? 'error' : 'info',
};

export const security = {
  apiKey: process.env.APIKEY,
};

export const jwtSecurity = {
  username: process.env.ADMIN_USER,
  password: process.env.ADMIN_PASSWORD,
  secretKey: process.env.JWT_SECRET_KEY,
  expirationTime: process.env.EXPIRATION_TIME,
};

export default config;
