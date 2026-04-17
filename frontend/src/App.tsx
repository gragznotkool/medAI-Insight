import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Results from './pages/Results';
import HistoryPage from './pages/HistoryPage';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-medical-dark text-white selection:bg-medical-accent/30">
        <Header />
        <main className="container mx-auto px-4 py-8 relative pt-24">
          {/* Ambient Glows */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-medical-blue/20 rounded-full blur-[120px] pointer-events-none -z-10"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-medical-purple/20 rounded-full blur-[120px] pointer-events-none -z-10"></div>
          
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/results" element={<Results />} />
            <Route path="/history" element={<HistoryPage />} />
          </Routes>
          <Chatbot />
        </main>
      </div>
    </Router>
  )
}

export default App
