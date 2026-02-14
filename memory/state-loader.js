const fs = require('fs');
const yaml = require('yaml');

function loadState(path) {
  const raw = fs.readFileSync(path, 'utf8');
  return yaml.parse(raw);
}

module.exports = { loadState };
