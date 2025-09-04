// start-app.js
const { spawn } = require('child_process');
const path = require('path');

console.log('Starting SLA Dashboard Next.js application...');

const nextStart = spawn('node', ['./node_modules/next/dist/bin/next', 'start'], {
  cwd: __dirname,
  stdio: 'inherit',
  env: {
    ...process.env,
    NODE_ENV: 'production',
    PORT: 3001
  }
});

nextStart.on('error', (error) => {
  console.error('Failed to start Next.js:', error);
  process.exit(1);
});

nextStart.on('close', (code) => {
  console.log(`Next.js process exited with code ${code}`);
  process.exit(code);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('Received SIGTERM, shutting down gracefully');
  nextStart.kill('SIGTERM');
});

process.on('SIGINT', () => {
  console.log('Received SIGINT, shutting down gracefully');
  nextStart.kill('SIGINT');
});