import { defineEntity, type InferEntity } from '@mikro-orm/core';

const p = defineEntity.properties;

export const UserSchema = defineEntity({
  name: 'User',
  tableName: 'user',
  properties: () => ({
    id: p.integer().primary().autoincrement(),
    name: p.string(),
    email: p.string().unique(),
    bio: p.string().nullable(true).default(null),
  }),
});

export type User = InferEntity<typeof UserSchema>;
