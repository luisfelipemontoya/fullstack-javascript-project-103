import _ from 'lodash';
import parse from './parsers.js';

const genDiff = (filepath1, filepath2) => {
  const data1 = parse(filepath1);
  const data2 = parse(filepath2);

  const keys = _.sortBy([...Object.keys(data1), ...Object.keys(data2)]);

  const uniqueKeys = _.uniq(keys);

  const lines = uniqueKeys.map((key) => {
    if (!Object.hasOwn(data2, key)) {
      return `  - ${key}: ${data1[key]}`;
    }

    if (!Object.hasOwn(data1, key)) {
      return `  + ${key}: ${data2[key]}`;
    }

    if (data1[key] !== data2[key]) {
      return `  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}`;
    }

    return `    ${key}: ${data1[key]}`;
  });

  return `{\n${lines.join('\n')}\n}`;
};

export default genDiff;
