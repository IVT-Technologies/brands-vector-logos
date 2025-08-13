import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ScrollToTop from './utils/ScrollToTop'
import Home from './pages/Home'
import Layout from './layout/Layout'
import AlphabetLogos from './components/AlphabetLogos'
import ProductDetail from './pages/ProductDetail';
import About from './pages/About'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import TermsAndConditions from './pages/TermAndConditionPage'
import ContactPage from './pages/ContactPage'

function App() {
  return (
    <div className="overflow-x-hidden md:overflow-x-hidden lg:overflow-x-hidden ">
      <BrowserRouter>
      <ScrollToTop/>
        <Routes>
          <Route element={<Layout/>}>
            <Route path="/" element={<Home />} />
            <Route path="/logos/:alphabet" element={<AlphabetLogos />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
