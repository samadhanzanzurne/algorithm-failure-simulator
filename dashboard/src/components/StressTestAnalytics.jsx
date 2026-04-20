import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Clock } from 'lucide-react';

const StressTestAnalytics = ({ data }) => {
  if (!data) return null;

  const { timing_metrics, dataset_size } = data;

  const formatMilliseconds = (ms) => {
    return ms < 0.1 ? "<0.1 ms" : `${ms.toFixed(3)} ms`;
  };

  const chartData = [
    {
      name: 'Algorithmic Heuristic',
      Greedy: timing_metrics.greedy_time_ms,
      DynamicProgramming: timing_metrics.dp_time_ms,
    }
  ];

  return (
    <div className="w-full flex justify-between h-[300px]">
      <div className="flex-1 min-w-[200px]">
        <h3 className="text-xl font-bold text-white mb-2 flex items-center">
          <Clock className="w-5 h-5 mr-2 text-indigo-400" />
          CPU Execution Disparity (N={dataset_size})
        </h3>
        <p className="text-slate-400 text-sm mb-6 max-w-sm">
          Benchmarking raw python millisecond thread timing via deterministic <span className="font-mono text-indigo-300">perf_counter_ns()</span> execution cycles.
        </p>

        <div className="space-y-4 font-mono">
          <div>
            <div className="text-slate-500 text-xs mb-1">GREEDY TIME</div>
            <div className="text-2xl text-indigo-400">{formatMilliseconds(timing_metrics.greedy_time_ms)}</div>
          </div>
          <div>
            <div className="text-slate-500 text-xs mb-1">DP OPTIMAL TIME</div>
            <div className="text-2xl text-emerald-400">{formatMilliseconds(timing_metrics.dp_time_ms)}</div>
          </div>
          <div className="pt-4 border-t border-slate-700/50">
            <div className="text-slate-500 text-xs mb-1">FASTEST ENGINE</div>
            <div className={`text-lg uppercase tracking-widest ${timing_metrics.fastest === 'greedy' ? 'text-indigo-400' : 'text-emerald-400'}`}>
              {timing_metrics.fastest}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 relative bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis dataKey="name" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} />
            <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} tickFormatter={(val) => `${val}ms`} />
            <Tooltip
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
              itemStyle={{ fontFamily: 'monospace' }}
            />
            <Legend wrapperStyle={{ paddingTop: '10px' }} />
            <Bar dataKey="Greedy" name="Greedy ms" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={60} />
            <Bar dataKey="DynamicProgramming" name="DP Optimal ms" fill="#10b981" radius={[4, 4, 0, 0]} barSize={60} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StressTestAnalytics;
