module.exports = {
  build: {
    'index.html': 'index.html',
    'app.js': [
      'javascripts/app.js'
    ],
    'app.css': [
      'stylesheets/app.css'
    ]
  },
  rpc: {
    host: '192.168.27.101',
    port: 8545
  }
}
