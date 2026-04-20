import React from 'react';

const VisualizerDPGrid = ({ matrix, type }) => {
  if (!matrix || matrix.length === 0) return null;

  if (type === 'fractional') {
    return (
      <div className="flex flex-col h-full bg-emerald-950/20 p-6 rounded-lg border border-emerald-900/50 justify-center items-center text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-900/30 flex items-center justify-center mb-4 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
          <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
        </div>
        <h4 className="text-emerald-400 font-bold text-lg mb-2">Greedy Choice Native Property</h4>
        <p className="text-slate-400 text-sm max-w-sm mt-3">
          Unlike 0/1 variants, continuous fractions bypass exhaustive search dependencies. Mathematical optimality is fully guaranteed heuristically natively.
        </p>
        <p className="text-slate-500 text-xs mt-4">
          This bypasses $O(N \cdot W)$ matrix grids entirely.
        </p>
      </div>
    );
  }

  const is1D = type === 'coin_change';

  if (is1D) {
    return (
      <div className="flex flex-wrap gap-2">
        {matrix.map((val, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <span className="text-[10px] text-slate-500 mb-1">{idx}</span>
            <div className={`w-10 h-10 flex items-center justify-center border font-mono text-sm rounded ${val === -1 ? 'bg-rose-950/30 border-rose-900 text-rose-500' : 'bg-slate-800 border-slate-700 text-emerald-400'}`}>
              {val === -1 ? '∞' : val}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Handle 2D Knapsack Matrix
  return (
    <div className="inline-block min-w-full">
      <table className="border-collapse text-sm font-mono w-full text-center">
        <thead>
          <tr>
            <th className="p-2 border border-slate-800 text-slate-500 font-normal bg-slate-900/50 sticky top-0 left-0 z-20">i \ w</th>
            {matrix[0].map((_, colIdx) => (
              <th key={colIdx} className="p-2 border border-slate-800 text-slate-500 font-normal bg-slate-900/50 sticky top-0 z-10 w-12 min-w-[3rem]">
                {colIdx}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {matrix.map((row, rowIdx) => (
            <tr key={rowIdx}>
              <td className="p-2 border border-slate-800 text-slate-500 bg-slate-900/50 sticky left-0 z-10 font-bold">
                {rowIdx}
              </td>
              {row.map((cell, colIdx) => {
                const isOptimalTarget = rowIdx === matrix.length - 1 && colIdx === matrix[0].length - 1;
                return (
                  <td 
                    key={colIdx} 
                    className={`p-2 border border-slate-800 transition-colors ${
                      isOptimalTarget 
                      ? 'bg-emerald-500/20 text-emerald-400 font-bold border-emerald-500/50 relative' 
                      : cell > 0 ? 'text-slate-300 bg-slate-800/30' : 'text-slate-600'
                    }`}
                  >
                    {cell}
                    {isOptimalTarget && <div className="absolute inset-0 bg-emerald-400/10 animate-pulse"></div>}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VisualizerDPGrid;
