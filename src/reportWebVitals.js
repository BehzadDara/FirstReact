// src/reportWebVitals.js
const reportWebVitals = onPerfEntry => {
    if (onPerfEntry && onPerfEntry instanceof Function) {
      import('web-vitals').then(({ getCLS, getFID, getLCP, getTTFB }) => {
        getCLS(onPerfEntry); // Cumulative Layout Shift
        getFID(onPerfEntry); // First Input Delay
        getLCP(onPerfEntry); // Largest Contentful Paint
        getTTFB(onPerfEntry); // Time to First Byte
      });
    }
  };
  
  export default reportWebVitals;
  