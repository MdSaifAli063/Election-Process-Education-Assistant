/**
 * Google Cloud Error Reporting & Performance Integration
 */

const PROJECT_ID = 'election-assistant-494913';

export const initErrorReporting = () => {
  if (import.meta.env.PROD) {
    window.onerror = (message, source, lineno, colno, error) => {
      const errorEvent = {
        message: message,
        context: {
          httpRequest: {
            userAgent: window.navigator.userAgent,
            url: window.location.href,
          },
          reportLocation: {
            filePath: source,
            lineNumber: lineno,
            columnNumber: colno,
          }
        },
        serviceContext: {
          service: 'election-assistant-frontend',
          version: '1.0.0'
        },
        message: error?.stack || message
      };

      // Real production reporting to Google Cloud
      fetch(`https://clouderrorreporting.googleapis.com/v1beta1/projects/${PROJECT_ID}/events:report?key=${import.meta.env.VITE_GCP_API_KEY || ''}`, {
        method: 'POST',
        body: JSON.stringify(errorEvent),
      }).catch(err => console.warn('GCP Monitoring failed to send:', err));
    };
  }
};

export const logMetric = (name, value) => {
  if (import.meta.env.PROD) {
    // In a real app, send to Google Analytics 4 (GA4) or Cloud Monitoring
    if (window.gtag) {
      window.gtag('event', 'timing_complete', {
        'name': name,
        'value': value,
        'event_category': 'Performance'
      });
    }
  }
  console.log(`[GCP Monitoring] Metric: ${name} = ${value}`);
};
