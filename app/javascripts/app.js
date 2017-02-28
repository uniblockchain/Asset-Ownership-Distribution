var accounts
var account

$(document).on('click', '#txs li', function () {
  var txnid = $(this).attr('data-tx')
  getTx(txnid)
})

$(document).ready(function () {
  fillDataPleaase()
  $('#srchfrm').on('submit', function (e) {
    $('#scSearh').attr('disabled', true)
    e.preventDefault()
    var iswcNo = $('#srchfrm input').val().trim()
    var trck = Tracks.deployed()
    var account_one = web3.eth.coinbase
    trck.getTrackDetails(iswcNo).then(function (result) {
      console.log(result)
    }).catch(function (e) {
      $('#txs').append('<li>' + e + '</li>')
    })
  })
})

window.onload = function () {
  $('.ui.form')
    .form({
      on: 'blur',
      fields: {
        iswc: 'number',
        songname: 'empty',
        name1: 'empty',
        songname: 'email',
        songname: 'empty',
        songname: 'empty'
      }
    })

  $('.ui.accordion').accordion()

  var content = [
    { title: "You Don't Know Love" },
    { title: 'Shout Out To My Ex' },
    { title: 'Work From Home' },
    { title: 'Rockabye' },
    { title: 'Anguilla' },
    { title: '7 Years' },
    { title: 'Fast Car' },
    { title: 'Pillowalk' },
    { title: 'Cheap Thrills' },
    { title: 'All My Friends' },
    { title: 'Get Ugly' },
    { title: 'Light It Up' },
    { title: 'Money' },
    { title: 'History' },
    { title: 'Stitches' },
    { title: 'Here' },
    // { title: 'Roar' },
    { title: 'Can\t Stop The Feeling' },
    { title: 'Secret Love Song' },
    { title: 'Cake By The Ocean' },
    { title: 'This is what you came for' },
    { title: 'Running With the Wild Things' },
    { title: 'Do You Wanna Come Over?' }
  ]

  $('.ui.search').search({
    source: content
  })

  // web3.eth.getAccounts(function (err, accs) {
  //   if (err != null) {
  //     alert('There was an error fetching your accounts.')
  //     return
  //   }
  //   if (accs.length == 0) {
  //     alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.")
  //     return
  //   }
  //   accounts = accs
  //   account = accounts[0]
  //   refreshBalance()
  // })
}

function getTx (txid) {
  console.log('getTx: ' + txid)
  web3.eth.getTransaction(txid, function (errr, ress) {
    if (errr) {
      console.log('Error ' + errr)
    }
    console.log(ress)
    var str = web3.toAscii(ress.input)
    console.log(str)

    $('.ui.modal').modal('show')
    $('#mhead').text('Tx. ' + txid)
    $('#respData').html('<pre>' + str + '</pre>')
  })
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
  var totp = 0
  var iswcno = $('#iswc-no').val().trim()
  var songname = $('#song-name').val().trim()

  for (var i = 1; i <= 5; i++) {
    var n = $('#name-' + i).val()
    var e = $('#email-' + i).val()
    var p = $('#per-' + i).val()
    var isni = $('#isni-' + i).val()
    totp += p
    console.log(p)
    owners.push({'n': n, 'e': e, 'i': isni, 'p': p})
  }

  ownersStr = JSON.stringify(owners)

  $('input').val('')

  var meta = Tracks.deployed()
  var account_one = web3.eth.coinbase
  var account_two = web3.eth.coinbase
  console.log(iswcno + ', "' + songname + '", ' + owners.toString())
  meta.saveTrackDetails(iswcno, songname, ownersStr, {from: account_one}).then(function (tx_id) {
    console.log(tx_id)
    $('#txs').append('<li data-tx="' + tx_id + '">' + prettyPrintHash(tx_id, 8) + '</li>')
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

$(document).on('change', 'input.percentage', function () {
  var sum = 0
  var limit = 0
  $('input.percentage').each(function () {
    if (limit == 1) {
      $(this).val(0)
      $(this).attr('disabled', 'disabled')
    } else {
      $(this).removeAttr('disabled')
      var thisval = Number($(this).val())
      sum += thisval
      if (sum > 100) {
        sum = (sum - thisval)
        $(this).val((100 - sum))
        sum = 100
        limit = 1
      }
      if (sum == 100) {
        limit = 1
      }
    }
  })
})

function fillDataPleaase () {
  $('#iswc-no').val('12')
  $('#song-name').val('Work From Home')

  for (var i = 1; i <= 5; i++) {
    var p = $('#per-' + i).val(20)
  }
}
