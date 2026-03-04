import fs from 'fs';
import path from 'path';

const parse = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  const data = fs.readFileSync(absolutePath, 'utf-8');

  const ext = path.extname(filepath);

  if (ext === '.json') {
    return JSON.parse(data);
  }

  throw new Error(`Unsupported file format: ${ext}`);
};

export default parse;
