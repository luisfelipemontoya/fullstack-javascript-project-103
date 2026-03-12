const formatValue = (value) => {
  if (value !== null && typeof value === 'object') {
    return '[complex value]';
  }

  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return String(value);
};

const iter = (nodes, parentPath = '') => {
  const lines = nodes.flatMap((node) => {
    const { key, type } = node;
    const propertyPath = parentPath ? `${parentPath}.${key}` : key;

    switch (type) {
      case 'nested':
        return iter(node.children, propertyPath);

      case 'added':
        return `Property '${propertyPath}' was added with value: ${formatValue(node.value)}`;

      case 'removed':
        return `Property '${propertyPath}' was removed`;

      case 'changed':
        return `Property '${propertyPath}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`;

      case 'unchanged':
        return [];

      default:
        throw new Error(`Unknown type: ${type}`);
    }
  });

  return lines;
};

export default (tree) => `${iter(tree).join('\n')}\n`;
