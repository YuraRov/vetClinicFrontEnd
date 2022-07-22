const PROXY_CONFIG = [ 
  {
    context: [
      'api',
      'hubs'
    ],
    target: 'https://localhost:5001',
    secure: false,
    ws: true
  }
]

module.exports = PROXY_CONFIG;
