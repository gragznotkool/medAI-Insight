import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, AlertTriangle, Activity, Brain, HeartPulse } from 'lucide-react';
import { ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip } from 'recharts';

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const { data, notes } = location.state || {};

  // Test to verify .env is loaded by Vite
  // @ts-ignore
  const apiKey = import.meta.env.VITE_GEMINI_KEY;
  console.log("Vite ENV Test - apiKey:", apiKey);

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <AlertTriangle className="text-yellow-500 w-16 h-16 mb-4" />
        <h2 className="text-2xl font-bold mb-4">No Data Found</h2>
        <button onClick={() => navigate('/dashboard')} className="text-medical-cyan hover:underline">
          Return to Dashboard
        </button>
      </div>
    );
  }

  const { meddx_report, highlights, risk_level } = data;

  const handleDownload = async () => {
    const element = document.getElementById('report-content') as HTMLElement;
    const opt = {
      margin:       0.5,
      filename:     'MedDx_Clinical_Report.pdf',
      image:        { type: 'jpeg' as const, quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true, logging: false },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    
    try {
        const html2pdfModule = await import('html2pdf.js');
        const pdfGen = html2pdfModule.default ? html2pdfModule.default : html2pdfModule;
        // @ts-ignore
        (pdfGen as any)().set(opt as any).from(element as any).save();
    } catch (e) {
        console.error("Failed to load PDF engine", e);
        alert("PDF Engine failed to load. Please try again.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <Link to="/dashboard" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft size={20} /> Back to Input
        </Link>
        <button 
          onClick={handleDownload}
          className="flex items-center gap-2 bg-gradient-to-r from-medical-blue to-medical-cyan hover:from-medical-cyan hover:to-medical-blue border border-medical-cyan/50 shadow-[0_0_15px_rgba(6,182,212,0.3)] px-5 py-2.5 rounded-lg text-sm font-bold text-white transition-all transform hover:scale-105"
        >
          <Download size={18} /> Export PDF Report
        </button>
      </div>

      <div id="report-content" className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="col-span-1 lg:col-span-3">
           {meddx_report.red_flags && meddx_report.red_flags.length > 0 && (
             <motion.div initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} className="bg-red-500/20 border border-red-500 p-4 rounded-xl mb-6 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                <h3 className="text-red-400 font-bold flex items-center gap-2"><AlertTriangle /> RED FLAGS IDENTIFIED</h3>
                <ul className="list-disc list-inside text-red-200 mt-2">
                   {meddx_report.red_flags.map((flag: string, i: number) => (
                      <li key={`flag-${i}`}>{flag}</li>
                   ))}
                </ul>
             </motion.div>
           )}
        </div>

        {/* Left Column: Metrics & Findings */}
        <div className="lg:col-span-1 space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`glass-panel p-6 border-l-4 ${risk_level === 'High' ? 'border-l-red-500' : risk_level === 'Medium' ? 'border-l-yellow-500' : 'border-l-green-500'}`}
          >
            <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-1">Risk Assessment</h3>
            <div className={`text-4xl font-bold flex items-center gap-3 mb-6 ${risk_level === 'High' ? 'text-red-500' : risk_level === 'Medium' ? 'text-yellow-500' : 'text-green-500'}`}>
              <Activity className="animate-pulse" /> {risk_level} Risk
            </div>
            
            <div className="border-t border-white/10 pt-4 flex justify-between items-center">
              <div className="flex flex-col items-start gap-1">
                 <div className="text-xs text-gray-400 uppercase">Heart Rate</div>
                 <div className="flex items-center gap-2 text-2xl font-mono text-gray-200">
                    <HeartPulse className={`${risk_level === 'High' ? 'text-red-500 animate-[bounce_0.5s_infinite]' : 'text-green-500 animate-[bounce_1.5s_infinite]'}`} size={20} />
                    {risk_level === 'High' ? '112' : risk_level === 'Medium' ? '92' : '72'} <span className="text-xs text-gray-500">bpm</span>
                 </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                 <div className="text-xs text-gray-400 uppercase">SpO2 Level</div>
                 <div className="flex items-center gap-2 text-2xl font-mono text-gray-200">
                    <div className={`${risk_level === 'High' ? 'text-red-500 animate-pulse' : 'text-medical-cyan animate-pulse'}`}>O₂</div>
                    {risk_level === 'High' ? '88' : risk_level === 'Medium' ? '95' : '99'} <span className="text-xs text-gray-500">%</span>
                 </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-panel p-6 flex flex-col"
          >
            <h3 className="text-lg font-bold mb-2 text-medical-cyan">Investigations Recommended</h3>
            <ul className="text-sm text-gray-300 space-y-2 list-disc list-inside bg-black/20 p-4 rounded-xl border border-white/5">
                {meddx_report.investigations_recommended.map((inv: string, i: number) => <li key={`inv-${i}`}>{inv}</li>)}
            </ul>
          </motion.div>
        </div>

        {/* Right Column: AI Insights & Text Highlights */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel p-6"
          >
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Brain className="text-medical-purple" /> MedDx Decision Reasoning
            </h3>
            <p className="text-gray-300 italic mb-6 border-l-2 border-medical-cyan pl-3">{meddx_report.patient_summary}</p>
            
            <h4 className="text-sm text-gray-400 uppercase tracking-widest mb-3">Differential Diagnosis</h4>
            <div className="space-y-4">
              {meddx_report.differentials.map((p: any, idx: number) => (
                <div key={idx} className="relative bg-black/40 p-5 rounded-xl border border-white/5">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                        <span className="text-lg font-bold text-gray-200">{p.disease}</span>
                        <p className="text-xs text-medical-cyan font-mono mt-1">ICD-10: {p.icd_10}</p>
                    </div>
                    <span className="text-medical-accent font-mono text-lg bg-medical-blue/10 px-3 py-1 rounded shadow-inner">{(p.probability * 100).toFixed(1)}%</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-2"><span className="font-semibold text-gray-300">Reasoning:</span> {p.reasoning}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* New Clinical Pathways Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-panel p-6"
          >
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-purple-200">
               Management Plan
            </h3>
            <ul className="text-md text-gray-300 space-y-2 list-disc list-inside bg-black/20 p-4 rounded-xl border border-white/5">
                {meddx_report.management_plan.map((inv: string, i: number) => <li key={`man-${i}`}>{inv}</li>)}
            </ul>
          </motion.div>
          
          <div className="text-xs text-gray-500 text-center opacity-70">
             <p>{meddx_report.disclaimer}</p>
             <p className="mt-1">Evidence Sources: {meddx_report.evidence_sources.join(", ")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}