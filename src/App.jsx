import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SubscriptionProvider } from './context/SubscriptionContext'
import HomePage from './pages/HomePage'
import MyAccount from './pages/MyAccount'

export default function App() {
  return (
    <BrowserRouter>
      <SubscriptionProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/account" element={<MyAccount />} />
        </Routes>
      </SubscriptionProvider>
    </BrowserRouter>
  )
}
