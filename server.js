import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = 3001

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Rune rank test callback server.')
})

app.post('/api/vote', (req, res) => {
  const signature = req.headers['vote-signature']

  if (!signature || signature !== process.env.RUNERANK_SIG_KEY) {
    console.log('Unauthorized request - Invalid or missing signature')
    return res
      .status(401)
      .json({ error: 'Unauthorized - Invalid or missing signature' })
  }

  // do something with callback data.
  console.log('Received vote callback data:', {
    timestamp: new Date().toISOString(),
    data: req.body
  })

  res.status(200).json({
    message: 'Vote data received successfully!',
    timestamp: new Date().toISOString()
  })
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
