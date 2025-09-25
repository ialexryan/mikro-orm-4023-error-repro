import { MikroORM } from '@mikro-orm/sqlite';
import { UserSchema } from './user';

let orm: MikroORM;

beforeAll(async () => {
  orm = await MikroORM.init({
    dbName: ':memory:',
    entities: [UserSchema],
    allowGlobalContext: true,
  });
  await orm.schema.refreshDatabase();
});

afterAll(async () => {
  await orm.close(true);
});

test('basic CRUD example with defineEntity schema', async () => {
  orm.em.create(UserSchema, { name: 'Foo', email: 'foo' });
  await orm.em.flush();
  orm.em.clear();

  const user = await orm.em.findOneOrFail(UserSchema, { email: 'foo' });
  expect(user.name).toBe('Foo');
  user.name = 'Bar';
  orm.em.remove(user);
  await orm.em.flush();

  const count = await orm.em.count(UserSchema, { email: 'foo' });
  expect(count).toBe(0);
});
