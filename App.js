import React, { useEffect, useState } from 'react';

function App() {
  const [milkData, setMilkData] = useState(null);

  useEffect(() => {
    fetch('/api/milk-status')
      .then(res => res.json())
      .then(data => setMilkData(data));
  }, []);

  if (!milkData) {
    return (
      <div className="h-screen flex items-center justify-center text-xl text-gray-600">
        Loading Smart Milk Data...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="max-w-xl mx-auto bg-white shadow-xl rounded-xl p-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-4 text-center">
          🥛 Smart Milk Dashboard
        </h1>

        <div className="space-y-4 text-lg">
          <div>
            <strong>Weight:</strong> {milkData.weight} g
          </div>

          <div>
            <strong>Freshness:</strong>{' '}
            <span
              className={
                milkData.isExpired
                  ? 'text-red-600 font-bold'
                  : 'text-green-600 font-bold'
              }
            >
              {milkData.isExpired ? 'Expired ❌' : 'Fresh ✅'}
            </span>
          </div>

          <div>
            <strong>Milk Level:</strong>
            <div className="w-full h-4 bg-gray-200 rounded mt-1">
              <div
                className={`h-full rounded transition-all ${
                  milkData.percentageFull > 60
                    ? 'bg-green-500'
                    : milkData.percentageFull > 30
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                }`}
                style={{ width: `${milkData.percentageFull}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {milkData.percentageFull}% full
            </p>
          </div>

          <div className="text-sm text-gray-500 mt-6">
            Last updated: {new Date(milkData.timestamp).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
