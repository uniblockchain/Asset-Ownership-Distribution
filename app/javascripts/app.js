var accounts
var account

$(document).on('click', '#txs li', function () {
  var txnid = $(this).attr('data-tx')
  getTx(txnid)
})

$(document).ready(function () {
  $('.ui.dropdown')
  .dropdown()
;
  var iswcNo
  $('#srchfrm').on('submit', function (e) {
    e.preventDefault()
    $('#scSearh').attr('disabled', true)
    iswcNo = $('#srchinput').val().trim()
    $('#srchfrm input').val('')

    if (iswcNo === '') {
      $('#scSearh').attr('disabled', false)
      return
    }

    Trackdata.deployed().then(function (instance) {
      return instance.getTrackDetails(iswcNo)
    }).then(function (result) {
      $('#scSearh').attr('disabled', false)

      if (result == '') {
        $('#mhead').text('Invalid ISWC No')
        $('#respData').html('<div class="ui negative fluid message"><div class="header"> Sorry, it looks like we dont have that ISWC No in the chain yet.</div><p>That offer has expired</p></div>')

        $('.ui.modal').modal('show')
      } else {
        var retJson = JSON.parse(result)
        $('.ui.modal').modal('show')
        $('#mhead').text(retJson.songname + ' - ISWC: ' + retJson.iswcno)
        var k = '<table class="ui single line table"> <thead> <tr> <th>Name</th><th>Email</th> <th>ISNI</th> <th>Ownership</th> </tr> </thead> <tbody>'
        $.each(retJson.owners, function (key, value) {
          k += '<tr>'
          k += '<td >' + value.n + '</td>'
          k += '<td >' + value.e + '</td>'
          k += '<td >' + value.i + '</td>'
          k += '<td >' + value.p + '</td>'
          k += '</tr>'
        })
        k += '</tbody></table>'
        $('#respData').html(k)
      }s
    })
  })
})

window.onload = function () {
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
    { title: 'Roar' },
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

function getTx (txid) {
  var trck = Trackdata.deployed()
  web3.eth.getTransaction(txid, function (errr, ress) {
    if (errr) {
      console.log('Error ' + errr)
    }
    var str = web3.toAscii(ress.input)
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
  var trackStr = {}
  $('#thisfrm').addClass('loading')
  var owners = []
  var totp = 0
  var iswcno = parseInt($('#iswc-no').val().trim())
  var songname = $('#song-name').val().trim()

  for (var i = 1; i <= 5; i++) {
    var n = $('#name-' + i).val()
    var e = $('#email-' + i).val()
    var p = $('#per-' + i).val()
    var isni = $('#isni-' + i).val()
    totp += p
    owners.push({'n': n, 'e': e, 'i': isni, 'p': p})
  }

  var TrackData = {
    iswcno: iswcno,
    songname: songname,
    owners: owners
  }

  trackStr = JSON.stringify(TrackData)

  $('#thisfrm input').val('')
  var account_one = web3.eth.coinbase
  var account_two = web3.eth.coinbase

  Trackdata.deployed().then(function (instance) {
    return instance.saveTrackDetails(iswcno, trackStr.toString(), {from: account_one, gas: 999999})
  }).then(function (result) {
    console.log(result)
    $('#thisfrm').removeClass('loading')
    $('#txs').append('<li data-tx="' + result.tx + '">' + prettyPrintHash(result.tx, 8) + '</li>')
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

function fillDataPlease () {
  $('#iswc-no').val(makeno(5))
  $('#song-name').val('Work From Home')

  for (var i = 1; i <= 5; i++) {
    var n = $('#name-' + i).val(makeid(4))
    var p = $('#per-' + i).val(20)
    var isni = $('#isni-' + i).val(makeno(5))
    var e = $('#email-' + i).val(makeid() + '@me.com')
  }
}

function makeid () {
  var text = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

  for (var i = 0; i < 5; i++) {
    text += possible.charAt(Math.floor(Math.random() * 4))
  }

  return text
}

function makeno (len) {
  var text = ''
  var possible = '0123456789'
  for (var i = 0; i < 5; i++) {
    text += possible.charAt(Math.floor(Math.random() * len))
  }
  return text
}
