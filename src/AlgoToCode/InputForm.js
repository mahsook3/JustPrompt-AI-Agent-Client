import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Axios from 'axios';

const steps = [
  { title: 'Select Language', description: 'Choose your preferred programming language' },
  { title: 'Describe Requirements', description: 'Describe your algorithm requirements' },
  { title: 'Enter Algorithm', description: 'Type the name of your algorithm' },
  { title: 'Expected Output', description: 'Describe the expected output' }
];

export default function ModernInputForm({ onCodeUpdate, onSubmit }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    language: '',
    algorithm: '',
    requirement: '',
    expectedOutput: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      submitForm();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const languageCodes = {
    java: 'java',
    python: 'python',
    c: 'c',
    cpp: 'cpp'
  };

  const submitForm = () => {
    setIsLoading(true);
    const formDataWithCode = {
      ...formData,
      language: languageCodes[formData.language] || formData.language
    };

    Axios.post('http://localhost:8000/generate', formDataWithCode)
      .then((response) => {
        onCodeUpdate(response.data.code, formDataWithCode.language, formDataWithCode.expectedOutput);
        onSubmit(); // Update submission state
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error submitting form:', error);
        setIsLoading(false);
      });
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-green-100">
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-3xl">
          <div className="mb-8">
            <div className="relative pt-1">
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
                <div
                  style={{ width: `${progress}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-400 transition-all duration-500 ease-in-out"
                ></div>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{steps[currentStep].title}</h2>
            <p className="text-lg text-gray-600">{steps[currentStep].description}</p>
          </div>
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-xl rounded-lg p-8"
          >
            {currentStep === 0 && (
              <div className="space-y-4">
                <label htmlFor="language" className="block text-lg font-medium text-gray-700">
                  Programming Language
                </label>
                <select
                  id="language"
                  name="language"
                  value={formData.language}
                  onChange={handleInputChange}
                  className="mt-1 block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-green-400 focus:border-green-400 sm:text-lg rounded-md"
                >
                  <option value="">Select a language</option>
                  <option value="java">Java</option>
                  <option value="python">Python</option>
                  <option value="c">C</option>
                  <option value="cpp">C++</option>
                </select>
              </div>
            )}
            {currentStep === 1 && (
              <div className="space-y-4">
                <label htmlFor="requirement" className="block text-lg font-medium text-gray-700">
                  Requirements
                </label>
                <textarea
                  id="requirement"
                  name="requirement"
                  value={formData.requirement}
                  onChange={handleInputChange}
                  placeholder="Describe your requirements"
                  rows={6}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-400 focus:border-green-400 sm:text-lg"
                ></textarea>
              </div>
            )}
            {currentStep === 2 && (
              <div className="space-y-4">
                <label htmlFor="algorithm" className="block text-lg font-medium text-gray-700">
                  Algorithm Name
                </label>
                <input
                  type="text"
                  id="algorithm"
                  name="algorithm"
                  value={formData.algorithm}
                  onChange={handleInputChange}
                  placeholder="Enter algorithm name"
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-400 focus:border-green-400 sm:text-lg"
                />
              </div>
            )}
            {currentStep === 3 && (
              <div className="space-y-4">
                <label htmlFor="expectedOutput" className="block text-lg font-medium text-gray-700">
                  Expected Output
                </label>
                <textarea
                  id="expectedOutput"
                  name="expectedOutput"
                  value={formData.expectedOutput}
                  onChange={handleInputChange}
                  placeholder="Describe the expected output"
                  rows={6}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-400 focus:border-green-400 sm:text-lg"
                ></textarea>
              </div>
            )}
          </motion.div>
        </div>
      </main>
      <div className="relative w-full">
        <button
          onClick={handlePrev}
          disabled={currentStep === 0}
          className={`absolute left-0 bottom-0 m-4 px-6 py-3 rounded-md text-lg font-medium transition-colors duration-300 ${
            currentStep === 0
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className={`absolute right-0 bottom-0 m-4 px-6 py-3 rounded-md text-lg font-medium transition-colors duration-300 ${
            currentStep === steps.length - 1
              ? 'bg-green-400 text-white hover:bg-green-700'
              : 'bg-green-400 text-white hover:bg-green-700'
          }`}
        >
          {isLoading ? 'Loading...' : currentStep === steps.length - 1 ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  );
}