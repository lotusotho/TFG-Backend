import request from 'supertest';

const baseUrl = 'https://blog.server.mapach.es';
let authToken: string;

beforeAll(async () => {
  const res = await request(baseUrl).post('/login').send({
    username: 'testuser'.toLowerCase().trim(),
    password: 'vDvq2l!CSzlzeeqo'.toLowerCase().trim(),
  });
  expect(res.status).toBe(200);
  authToken = res.body.token;
});

describe('TFG Backend API Endpoints', () => {
  test('GET / should respond with the main page', async () => {
    const res = await request(baseUrl).get('/');
    expect(res.status).toBe(200);
  });

  test('POST /register should register a new user', async () => {
    const res = await request(baseUrl).post('/register').send({
      username: 'UsuarioTest'.toLowerCase().trim(),
      email: 'test@example.com'.toLowerCase().trim(),
      password: 'secret123'.toLowerCase().trim(),
      type: 1,
    });
    expect(res.status).toBe(201);
  });

  test('POST /login should authenticate a user', async () => {
    const res = await request(baseUrl).post('/login').send({
      username: 'testuser'.toLowerCase().trim(),
      password: 'vDvq2l!CSzlzeeqo'.toLowerCase().trim(),
    });
    expect(res.status).toBe(200);
  });

  test('GET /tokenusername should return the username for a valid token', async () => {
    const res = await request(baseUrl)
      .get('/tokenusername')
      .set('Authorization', `Bearer ${authToken}`);
    expect(res.status).toBe(200);
  });

  test('GET /username should return the username', async () => {
    const res = await request(baseUrl)
      .get('/username')
      .set('Authorization', `Bearer ${authToken}`);
    expect(res.status).toBe(200);
  });

  test('GET /usercontent should return user content', async () => {
    const res = await request(baseUrl)
      .get('/usercontent')
      .set('Authorization', `Bearer ${authToken}`);
    expect(res.status).toBe(200);
  });

  test('GET /logout should log the user out', async () => {
    const res = await request(baseUrl)
      .get('/logout')
      .set('Authorization', `Bearer ${authToken}`);
    expect(res.status).toBe(200);
  });

  test('GET /verify-email should verify the email', async () => {
    const res = await request(baseUrl).get('/verify-email');
    expect(res.status).toBe(200);
  });

  test('GET /posts should return all posts', async () => {
    const res = await request(baseUrl).get('/posts');
    expect(res.status).toBe(200);
  });

  test('POST /submitcontent should allow a user to submit content', async () => {
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

  test('DELETE /post/:id should delete the specified post', async () => {
    const res = await request(baseUrl)
      .delete('/post/1')
      .set('Authorization', `Bearer ${authToken}`);
    expect(res.status).toBe(200);
  });
});
