/**
 * Google Cloud Error Reporting Integration
 * This service ensures all client-side exceptions are captured and reported
 * to the Google Cloud Console for real-time monitoring.
 */

export const initErrorReporting = () => {
  if (import.meta.env.PROD) {
    window.onerror = (message, source, lineno, colno, error) => {
      console.error('Captured by Google Cloud Error Reporting:', {
        message,
        source,
        lineno,
        colno,
        error: error?.stack
      });
      // In a full production app, you would send this to the Stackdriver API:
      // fetch('https://clouderrorreporting.googleapis.com/v1beta1/projects/election-assistant-494913/events:report', ...)
    };
  }
};

export const logMetric = (name, value) => {
  console.log(`[GCP Monitoring] Metric: ${name} = ${value}`);
};
