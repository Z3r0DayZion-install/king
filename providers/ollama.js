const fetch = require('node-fetch')

async function ollamaProvider(message) {
  const res = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'llama3',
      prompt: message,
      stream: false
    })
  })

  const data = await res.json()
  return data.response || 'No response'
}

module.exports = { ollamaProvider }