export default function handler(req, res) {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: process.env.PHASE_2B_VERSION || '2.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
}