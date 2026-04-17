import os

def create_file(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

# Frontend files
create_file('frontend/package.json', """{
  "name": "frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "@react-three/drei": "^9.105.6",
    "@react-three/fiber": "^8.16.2",
    "axios": "^1.6.8",
    "framer-motion": "^11.1.7",
    "lucide-react": "^0.370.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.22.3",
    "react-speech-recognition": "^3.10.0",
    "regenerator-runtime": "^0.14.1",
    "recharts": "^2.12.5",
    "three": "^0.163.0",
    "use-sound": "^4.0.1"
  },
  "devDependencies": {
    "@types/react": "^18.2.66",
    "@types/react-dom": "^18.2.22",
    "@types/react-speech-recognition": "^3.9.5",
    "@types/three": "^0.163.0",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.3",
    "typescript": "^5.2.2",
    "vite": "^5.2.0"
  }
}
""")

create_file('frontend/vite.config.ts', """import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
""")

create_file('frontend/tailwind.config.js', """/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'medical-dark': '#0a0f1c',
        'medical-blue': '#1e3a8a',
        'medical-accent': '#3b82f6',
        'medical-cyan': '#06b6d4',
        'medical-purple': '#8b5cf6',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
""")

create_file('frontend/postcss.config.js', """export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
""")

create_file('frontend/tsconfig.json', """{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
""")

create_file('frontend/tsconfig.node.json', """{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
""")

create_file('frontend/index.html', """<!doctype html>
<html lang="en" class="dark">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>MedAI Insight Engine</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  </head>
  <body class="bg-medical-dark text-white font-sans antialiased">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
""")

create_file('frontend/src/index.css', """@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .glass-panel {
    @apply bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl;
  }
}
""")

create_file('frontend/src/main.tsx', """import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'regenerator-runtime/runtime'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
""")

create_file('frontend/src/App.tsx', """import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Results from './pages/Results';
import HistoryPage from './pages/HistoryPage';

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
        </main>
      </div>
    </Router>
  )
}

export default App
""")

# Frontend Component Placeholders
create_file('frontend/src/components/Header.tsx', """import { Link } from 'react-router-dom';
import { Activity, Menu } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel !rounded-none !border-t-0 !border-x-0 !border-b-white/10 px-6 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-medical-cyan to-medical-purple">
          <Activity className="text-medical-cyan" />
          MedAI
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link to="/dashboard" className="hover:text-medical-cyan transition-colors">Dashboard</Link>
          <Link to="/history" className="hover:text-medical-cyan transition-colors">History</Link>
        </nav>
      </div>
    </header>
  );
}
""")

create_file('frontend/src/pages/Landing.tsx', """import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          AI-Powered <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-medical-cyan to-medical-purple">
            Clinical Diagnosis
          </span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg md:text-xl">
          Empowering healthcare professionals with state-of-the-art transformer models for accurate, explainable disease prediction.
        </p>
        <Link to="/dashboard">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-medical-blue to-medical-purple px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-2 mx-auto shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-shadow"
          >
            Launch Insight Engine <ArrowRight size={20} />
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}
""")

create_file('frontend/src/pages/Dashboard.tsx', """export default function Dashboard() { return <div>Dashboard Placeholder</div>; }""")
create_file('frontend/src/pages/Results.tsx', """export default function Results() { return <div>Results Placeholder</div>; }""")
create_file('frontend/src/pages/HistoryPage.tsx', """export default function HistoryPage() { return <div>History Placeholder</div>; }""")

# Backend files
create_file('backend/requirements.txt', """fastapi==0.110.1
uvicorn==0.29.0
transformers==4.39.3
torch==2.2.2
pydantic==2.6.4
shap==0.45.0
sqlalchemy==2.0.29
""")

print("Project scaffolded successfully!")
