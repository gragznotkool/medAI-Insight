import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';

export default function Landing() {
  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center text-center relative z-10">
      
      {/* 3D Background Element */}
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-40">
        <Canvas>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} />
          <Sphere visible args={[1, 100, 200]} scale={2.5}>
            <MeshDistortMaterial 
              color="#3b82f6" 
              attach="material" 
              distort={0.4} 
              speed={1.5} 
              roughness={0.2}
              metalness={0.8}
            />
          </Sphere>
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="glass-panel p-10 md:p-16 max-w-4xl"
      >
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-4 inline-block px-4 py-1.5 rounded-full border border-medical-cyan/30 bg-medical-cyan/10 text-medical-cyan text-sm font-semibold tracking-wide"
        >
            v2.0 NLP Engine Active
        </motion.div>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
          Pioneering <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-medical-cyan via-blue-500 to-medical-purple drop-shadow-md">
            Diagnostic Precision
          </span>
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto mb-10 text-lg md:text-xl leading-relaxed">
          Empowering healthcare professionals with zero-shot transformer models for accurate, explainable disease prediction direct from clinical notes.
        </p>
        <Link to="/dashboard">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white hover:bg-gray-100 text-medical-dark px-10 py-4 rounded-full font-bold text-lg flex items-center gap-3 mx-auto shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all"
          >
            Launch Insight Engine <ArrowRight size={22} className="text-medical-blue" />
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}
