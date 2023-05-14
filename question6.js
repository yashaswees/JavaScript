function normalize(input) {
  var output = {};
  //  traverse the input object
  function traverse(node) {
    output[node.id] = {
      id: node.id,
      name: node.name,
      children: node.children ? node.children.map(child => child.id) : []
    };
    if (node.children) {
      node.children.forEach(child => traverse(child));
    }
  }
  Object.values(input).forEach(node => traverse(node));
  return output;
}
const input = {
  '1': {
    id: 1,
    name: 'John',
    children: [
      { id: 2, name: 'Sally' },
      { id: 3, name: 'Mark', children: [{ id: 4, name: 'Harry' }] }
    ]
  },
  '5': {
    id: 5,
    name: 'Mike',
    children: [{ id: 6, name: 'Peter' }]
  }
};
const output = normalize(input);
console.log(output);
