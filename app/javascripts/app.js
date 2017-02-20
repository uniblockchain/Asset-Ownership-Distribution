var accounts
var account

window.onload = function () {
  $('.ui.accordion').accordion()

  // console.log(web3.eth.coinbase)
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

function initPopup () {
  $('.small.modal').modal('show')
}

function refreshBalance () {
  var filter = web3.eth.filter({address: web3.eth.coinbase})

  filter.watch(function (error, result) {
    if (!error) {
      console.log(result)
    }
  })

  document.getElementById('status').innerText = web3.fromWei(web3.eth.getBalance(web3.eth.coinbase), 'ether')
}

function saveDetails () {
  $('#saveme').addClass('disabled loading')
  var owners = []
  var iswcno = $('#iswc-no').val()
  var songname = $('#song-name').val()

  for (var i = 1; i <= 5; i++) {
    var n = $('#name-' + i).val()
    var e = $('#email-' + i).val()
    var p = $('#per-' + i).val()
    owners.push({'n': n, 'e': e, 'p': p})
  }
  $('input').val('')
  var meta = Tracks.deployed()
  var account_one = web3.eth.coinbase
  var account_two = web3.eth.coinbase

  meta.saveTrackDetails(iswcno, songname, owners, {from: account_one}).then(function (tx_id) {
    $('#txs').append('<li>' + prettyPrintHash(tx_id, 8) + '</li>')
    $('#saveme').removeClass('disabled loading')
  }).catch(function (e) {
    $('#txs').append('<li>' + e + '</li>')
  })
}

function getDetails () {
  var meta = Tracks.deployed()
  console.log(meta.STrack[10])
}

function prettyPrintHash (hash, len) {
  return hash.slice(0, len) + '...' + hash.slice(hash.length - len, hash.length)
}