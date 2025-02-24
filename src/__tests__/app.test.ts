import request from 'supertest';

const baseUrl = 'https://blog.server.mapach.es';
let authToken: string;

beforeAll(async () => {
  const res = await request(baseUrl).post('/login').send({
    username: 'alejandro',
    password: 'hola12345',
  });
  expect(res.status).toBe(200);
  authToken = res.body.token;
});

describe('TFG Backend API Endpoints', () => {
  it('GET / should respond with the main page', async () => {
    const res = await request(baseUrl).get('/');
    expect(res.status).toBe(200);
  });

  it('POST /register should register a new user', async () => {
    const res = await request(baseUrl).post('/register').send({
      username: 'UsuarioTest',
      email: 'test@example.com',
      password: 'secret',
      type: 1,
    });
    expect(res.status).toBe(201);
  });

  it('POST /login should authenticate a user', async () => {
    const res = await request(baseUrl).post('/login').send({
      username: 'alejandro',
      password: 'hola12345',
    });
    expect(res.status).toBe(200);
  });

  it('GET /tokenusername should return the username for a valid token', async () => {
    const res = await request(baseUrl)
      .get('/tokenusername')
      .set('Authorization', `Bearer ${authToken}`);
    expect(res.status).toBe(200);
  });

  it('GET /username should return the username', async () => {
    const res = await request(baseUrl)
      .get('/username')
      .set('Authorization', `Bearer ${authToken}`);
    expect(res.status).toBe(200);
  });

  it('GET /usercontent should return user content', async () => {
    const res = await request(baseUrl)
      .get('/usercontent')
      .set('Authorization', `Bearer ${authToken}`);
    expect(res.status).toBe(200);
  });

  it('GET /logout should log the user out', async () => {
    const res = await request(baseUrl)
      .get('/logout')
      .set('Authorization', `Bearer ${authToken}`);
    expect(res.status).toBe(200);
  });

  it('GET /verify-email should verify the email', async () => {
    const res = await request(baseUrl).get('/verify-email');
    expect(res.status).toBe(200);
  });

  it('GET /posts should return all posts', async () => {
    const res = await request(baseUrl).get('/posts');
    expect(res.status).toBe(200);
  });

  it('GET /isverified should return verification status for a valid token', async () => {
    const res = await request(baseUrl)
      .get('/isverified')
      .set('Authorization', `Bearer ${authToken}`);
    expect(res.status).toBe(200);
  });

  it('POST /submitcontent should allow a user to submit content', async () => {
    const res = await request(baseUrl)
      .post('/submitcontent')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: 'Nuevo Contenido',
        emoji: '😊',
        text_content: 'Contenido en texto',
        md_content: 'Contenido en Markdown',
      });
    expect(res.status).toBe(200);
  });

  it('POST /send-verification-email should trigger a verification email', async () => {
    const res = await request(baseUrl).post('/send-verification-email').send({
      email: 'user@example.com',
    });
    expect(res.status).toBe(200);
  });

  it('POST /send-password-reset-email should trigger a password reset email', async () => {
    const res = await request(baseUrl).post('/send-password-reset-email').send({
      email: 'user@example.com',
    });
    expect(res.status).toBe(200);
  });

  it('POST /reset-password should reset the password', async () => {
    const res = await request(baseUrl).post('/reset-password').send({
      token: 'reset-token',
      newPassword: 'newSecret123',
    });
    expect(res.status).toBe(200);
  });

  it('DELETE /post/:id should delete the specified post', async () => {
    const res = await request(baseUrl)
      .delete('/post/1')
      .set('Authorization', `Bearer ${authToken}`);
    expect(res.status).toBe(200);
  });
});
