import React, { useState, useEffect } from 'react';

const InputForm = ({ problemType, onSubmit, loading }) => {
  const [weights, setWeights] = useState('10, 20, 30');
  const [values, setValues] = useState('60, 100, 120');
  const [capacity, setCapacity] = useState('50');

  const [coins, setCoins] = useState('1, 3, 4');
  const [target, setTarget] = useState('6');

  // Load canonical presets contextually
  useEffect(() => {
    if (problemType === 'coin_change') {
      setCoins('1, 3, 4'); // Non-canonical trapping case
      setTarget('6');
    } else {
      setWeights('10, 20, 30');
      setValues('60, 100, 120');
      setCapacity('50');
    }
  }, [problemType]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (problemType === 'coin_change') {
      onSubmit({
        weights: coins.split(',').map(Number),
        capacity: parseInt(target, 10)
      });
    } else {
      onSubmit({
        weights: weights.split(',').map(Number),
        values: values.split(',').map(Number),
        capacity: parseInt(capacity, 10)
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {problemType === 'coin_change' ? (
        <>
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">COIN DENOMINATIONS ARRAY</label>
            <input
              type="text"
              value={coins}
              onChange={(e) => setCoins(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded p-2.5 text-sm text-slate-200 outline-none focus:border-indigo-500 font-mono"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">TARGET SUM CAPACITY</label>
            <input
              type="number"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded p-2.5 text-sm text-slate-200 outline-none focus:border-indigo-500 font-mono"
              required
            />
          </div>
        </>
      ) : (
        <>
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">ITEM WEIGHTS</label>
            <input
              type="text"
              value={weights}
              onChange={(e) => setWeights(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded p-2.5 text-sm text-slate-200 outline-none focus:border-indigo-500 font-mono"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">ITEM VALUES</label>
            <input
              type="text"
              value={values}
              onChange={(e) => setValues(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded p-2.5 text-sm text-slate-200 outline-none focus:border-indigo-500 font-mono"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">KNAPSACK CAPACITY LIMIT</label>
            <input
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded p-2.5 text-sm text-slate-200 outline-none focus:border-indigo-500 font-mono"
              required
            />
          </div>
        </>
      )}
      
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white p-2.5 rounded font-medium transition-colors disabled:opacity-50 mt-2 shadow flex justify-center items-center"
      >
        {loading ? (
          <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
        ) : (
          "Run Custom Simulation"
        )}
      </button>
    </form>
  );
};

export default InputForm;
