var accounts
var account

window.onload = function () {
  console.log(web3.eth.coinbase)
  web3.eth.getAccounts(function (err, accs) {
    if (err != null) {
      alert('There was an error fetching your accounts.')
      return
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.")
      return
    }

    accounts = accs
    account = accounts[0]

    refreshBalance()
  })
}

function refreshBalance () {
  document.getElementById('status').innerHTML = web3.fromWei(web3.eth.getBalance(web3.eth.coinbase), 'ether')
}

function saveDetails () {
  console.log('hey')

  var meta = Tracks.deployed()

  console.log(meta)
  var account_one = web3.eth.coinbase
  var account_two = web3.eth.coinbase
  var xx = [{ni: 'k'}]

  meta.saveTrackDetails(10, 'test track', xx, {from: account_one}).then(function (tx_id) {
    // If this callback is called, the transaction was successfully processed.
    // Note that Ether Pudding takes care of watching the network and triggering
    // this callback.
    console.log('Transaction successful!')
  }).catch(function (e) {
    console.log(e)
  })
}

function getDetails () {
  var meta = Tracks.deployed()
  console.log(meta.STrack[10])
}
