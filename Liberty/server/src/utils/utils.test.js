import { sanitize } from './index.js';

test('sanitizes should strip bad characters', () => {
  expect(sanitize('L!beRt# is L3git&&!&*A*')).toBe('L-beRt---is-L3git-----A-');
});
 