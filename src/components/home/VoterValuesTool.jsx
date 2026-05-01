import React from 'react';
import { motion } from 'framer-motion';
import { Search, Loader2 } from 'lucide-react';

export const VoterValuesTool = ({ 
  userValues, 
  handleValueChange, 
  handleAnalyze, 
  isAnalyzing, 
  analysis 
}) => {
  const valueOptions = [
    { id: 'economy', label: 'Economy & Jobs', icon: '💰' },
    { id: 'healthcare', label: 'Healthcare Access', icon: '🏥' },
    { id: 'education', label: 'Education Quality', icon: '🎓' },
    { id: 'environment', label: 'Climate & Environment', icon: '🌿' },
    { id: 'justice', label: 'Social Justice', icon: '⚖️' },
    { id: 'defense', label: 'National Security', icon: '🛡️' }
  ];

  return (
    <section className="section voter-tool reveal" aria-labelledby="tool-heading">
      <div className="container">
        <div className="section-header">
          <span className="badge badge-primary">Personal Analysis</span>
          <h2 id="tool-heading" className="text-heading section-header__title">
            Policy Alignment Analyzer
          </h2>
          <p className="section-header__subtitle">Select the values that matter most to you, and our AI will help you understand how different policy platforms align with them.</p>
        </div>

        <div className="voter-tool__card card">
          <div className="voter-tool__values">
            {valueOptions.map(opt => (
              <button
                key={opt.id}
                className={`value-chip ${userValues.includes(opt.id) ? 'active' : ''}`}
                onClick={() => handleValueChange(opt.id)}
              >
                <span>{opt.icon}</span> {opt.label}
              </button>
            ))}
          </div>

          <div className="voter-tool__action">
            <button 
              className="btn btn-primary" 
              onClick={handleAnalyze}
              disabled={userValues.length === 0 || isAnalyzing}
            >
              {isAnalyzing ? (
                <><Loader2 className="animate-spin" size={18} /> Analyzing...</>
              ) : (
                <><Search size={18} /> Analyze Alignment</>
              )}
            </button>
          </div>

          {analysis && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="voter-tool__result"
            >
              <div className="voter-tool__result-header">
                <div className="sparkle-icon">✨</div>
                <h4>AI Analysis Results</h4>
              </div>
              <div className="voter-tool__result-content">
                {analysis.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '1rem' }}>* This is an objective analysis based on policy research, not an endorsement of any candidate.</p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
