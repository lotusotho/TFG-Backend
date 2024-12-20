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

export const cloudflareSecurity = {
  account_id: process.env.ACCOUNT_ID,
  email: process.env.CLOUDFLARE_EMAIL,
  api_key: process.env.CLOUDFLARE_API_KEY,
  zone_id: process.env.CLOUDFLARE_ZONE_ID,
};

export default config;
