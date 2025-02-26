import express from 'express'

const app = express()
const port = 3001

app.use(express.json())

app.post('/vote', (req, res) => {
  const signature = req.headers['vote-signature']

  if (signature !== process.env.RUNERANK_SIG_KEY) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  // do something with callback data.
  console.log('Data:', req.body)

  res.status(200).json({ message: 'Data received successfully!' })
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
