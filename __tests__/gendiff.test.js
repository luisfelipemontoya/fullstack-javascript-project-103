import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) =>
  path.join(__dirname, '..', '__fixtures__', filename);

test('gendiff json flat files', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');

  const expected = fs.readFileSync(getFixturePath('expected.txt'), 'utf-8');

  expect(genDiff(file1, file2)).toBe(expected);
});
