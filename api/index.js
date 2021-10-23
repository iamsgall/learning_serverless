require('dotenv').config()
const express = require('express')
const stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`)
const cors = require('cors')
const morgan = require('morgan')

// Initializations
const app = express()

// Settings
app.set('port', process.env.PORT || 4000)

// Middleware
app.use(express.json())
app.use(
  express.urlencoded({
    extended: false,
  })
)
app.use(morgan('dev'))
app.use(
  cors({
    origin: 'https://learning_serverless.vercel.app',
  })
)

// Routes
app.post('/api/checkout', async (req, res) => {
  const { id, amount } = req.body

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      description: 'Gaming Keyboard',
      payment_method: id,
      confirm: true,
    })

    console.log(payment)
    res.send({ message: 'Successful Payment' })
  } catch (error) {
    console.log(error)
    res.json({ message: error.raw.message })
  }
})

// Start Server
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'))
})
