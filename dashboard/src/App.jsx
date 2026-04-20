import React, { useState } from 'react';
import axios from 'axios';
import { Activity, Beaker, PieChart } from 'lucide-react';
import InputForm from './components/InputForm';
import VisualizerDPGrid from './components/VisualizerDPGrid';
import VisualizerGreedySteps from './components/VisualizerGreedySteps';
import StressTestAnalytics from './components/StressTestAnalytics';

// UI Assets
import logo from './assets/logo.png';
import bgImage from './assets/background.jpg';

const API_URL = 'http://127.0.0.1:5000/api';
function App() {
  const [activeTab, setActiveTab] = useState('zero_one');
  const [simulationData, setSimulationData] = useState(null);
  const [stressData, setStressData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const TABS = [
    { id: 'zero_one', label: '0/1 Knapsack', icon: <Beaker className="w-4 h-4 mr-2" /> },
    { id: 'fractional', label: 'Fractional Knapsack', icon: <PieChart className="w-4 h-4 mr-2" /> },
    { id: 'coin_change', label: 'Coin Change', icon: <Activity className="w-4 h-4 mr-2" /> },
  ];

  const handleSimulate = async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(`${API_URL}/simulate`, { ...payload, problem_type: activeTab });
      setSimulationData(res.data);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStressTest = async (size) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(`${API_URL}/stress-test`, { problem_type: activeTab, dataset_size: size });
      setStressData(res.data);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen text-slate-200 font-sans p-6 pb-20 bg-fixed bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Dark Overlay mask */}
      <div className="absolute inset-0 bg-black/70 pointer-events-none"></div>

      {/* Main Structural Wrapper pushed above the absolute mask */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <header className="mb-8 border-b border-slate-700/80 pb-6 flex items-center">
          <img 
            src={logo} 
            alt="Algorithm Failure Simulator Logo" 
            className="h-10 w-auto mr-4 drop-shadow-[0_0_12px_rgba(79,70,229,0.5)]"
          />
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center">
              Algorithm Failure Simulator
            </h1>
            <p className="text-slate-400 mt-1">Enterprise Heuristics & Diagnostics Dashboard</p>
          </div>
        </header>

        <main className="space-y-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-slate-800 p-1 rounded-lg w-fit shadow-md">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSimulationData(null); setStressData(null); setError(null); }}
              className={`flex items-center px-6 py-2.5 text-sm font-medium rounded-md transition-colors ${
                activeTab === tab.id ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {error && (
          <div className="bg-rose-950/50 border border-rose-500/50 text-rose-200 p-4 rounded-lg shadow-lg">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column: Controls */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl">
              <h2 className="text-lg font-semibold text-white mb-4">Parameters</h2>
              <InputForm problemType={activeTab} onSubmit={handleSimulate} loading={loading} />
            </div>

            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl">
              <h2 className="text-lg font-semibold text-white mb-4 flex justify-between">
                <span>Benchmarking</span>
                <span className="text-xs bg-slate-700 px-2 py-1 flex items-center rounded text-slate-300">Live</span>
              </h2>
              <div className="space-y-4">
                <button
                  onClick={() => handleStressTest(100)}
                  disabled={loading}
                  className="w-full bg-slate-700 hover:bg-slate-600 text-white px-4 py-2.5 rounded font-medium transition-colors border border-slate-600 shadow-sm"
                >
                  Stress Test (n=100)
                </button>
                <button
                  onClick={() => handleStressTest(1000)}
                  disabled={loading}
                  className="w-full bg-slate-700 hover:bg-slate-600 text-white px-4 py-2.5 rounded font-medium transition-colors border border-slate-600 shadow-sm"
                >
                  Deep Benchmark (n=1000)
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Visualization */}
          <div className="lg:col-span-3 space-y-8">
            {stressData && (
              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl">
                <StressTestAnalytics data={stressData} />
              </div>
            )}

            {simulationData && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Results Panel */}
                  <div className="bg-slate-800 p-6 rounded-xl border border-emerald-900 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                    <h3 className="text-emerald-400 font-semibold mb-4 border-b border-slate-700 pb-2 relative z-10">DP Optimal Output</h3>
                    <div className="space-y-4 font-mono text-sm relative z-10">
                      <div className="flex justify-between border-b border-slate-700 pb-2">
                        <span className="text-slate-400">Total Value/Coins:</span>
                        <span className="text-white font-bold text-base">{simulationData.results.dp_optimal.total_val_or_coins}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Execution Time:</span>
                        <span className="text-emerald-400">{simulationData.results.dp_optimal.execution_time_ns.toLocaleString()} ns</span>
                      </div>
                    </div>
                  </div>

                  <div className={`p-6 rounded-xl border shadow-xl relative overflow-hidden ${simulationData.comparison.is_optimal ? 'bg-slate-800 border-indigo-900/50' : 'bg-rose-950/20 border-rose-900/50'}`}>
                    <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl -mr-10 -mt-10 ${simulationData.comparison.is_optimal ? 'bg-indigo-500/10' : 'bg-rose-500/10'}`}></div>
                    <h3 className={`${simulationData.comparison.is_optimal ? 'text-indigo-400' : 'text-rose-400'} font-semibold mb-4 border-b border-slate-700/50 pb-2 relative z-10`}>Greedy Heuristic Output</h3>
                    <div className="space-y-4 font-mono text-sm relative z-10">
                      <div className="flex justify-between border-b border-slate-700/50 pb-2">
                        <span className="text-slate-400">Total Value/Coins:</span>
                        <span className="text-white font-bold text-base">{simulationData.results.greedy.total_val_or_coins}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Execution Time:</span>
                        <span className="text-indigo-400">{simulationData.results.greedy.execution_time_ns.toLocaleString()} ns</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Diagnostics */}
                {simulationData.explanation && (
                  <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl border-l-4 border-l-indigo-500">
                    <h3 className="text-slate-100 font-semibold mb-2">Engine Diagnostics</h3>
                    <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{simulationData.explanation}</p>
                  </div>
                )}

                {/* Visualizations */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-[#0b1120] p-6 rounded-xl border border-slate-800 shadow-xl overflow-hidden flex flex-col h-[500px]">
                    <h3 className="text-emerald-400 font-mono text-sm uppercase tracking-wider mb-4 flex items-center">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse"></span>
                      DP Execution Matrix Tracker
                    </h3>
                    <div className="flex-1 overflow-auto matrix-scroll border border-slate-800 rounded bg-[#090e1a] p-4">
                      <VisualizerDPGrid matrix={simulationData.results.dp_optimal.state_tracking_matrix} type={activeTab} />
                    </div>
                  </div>
                  <div className="bg-[#0b1120] p-6 rounded-xl border border-slate-800 shadow-xl overflow-hidden flex flex-col h-[500px]">
                    <h3 className="text-indigo-400 font-mono text-sm uppercase tracking-wider mb-4 flex items-center">
                      <span className="w-2 h-2 rounded-full bg-indigo-400 mr-2"></span>
                      Greedy Decision Trajectory
                    </h3>
                    <div className="flex-1 overflow-auto matrix-scroll border border-slate-800 rounded bg-[#090e1a] p-4">
                      <VisualizerGreedySteps steps={simulationData.results.greedy.state_tracking} />
                    </div>
                  </div>
                </div>
              </>
            )}

            {!simulationData && !stressData && (
              <div className="flex items-center justify-center h-64 border-2 border-dashed border-slate-700/50 hover:border-slate-600 transition-colors rounded-xl bg-slate-800/10">
                <p className="text-slate-500 text-lg flex items-center"><Activity className="mr-2 opacity-50"/> Awaiting parameters for simulation overlay.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      </div> {/* Close relative z-10 wrapper */}
    </div>
  );
}

export default App;
