import React, { useState } from 'react';

const UnitConverter = () => {
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');
  const [selectedConversion, setSelectedConversion] = useState({
    from: 'meter',
    to: 'centimeter',
  });

  const conversions = [
    { from: 'meter', to: 'centimeter', factor: 100 },
    { from: 'meter', to: 'kilometer', factor: 0.001 },
    { from: 'centimeter', to: 'meter', factor: 0.01 },
    { from: 'centimeter', to: 'kilometer', factor: 0.00001 },
    { from: 'kilometer', to: 'meter', factor: 1000 },
    { from: 'kilometer', to: 'centimeter', factor: 100000 },
  ];

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (isNaN(value)) {
      setOutputValue('');
      return;
    }
    const conversion = conversions.find(
      (conv) =>
        conv.from === selectedConversion.from &&
        conv.to === selectedConversion.to
    );
    if (conversion) {
      setOutputValue(value * conversion.factor);
    }
  };

  const handleOutputChange = (e) => {
    const value = e.target.value;
    setOutputValue(value);
    if (isNaN(value)) {
      setInputValue('');
      return;
    }
    const conversion = conversions.find(
      (conv) =>
        conv.from === selectedConversion.to &&
        conv.to === selectedConversion.from
    );
    if (conversion) {
      setInputValue(value * conversion.factor);
    }
  };

  const handleConversionChange = (e) => {
    const [from, to] = e.target.value.split('-');
    setSelectedConversion({ from, to });
    setInputValue('');
    setOutputValue('');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <input
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          style={{ width: '100px', textAlign: 'right' }}
        />
        <select
          value={`${selectedConversion.from}-${selectedConversion.to}`}
          onChange={handleConversionChange}
          style={{ width: '150px' }}
        >
          {conversions.map((conv, index) => (
            <option key={index} value={`${conv.from}-${conv.to}`}>
              {conv.from} -- {conv.to}
            </option>
          ))}
        </select>
        <input
          type="number"
          value={outputValue}
          onChange={handleOutputChange}
          style={{ width: '100px', textAlign: 'left' }}
        />
      </div>
    </div>
  );
};

export default UnitConverter;
