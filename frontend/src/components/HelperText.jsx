import React from 'react'
import { motion } from "framer-motion";
import { FiDownload, FiInfo } from "react-icons/fi";

const HelperText = () => {
  return (
     <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-6">
            <FiInfo className="text-indigo-600 text-2xl" />
            <h2 className="text-2xl font-bold text-gray-800">How to Customize</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="font-semibold text-gray-800">Select Logo Parts</h3>
                <p className="text-gray-600">Click directly on any element of the logo to select it for customization.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="font-semibold text-gray-800">Choose Your Color</h3>
                <p className="text-gray-600">Use the color picker or enter a hex code to change the selected part's color.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="font-semibold text-gray-800">Download Your Design</h3>
                <p className="text-gray-600">When you're happy with your custom logo, click the download button.</p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-indigo-50 rounded-xl border-l-4 border-indigo-400">
            <p className="text-sm text-indigo-800 font-medium">
              💡 Pro Tip: Try different color combinations to find the perfect look for your brand!
            </p>
          </div>
        </motion.div>
  )
}

export default HelperText
