const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

const dataDir = path.join(__dirname, '../data')
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir)

async function saveMessage(input, output) {
  const entry = {
    id: uuidv4(),
    timestamp: new Date().toISOString(),
    input,
    output
  }

  fs.appendFileSync(
    path.join(dataDir, 'session.json'),
    JSON.stringify(entry) + '\n'
  )
}

module.exports = { saveMessage }