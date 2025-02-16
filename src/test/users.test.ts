import { TestFactory } from './factory';

describe('Testing the users route', () => {
  const factory = new TestFactory();

  beforeEach(async () => {
    await factory.init();
  });

  afterEach(async () => {
    await factory.close();
  });

  it('should be able to fetch all users', async () => {
    const response = await factory.app.get('/users');
    expect(response.status).toBe(200);
  });
});
