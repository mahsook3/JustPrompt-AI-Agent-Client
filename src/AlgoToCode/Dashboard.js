import React, { useState } from 'react';
import InputForm from './InputForm';
import Compiler from './Compiler';

export default function Dashboard() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('');
  const [expectedOutput, setExpectedOutput] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCodeUpdate = (newCode, newLanguage, newExpectedOutput) => {
    setCode(newCode);
    setLanguage(newLanguage);
    setExpectedOutput(newExpectedOutput);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  return (
    <>
      {!isSubmitted && <InputForm onCodeUpdate={handleCodeUpdate} onSubmit={handleSubmit} />}
      {isSubmitted && <Compiler code={code} language={language} expectedOutput={expectedOutput} />}
    </>
  );
}