import React, { useState } from 'react';
import './App.css';

const UnitConverter = () => {
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');
  const [selectedConversion, setSelectedConversion] = useState({
    from: 'm',
    to: 'cm',
  });

  const conversions = [
    { from: 'm', to: 'cm', factor: 100 },
    { from: 'km', to: 'm', factor: 1000 },
    { from: 'km', to: 'cm', factor: 100000 },
    { from: 'q', to: 'kg', factor: 100 },
    { from: 't', to: 'kg', factor: 1000 },
    { from: 'ha', to: 'm²', factor: 10000 },
    { from: 'm/s', to: 'km/h', factor: 3.6 },
    { from: 'mph', to: 'km/h', factor: 1.6092 },
    { from: 'LE', to: 'kW', factor: 0.7355 },
    { from: 'font (lb)', to: 'kg', factor: 0.4536 },
    { from: 'uncia (oz)', to: 'kg', factor: 0.02835 },
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
        conv.from === selectedConversion.from &&
        conv.to === selectedConversion.to
    );
    if (conversion) {
      setInputValue(value / conversion.factor);
    }
  };

  const handleConversionChange = (e) => {
    const [from, to] = e.target.value.split('-');
    setSelectedConversion({ from, to });
    setInputValue('');
    setOutputValue('');
  };

  return (
    <div className="container">
      <div className="head">      
        <h1>Mértékegység átváltó</h1>
      </div>
      <div className="converter">
        <input
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          className="input-field"
        />
        <select
          value={`${selectedConversion.from}-${selectedConversion.to}`}
          onChange={handleConversionChange}
          className="select-list"
        >
          {conversions.map((conv, index) => (
            <option key={index} value={`${conv.from}-${conv.to}`}>
              {conv.from} &lt;--&gt; {conv.to}
            </option>
          ))}
        </select>
        <input
          type="number"
          value={outputValue}
          onChange={handleOutputChange}
          className="input-field"
        />
      </div>
    </div>
  );
};

export default UnitConverter;
