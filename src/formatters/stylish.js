import _ from 'lodash';

const indentSize = 4;

const makeIndent = (depth, replacer = ' ') => replacer.repeat(depth * indentSize);

const stringify = (value, depth) => {
  if (!_.isObject(value) || value === null) {
    return value;
  }

  const indent = makeIndent(depth + 1);
  const bracketIndent = makeIndent(depth);

  const lines = Object.entries(value)
    .map(([key, val]) => `${indent}${key}: ${stringify(val, depth + 1)}`);

  return `{\n${lines.join('\n')}\n${bracketIndent}}`;
};

const formatNode = (node, depth) => {
  const indent = makeIndent(depth);
  const signIndent = makeIndent(depth, ' ').slice(0, -2);

  switch (node.type) {
    case 'added':
      return `${signIndent}+ ${node.key}: ${stringify(node.value, depth)}`;

    case 'removed':
      return `${signIndent}- ${node.key}: ${stringify(node.value, depth)}`;

    case 'unchanged':
      return `${indent}${node.key}: ${stringify(node.value, depth)}`;

    case 'changed':
      return [
        `${signIndent}- ${node.key}: ${stringify(node.oldValue, depth)}`,
        `${signIndent}+ ${node.key}: ${stringify(node.newValue, depth)}`,
      ].join('\n');

    case 'nested': {
      const children = node.children
        .map((child) => formatNode(child, depth + 1))
        .join('\n');

      return `${indent}${node.key}: {\n${children}\n${indent}}`;
    }

    default:
      throw new Error(`Unknown type: ${node.type}`);
  }
};

const stylish = (tree) => {
  const lines = tree.map((node) => formatNode(node, 1)).join('\n');
  return `{\n${lines}\n}\n`;
};

export default stylish;
