import React from 'react'
import { Header } from './components/Header'
import { ChatInput } from './components/ChatInput'
import { ChatBubble } from './components/ChatBubble'
import { EncryptionControls } from './components/EncryptionControls'
import { Footer } from './components/Footer'
import { useMessages } from './hooks/useMessages'
import { EncryptionType } from './types'
import { caesarCipher, playfairCipher, vigenereCipher, transpositionMatrix } from './utils/encryption'

function App() {
  const [message, setMessage] = React.useState('')
  const [encryptionType, setEncryptionType] = React.useState<EncryptionType>('caesar')
  const [encryptionKey, setEncryptionKey] = React.useState('')
  const { messages, addMessage } = useMessages()
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  React.useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleEncrypt = () => {
    if (!message.trim()) return

    addMessage(message, false)

    let encryptedText = ''
    try {
      switch (encryptionType) {
        case 'caesar':
          encryptedText = caesarCipher(message, parseInt(encryptionKey) || 3)
          break
        case 'playfair':
          encryptedText = playfairCipher(message, encryptionKey || 'KEY')
          break
        case 'vigenere':
          encryptedText = vigenereCipher(message, encryptionKey || 'KEY')
          break
        case 'transposition':
          encryptedText = transpositionMatrix(message, parseInt(encryptionKey) || 4)                                      
          break
      }
      addMessage(encryptedText, true)
    } catch (error) {
      console.error('Encryption error:', error)
      addMessage('Encryption failed! Please check your key.', true)
    }

    setMessage('')
  }

  return (
    <div className="min-h-screen bg-[#0a1929] text-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Header />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-3 bg-[#132f4c] rounded-2xl overflow-hidden shadow-xl">
            <div className="bg-[#173a5e] px-6 py-4 border-b border-[#234567]">
              <h3 className="text-lg font-semibold">Encrypted Chat</h3>
            </div>
            <div className="h-[500px] overflow-y-auto px-6 py-4 space-y-4 bg-gradient-to-b from-[#132f4c] to-[#1a365d]">
              {messages.map((msg) => (
                <ChatBubble
                  key={msg.id}
                  message={msg.text}
                  isEncrypted={msg.isEncrypted}
                  timestamp={msg.timestamp}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-4 bg-[#173a5e] border-t border-[#234567]">
              <ChatInput
                value={message}
                onChange={setMessage}
                onSend={handleEncrypt}
                placeholder="Type your message..."
              />
            </div>
          </div>
          <div className="md:col-span-1">
            <EncryptionControls
              encryptionType={encryptionType}
              onTypeChange={setEncryptionType}
              encryptionKey={encryptionKey}
              onKeyChange={setEncryptionKey}
            />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default App