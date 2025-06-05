import test from 'node:test';
import assert from 'node:assert/strict';
import jwt from 'jsonwebtoken';
import { getSubFromAuthHeader } from '../lib/token.js';

test('returns sub for valid Bearer token', () => {
  process.env.NEXTAUTH_SECRET = 'test-secret';
  const token = jwt.sign({ sub: 'user123' }, process.env.NEXTAUTH_SECRET);
  const header = `Bearer ${token}`;
  const sub = getSubFromAuthHeader(header);
  assert.equal(sub, 'user123');
});

test('returns null for invalid or missing header', () => {
  process.env.NEXTAUTH_SECRET = 'test-secret';
  let result = getSubFromAuthHeader('Bearer invalidtoken');
  assert.equal(result, null);

  result = getSubFromAuthHeader(undefined);
  assert.equal(result, null);
});
