import React from 'react';
import Select from 'react-select';

const Navbar = ({
  userLang,
  setUserLang,
  fontSize,
  setFontSize,
}) => {
  const languages = [
    { value: "c", label: "C" },
    { value: "cpp", label: "C++" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
  ];

  const customStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: 'white',
      borderColor: '#e2e8f0',
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#cbd5e0',
      },
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: 'white',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected ? '#edf2f7' : 'white',
      color: '#2d3748',
      '&:hover': {
        backgroundColor: '#e2e8f0',
      },
    }),
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      <h1 className="text-2xl font-bold text-gray-800">Geeks Code Compiler</h1>
      <div className="flex items-center space-x-4">
        <Select
          options={languages}
          value={languages.find(lang => lang.value === userLang)}
          onChange={(e) => setUserLang(e?.value || 'python')}
          placeholder="Language"
          styles={customStyles}
          className="w-40"
        />
        <div className="flex items-center space-x-2">
          <label className="text-sm text-gray-600">Font Size</label>
          <input
            type="range"
            min="14"
            max="24"
            value={fontSize}
            onChange={(e) => setFontSize(parseInt(e.target.value))}
            className="w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-sm text-gray-600">{fontSize}px</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;