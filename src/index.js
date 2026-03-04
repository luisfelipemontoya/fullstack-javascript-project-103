import parse from './parsers.js';

const gendiff = (filepath1, filepath2) => {
  const data1 = parse(filepath1);
  const data2 = parse(filepath2);

  console.log(data1);
  console.log(data2);
};

export default gendiff;
