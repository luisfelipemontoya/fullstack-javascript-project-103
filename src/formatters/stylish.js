import _ from 'lodash';

const indentSize = 4;

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }

  const indent = ' '.repeat(depth * indentSize);
  const bracketIndent = ' '.repeat((depth - 1) * indentSize);

  const lines = Object.entries(value)
    .map(([key, val]) => `${indent}${key}: ${stringify(val, depth + 1)}`);

  return [
    '{',
    ...lines,
    `${bracketIndent}}`,
  ].join('\n');
};

const stylish = (tree, depth = 1) => {
  const indent = ' '.repeat(depth * indentSize - 2);
  const bracketIndent = ' '.repeat((depth - 1) * indentSize);

  const lines = tree.flatMap((node) => {
    const {
      key, type, value, oldValue, newValue, children,
    } = node;

    switch (type) {
      case 'added':
        return `${indent}+ ${key}: ${stringify(value, depth + 1)}`;

      case 'removed':
        return `${indent}- ${key}: ${stringify(value, depth + 1)}`;

      case 'unchanged':
        return `${indent}  ${key}: ${stringify(value, depth + 1)}`;

      case 'changed':
        return [
          `${indent}- ${key}: ${stringify(oldValue, depth + 1)}`,
          `${indent}+ ${key}: ${stringify(newValue, depth + 1)}`,
        ];

      case 'nested':
        return `${indent}  ${key}: ${stylish(children, depth + 1)}`;

      default:
        throw new Error(`Unknown type: ${type}`);
    }
  });

  return [
    '{',
    ...lines,
    `${bracketIndent}}`,
  ].join('\n');
};

export default stylish;
