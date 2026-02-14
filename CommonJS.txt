const { loadState } = require('../memory/state-loader.js');
const fs = require('fs');

test('parses YAML into expected object', () => {
  const yaml = `
    project: NeuralShell
    phase: 289
    modules:
      - name: LLM Router
        status: done
  `;
  jest.spyOn(fs, 'readFileSync').mockReturnValue(yaml);

  const state = loadState('dummy-path');
  expect(state.project).toBe('NeuralShell');
  expect(state.phase).toBe(289);
  expect(state.modules[0].status).toBe('done');
});
