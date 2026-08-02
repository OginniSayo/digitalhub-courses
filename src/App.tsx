import type { JSX } from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import PaymentPage from './pages/PaymentPage'
import LocalPaymentPage from './pages/LocalPaymentPage'
import CryptoPaymentPage from './pages/CryptoPaymentPage'
import NotFoundPage from './pages/NotFoundPage'
import ScrollToTop from './components/ScrollToTop'

const App = (): JSX.Element => {
  return (
    <div className="relative min-h-screen w-full">
      <div
        aria-hidden
        className="sm:fixed inset-0 -z-10 bg-base-100 bg-[radial-gradient(circle_500px_at_50%_500px,color-mix(in_oklab,var(--color-primary)_10%,transparent),transparent)]"
      />
      <div className="relative z-10">
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path='/'                       element={<HomePage          />} />
          <Route path="/payment/:courseId"      element={<PaymentPage       />} />
          <Route path="/payment/crypto"         element={<CryptoPaymentPage />} />
          <Route path="/payment/local-currency" element={<LocalPaymentPage  />} />
          <Route path="*"                       element={<NotFoundPage      />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
