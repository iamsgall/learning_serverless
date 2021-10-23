import './App.css'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import CheckoutForm from './components/CheckoutForm'
import 'bootswatch/dist/lux/bootstrap.min.css'

const stripePromise = loadStripe(
  'pk_test_51JnP3vIJApp7JYOGk1EPAvCIXa2HmMLAOlWsZL8mxFjf6udveliflnO6eufX85GdzaBJ3T48DA9LeSs32xJ5mtWj00QPaw2mpT'
)

function App() {
  return (
    <Elements stripe={stripePromise}>
      <div className='container p-4'>
        <div className='row'>
          <div className='col-md-4 offset-md-4 h-100'>
            <CheckoutForm />
          </div>
        </div>
      </div>
    </Elements>
  )
}

export default App
