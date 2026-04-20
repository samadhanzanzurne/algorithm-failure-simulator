import React from 'react';
import { ChevronRight } from 'lucide-react';

const VisualizerGreedySteps = ({ steps }) => {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="space-y-3 font-mono text-sm leading-relaxed">
      {steps.map((step, idx) => {
        const isFailure = step.toLowerCase().includes('fail') || step.toLowerCase().includes('exceed');
        const isSuccess = step.toLowerCase().includes('success') || step.toLowerCase().includes('full item');
        const isSort = step.toLowerCase().includes('sort');
        const isSkip = step.toLowerCase().includes('skip');

        let textClass = 'text-slate-300';
        if (isFailure || isSkip) textClass = 'text-rose-400';
        else if (isSuccess) textClass = 'text-emerald-400';
        else if (isSort) textClass = 'text-indigo-400';

        return (
          <div key={idx} className="flex items-start group">
            <span className="text-slate-600 w-8 flex-shrink-0 mt-0.5">{(idx + 1).toString().padStart(2, '0')}</span>
            <ChevronRight className={`w-4 h-4 mr-2 flex-shrink-0 mt-0.5 ${textClass.replace('text-', 'text-opacity-50 text-')}`} />
            <span className={textClass}>{step}</span>
          </div>
        );
      })}
    </div>
  );
};

export default VisualizerGreedySteps;
