module.exports = {
  networks: {
    development: {
      host: 'localhost',
      //host: '13.82.93.180',
      port: 8545,
      gas: 4700000,
      network_id: '10101010'
    },
    locals: {
      host: '192.168.27.101',
      port: 8545,
      network_id: '*'
    },
    light: {
      host: 'eth.lightrains.com',
      port: 80,
      network_id: '*'
    }
  }
};

// web3.eth.getBlock('pending', function (error, result) { console.log(error, result) } )
