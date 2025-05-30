import React, { useState, useEffect } from 'react';
import { unitConversions } from '../data/unitConversionData';

interface UnitConverterViewProps {
  isDarkMode: boolean;
}

const UnitConverterView: React.FC<UnitConverterViewProps> = ({ isDarkMode }) => {
  const [unitCategory, setUnitCategory] = useState('length');
  const [fromUnit, setFromUnit] = useState('meters');
  const [toUnit, setToUnit] = useState('feet');
  const [inputValue, setInputValue] = useState('');
  const [convertedValue, setConvertedValue] = useState('');
  const [unitError, setUnitError] = useState('');

  // Effect to update 'fromUnit' and 'toUnit' when 'unitCategory' changes
  useEffect(() => {
    if (unitCategory === 'length') {
      setFromUnit('meters');
      setToUnit('feet');
    } else if (unitCategory === 'weight') {
      setFromUnit('kilograms');
      setToUnit('pounds');
    } else if (unitCategory === 'temperature') {
      setFromUnit('celsius');
      setToUnit('fahrenheit');
    }
    setInputValue('');
    setConvertedValue('');
    setUnitError('');
  }, [unitCategory]);

  // Effect to perform conversion whenever relevant state changes
  useEffect(() => {
    if (inputValue === '' || isNaN(parseFloat(inputValue))) {
      setConvertedValue('');
      setUnitError('');
      return;
    }

    const value = parseFloat(inputValue);
    if (unitConversions[unitCategory] && 
        unitConversions[unitCategory][fromUnit] && 
        unitConversions[unitCategory][fromUnit].to[toUnit]) {
      const convertFunction = unitConversions[unitCategory][fromUnit].to[toUnit];
      setConvertedValue(convertFunction(value).toFixed(4)); // To 4 decimal places
      setUnitError('');
    } else {
      setConvertedValue('');
      setUnitError('Invalid conversion selected.');
    }
  }, [inputValue, fromUnit, toUnit, unitCategory]);

  // Function to handle unit conversion
  const handleUnitConversion = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  return (
    <div className={`flex flex-col w-full max-w-3xl bg-white bg-opacity-95 p-6 sm:p-8 rounded-3xl shadow-2xl animate-fade-in-up border ${isDarkMode ? 'dark:bg-gray-800 dark:border-gray-700' : 'border-purple-200'}`}>
      <h2 className={`text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>
        <span role="img" aria-label="ruler" className="mr-2">📏</span> Unit Converter
      </h2>
      <p className={`text-base sm:text-lg mb-4 sm:mb-6 text-center leading-relaxed ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
        Convert values between different units of measurement.
      </p>

      <div className={`mb-6 p-4 sm:p-6 rounded-2xl shadow-lg border ${isDarkMode ? 'dark:bg-gray-700 dark:border-gray-600' : 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-100'}`}>
        <div className="mb-4">
          <label htmlFor="unitCategory" className={`block text-base sm:text-lg font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Select Category:</label>
          <select
            id="unitCategory"
            value={unitCategory}
            onChange={(e) => setUnitCategory(e.target.value)}
            className={`w-full p-2 sm:p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200 text-base sm:text-lg shadow-sm ${isDarkMode ? 'dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100' : 'border-gray-300'}`}
          >
            <option value="length">Length</option>
            <option value="weight">Weight</option>
            <option value="temperature">Temperature</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="fromUnit" className={`block text-base sm:text-lg font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>From Unit:</label>
            <select
              id="fromUnit"
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className={`w-full p-2 sm:p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200 text-base sm:text-lg shadow-sm ${isDarkMode ? 'dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100' : 'border-gray-300'}`}
            >
              {unitConversions[unitCategory] && Object.keys(unitConversions[unitCategory]).map((unit) => (
                <option key={unit} value={unit}>{unit.charAt(0).toUpperCase() + unit.slice(1)}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="toUnit" className={`block text-base sm:text-lg font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>To Unit:</label>
            <select
              id="toUnit"
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className={`w-full p-2 sm:p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200 text-base sm:text-lg shadow-sm ${isDarkMode ? 'dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100' : 'border-gray-300'}`}
            >
              {unitConversions[unitCategory] && unitConversions[unitCategory][fromUnit] && 
                Object.keys(unitConversions[unitCategory][fromUnit].to).map((unit) => (
                  <option key={unit} value={unit}>{unit.charAt(0).toUpperCase() + unit.slice(1)}</option>
                ))}
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="inputValue" className={`block text-base sm:text-lg font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Value to Convert:</label>
          <input
            type="number"
            id="inputValue"
            value={inputValue}
            onChange={handleUnitConversion}
            placeholder="Enter value"
            className={`w-full p-2 sm:p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200 text-base sm:text-lg shadow-sm ${isDarkMode ? 'dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100' : 'border-gray-300'}`}
          />
        </div>

        {unitError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl relative mb-4 shadow-md" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {unitError}</span>
          </div>
        )}

        <div className={`p-4 rounded-xl border text-center shadow-md ${isDarkMode ? 'dark:bg-gray-700 dark:border-gray-600' : 'bg-purple-50 border-purple-200'}`}>
          <h4 className={`text-lg sm:text-xl font-bold mb-2 ${isDarkMode ? 'text-purple-300' : 'text-purple-800'}`}>Converted Value:</h4>
          <p className={`text-2xl sm:text-3xl font-extrabold ${isDarkMode ? 'text-indigo-300' : 'text-indigo-700'}`}>
            {convertedValue && `${convertedValue} ${toUnit.charAt(0).toUpperCase() + toUnit.slice(1)}`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnitConverterView;