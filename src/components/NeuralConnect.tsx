import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export const NeuralConnect = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center p-4 relative">
      {/* Background grid effect */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl w-full"
      >
        <div className="backdrop-blur-lg bg-black/40 p-8 rounded-2xl border border-blue-500/20 shadow-2xl shadow-blue-500/10">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent font-mono">
              NEURAL LINK STATUS: READY
            </h2>
            <div className="h-1 w-32 mx-auto mt-4 bg-gradient-to-r from-blue-500/50 via-cyan-500/50 to-blue-500/50 rounded-full"></div>
          </div>

          {/* Contact Information Grid */}
          <div className="grid gap-6 mb-8">
            {/* Email Box */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-4 rounded-lg bg-blue-900/20 border border-blue-500/30 group cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 rounded-lg bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-blue-300 font-mono text-sm">EMAIL.CONNECT</p>
                </div>
              </div>
            </motion.div>

            {/* Phone Box */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-4 rounded-lg bg-cyan-900/20 border border-cyan-500/30 group cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 rounded-lg bg-cyan-500/20 group-hover:bg-cyan-500/30 transition-colors">
                  <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-cyan-300 font-mono text-sm">PHONE.CONNECT</p>
                </div>
              </div>
            </motion.div>

            {/* Location Box */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-4 rounded-lg bg-indigo-900/20 border border-indigo-500/30 group"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 rounded-lg bg-indigo-500/20 group-hover:bg-indigo-500/30 transition-colors">
                  <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-indigo-300 font-mono text-sm">LOCATION.PING</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Connection Status */}
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-green-400 font-mono text-sm">NEURAL LINK ACTIVE</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
