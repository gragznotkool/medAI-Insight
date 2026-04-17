import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, ChevronRight, Activity, AlertCircle } from 'lucide-react';

export default function HistoryPage() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch('http://localhost:8000/history');
        const data = await res.json();
        setHistory(data);
      } catch (e) {
        console.error("Failed to fetch history", e);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const filteredHistory = history.filter(record => 
    record.input_notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.predictions.some((p: any) => p.disease.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-5xl mx-auto py-8 lg:py-12 relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-medical-cyan to-medical-purple mb-2">
            Patient History
          </h1>
          <p className="text-gray-400">Timeline of past AI diagnostic analyses.</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }} 
          animate={{ opacity: 1, x: 0 }}
          className="relative w-full md:w-auto"
        >
          <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search symptoms, diseases..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-80 bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-medical-cyan transition-colors"
          />
        </motion.div>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center p-12"><Activity className="animate-pulse text-medical-cyan w-10 h-10" /></div>
        ) : filteredHistory.length === 0 ? (
          <div className="glass-panel p-12 text-center text-gray-400 flex flex-col items-center">
            <AlertCircle className="w-12 h-12 mb-4 opacity-50" />
            <p>No historical records found matching your search.</p>
          </div>
        ) : (
          filteredHistory.map((record, idx) => (
            <motion.div 
              key={record.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-panel p-5 hover:bg-white/10 transition-all cursor-pointer group flex flex-col md:flex-row gap-6 relative overflow-hidden"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-medical-cyan to-medical-purple"></div>
              
              <div className="md:w-1/4 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0">
                <div className="flex items-center gap-2 text-gray-400 text-sm font-mono mb-2">
                  <Calendar size={14} /> 
                  {new Date(record.timestamp).toLocaleDateString()}
                </div>
                <div className="text-xl font-bold text-white group-hover:text-medical-cyan transition-colors">
                  {record.predictions.length > 0 ? record.predictions[0].disease : 'No Result'}
                </div>
                <div className="text-sm text-medical-purple font-semibold mt-1">
                  Top Confidence: {record.predictions.length > 0 ? (record.predictions[0].confidence * 100).toFixed(1) : 0}%
                </div>
              </div>
              
              <div className="md:w-2/4 flex flex-col justify-center">
                <p className="text-gray-300 text-sm line-clamp-3 leading-relaxed italic border-l-2 border-white/10 pl-4">
                  "{record.input_notes}"
                </p>
              </div>

              <div className="md:w-1/4 flex items-center justify-end">
                <button className="text-medical-cyan flex items-center gap-1 group-hover:gap-2 transition-all font-medium text-sm">
                  View Full Report <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}