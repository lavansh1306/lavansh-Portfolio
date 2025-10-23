import React from 'react';
import { motion } from 'framer-motion';
import { useForm, ValidationError } from '@formspree/react';

export const ContactForm: React.FC = () => {
  const [state, handleSubmit] = useForm("xdklyygk");

  if (state.succeeded) {
    return (
      <section id="contact" className="min-h-screen flex items-center justify-center p-4 relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="backdrop-blur-lg bg-black/40 p-8 rounded-2xl border border-green-500/20 shadow-2xl shadow-green-500/10 text-center"
        >
          <div className="flex flex-col items-center space-y-4">
            <svg className="w-16 h-16 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <h2 className="text-2xl font-bold text-green-400 font-mono">NEURAL LINK ESTABLISHED</h2>
            <p className="text-gray-400 font-mono">Your message has been transmitted successfully.</p>
            <motion.button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 hover:bg-green-500/30 transition-colors font-mono"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              INITIALIZE NEW LINK
            </motion.button>
          </div>
        </motion.div>
      </section>
    );
  }

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
              ESTABLISH NEURAL LINK
            </h2>
            <div className="h-1 w-32 mx-auto mt-4 bg-gradient-to-r from-blue-500/50 via-cyan-500/50 to-blue-500/50 rounded-full"></div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="group"
            >
              <div className="relative">
                <input
                  id="name"
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-3 bg-blue-900/20 border border-blue-500/30 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-500/60 transition-colors font-mono"
                  placeholder="ENTER.NAME"
                />
                <ValidationError 
                  prefix="Name" 
                  field="name"
                  errors={state.errors}
                  className="text-red-400 text-sm mt-1 font-mono"
                />
                <div className="absolute inset-0 border border-blue-400/20 rounded-lg transition-opacity opacity-0 group-hover:opacity-100 pointer-events-none"></div>
              </div>
            </motion.div>

            {/* Email Input */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="group"
            >
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 bg-cyan-900/20 border border-cyan-500/30 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:border-cyan-500/60 transition-colors font-mono"
                  placeholder="ENTER.EMAIL"
                />
                <ValidationError 
                  prefix="Email" 
                  field="email"
                  errors={state.errors}
                  className="text-red-400 text-sm mt-1 font-mono"
                />
                <div className="absolute inset-0 border border-cyan-400/20 rounded-lg transition-opacity opacity-0 group-hover:opacity-100 pointer-events-none"></div>
              </div>
            </motion.div>

            {/* Message Input */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="group"
            >
              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-violet-900/20 border border-violet-500/30 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:border-violet-500/60 transition-colors font-mono resize-none"
                  placeholder="ENTER.MESSAGE"
                ></textarea>
                <ValidationError 
                  prefix="Message" 
                  field="message"
                  errors={state.errors}
                  className="text-red-400 text-sm mt-1 font-mono"
                />
                <div className="absolute inset-0 border border-violet-400/20 rounded-lg transition-opacity opacity-0 group-hover:opacity-100 pointer-events-none"></div>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={state.submitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-4 rounded-lg font-mono text-lg transition-colors
                ${state.submitting 
                  ? 'bg-gray-700 cursor-wait' 
                  : 'bg-gradient-to-r from-blue-500/80 via-cyan-500/80 to-blue-500/80 hover:from-blue-500 hover:via-cyan-500 hover:to-blue-500'
                }
              `}
            >
              <div className="flex items-center justify-center space-x-2">
                {state.submitting && (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                <span>
                  {state.submitting ? 'PROCESSING...' : 'INITIATE NEURAL LINK'}
                </span>
              </div>
            </motion.button>

            <ValidationError 
              errors={state.errors}
              className="text-red-400 text-sm mt-4 text-center font-mono"
            />
          </form>

          {/* Connection Status */}
          <div className="text-center mt-8">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-green-400 font-mono text-sm">AWAITING CONNECTION</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
