const { ollamaProvider } = require('../providers/ollama')

async function routeModel(message) {
  return await ollamaProvider(message)
}

module.exports = { routeModel }