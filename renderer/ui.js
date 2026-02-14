const chat = document.getElementById('chat')
const input = document.getElementById('messageInput')
const btn = document.getElementById('sendBtn')

btn.addEventListener('click', async () => {
  const message = input.value
  if (!message) return

  appendMessage('You', message)
  input.value = ''

  const response = await window.api.sendMessage(message)
  appendMessage('AI', response)
})

function appendMessage(sender, text) {
  const div = document.createElement('div')
  div.innerText = `${sender}: ${text}`
  chat.appendChild(div)
}