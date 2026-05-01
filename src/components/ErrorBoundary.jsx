import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

/**
 * Global Error Boundary Component
 * Catches JavaScript errors anywhere in their child component tree,
 * logs those errors, and displays a fallback UI instead of the component tree that crashed.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[Global Error Boundary]:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-container" style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '20px',
          background: '#030712',
          color: 'white'
        }}>
          <AlertTriangle size={48} color="#f59e0b" style={{ marginBottom: '20px' }} />
          <h1 style={{ fontSize: '2rem', marginBottom: '10px' }}>Something went wrong</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '500px', marginBottom: '30px' }}>
            We've encountered an unexpected error. Don't worry, your civic data is safe.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            <RotateCcw size={18} /> Reload Application
          </button>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
