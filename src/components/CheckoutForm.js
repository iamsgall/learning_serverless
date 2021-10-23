import React, { useState } from 'react'
import {
  // Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import axios from 'axios'

export default function CheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    })
    setLoading(true)

    if (!error) {
      const { id } = paymentMethod
      try {
        const data = await axios.post(
          'https://learning_serverless.vercel.app/api/checkout',

          {
            id,
            amount: 100 * 100,
          }
        )

        console.log(data)
        elements.getElement(CardElement).clear()
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    }
  }

  // console.log(!stripe || loading)

  return (
    <form onSubmit={handleSubmit} className='card card-body'>
      <img
        src='https://www.corsair.com/corsairmedia/sys_master/productcontent/CH-9102020-NA-K68_01.png'
        alt='k68 keyboard'
        className='img-fluid'
      />
      <h3 className='text-center my-2'>Price: $100</h3>
      <div className='form-group'>
        <CardElement className='form-control' />
      </div>
      <button disabled={!stripe} className='btn btn-success'>
        {loading ? (
          <div className='spinner-border text-light' role='status'>
            <span className='sr-only'>Loading...</span>
          </div>
        ) : (
          'Buy'
        )}
      </button>
    </form>
  )
}
