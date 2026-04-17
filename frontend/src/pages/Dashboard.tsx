import 'regenerator-runtime/runtime';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mic, FileText, Upload, Send, Loader2, MicOff } from 'lucide-react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export default function Dashboard() {
  const [notes, setNotes] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  
  useEffect(() => {
    // When listening stops, append the fresh transcript to notes
    if (!listening && transcript) {
       setNotes(prev => prev + (prev.length > 0 ? '\n' : '') + transcript);
       resetTranscript();
    }
  }, [listening, transcript, resetTranscript]);

  const handleAnalyze = async () => {
    if (!notes.trim()) return;
    setIsAnalyzing(true);
    
    try {
      const res = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes })
      });
      const data = await res.json();
      
      navigate('/results', { state: { data, notes } });
    } catch (e) {
      console.error(e);
      alert('Error connecting to MedAI Backend. Ensure FastAPI is running on port 8000.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setNotes(e.target?.result as string);
      reader.readAsText(file);
    }
  };

  const toggleRecording = () => {
    if (!browserSupportsSpeechRecognition) {
       alert("Your browser does not support speech recognition. Try Google Chrome.");
       return;
    }
    
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true });
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 lg:py-12 relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-medical-cyan to-medical-purple inline-block mb-2">
          Clinical Input
        </h1>
        <p className="text-gray-400 text-lg">Enter patient notes, upload a medical record, or use voice dictation.</p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="glass-panel p-4 md:p-6 relative overflow-hidden"
      >
        {isAnalyzing && (
          <div className="absolute inset-0 bg-medical-dark/90 backdrop-blur-md z-20 flex flex-col items-center justify-center text-medical-cyan">
            <Loader2 className="w-16 h-16 mb-6 animate-spin text-medical-accent" />
            <h3 className="text-2xl font-semibold animate-pulse tracking-wide">Analyzing clinical data...</h3>
            <p className="text-gray-300 mt-2 font-mono">Running Zero-Shot NLP Engine</p>
          </div>
        )}
      
        <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
          <div className="flex gap-2 w-full md:w-auto">
            <button 
              onClick={toggleRecording}
              className={`flex-1 md:flex-none p-3 rounded-xl flex justify-center items-center gap-2 transition-all ${listening ? 'bg-red-500/20 text-red-500 border border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.4)]' : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/5'}`}
            >
              {listening ? (
                 <span className="flex items-center gap-2 animate-pulse"><MicOff size={20} /> Stop Listening</span>
              ) : (
                 <><Mic size={20} /> Dictate</>
              )}
            </button>
            <label className="flex-1 md:flex-none p-3 rounded-xl flex justify-center items-center gap-2 bg-white/5 hover:bg-white/10 text-gray-300 cursor-pointer transition-all border border-white/5">
              <Upload size={20} />
              Upload .txt
              <input type="file" accept=".txt" className="hidden" onChange={handleFileUpload} />
            </label>
          </div>
          <FileText className="text-medical-cyan/30 hidden md:block" size={28} />
        </div>

        <div className="relative group">
            <textarea
            value={listening ? notes + (notes.length > 0 ? '\n' : '') + transcript : notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Type or dictate patient symptoms... e.g., 'Patient presents with severe chest pain, shortness of breath, and high blood pressure.'"
            className="w-full h-56 md:h-72 bg-black/30 border border-white/5 rounded-xl p-5 text-gray-100 text-lg outline-none focus:border-medical-cyan/50 focus:ring-1 focus:ring-medical-cyan/50 transition-all resize-none shadow-inner leading-relaxed"
            disabled={listening}
            />
            <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-medical-cyan/50 animate-ping group-focus-within:opacity-0"></div>
        </div>

        <div className="mt-6 flex justify-end">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleAnalyze}
            disabled={!notes || isAnalyzing}
            className="w-full md:w-auto bg-gradient-to-r from-medical-blue to-purple-800 hover:from-medical-accent hover:to-medical-purple text-white px-10 py-4 rounded-xl flex justify-center items-center gap-3 font-bold text-lg disabled:opacity-50 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-all border border-white/10"
          >
            Extract Insights <Send size={20} />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}