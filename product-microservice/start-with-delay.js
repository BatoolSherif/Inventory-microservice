// start-with-delay.js
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Delay the startup by 10 seconds before starting the application
delay(10000).then(() => {
  require('./index');  // Start the Express server
});
