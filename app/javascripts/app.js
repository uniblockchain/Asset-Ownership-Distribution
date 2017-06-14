var accounts
var account

var holders = {
  'name': {
    'publish': true,
    'record': true,
    'revenue': true
  },
  'count': {
    'publish': 5,
    'record': 7,
    'revenue': 7
  }
}

$(document).on('click', '#txs li', function () {
  var txnid = $(this).attr('data-tx')
  getTx(txnid)
})

$(document).ready(function () {
  $('.ui.dropdown')
  .dropdown()

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
      return instance.getSettings()
    }).then(function (result) {
      var perRate = {
        'download': result[0],
        'stream': result[1]
      }
      $('#download_label').html('@ $ ' + perRate['download'] + ' each')
      $('#stream_label').html('@ $ ' + perRate['stream'] + ' each')
      $('#download').val(perRate['download'])
      $('#stream').val(perRate['stream'])
    })
    loadTrackdata(iswcNo)
    $('#calculatefrm').find('input, button, select').attr('disabled', false)
    $('#calculatefrm').find('input, button').removeClass('disabled')
    $('#calculatefrm .ui.dropdown.selection').removeClass('disabled')
    $('#hidden_iswc').val(iswcNo)
    $('#scSearh').attr('disabled', false)
  })

  $('#calculatefrm').on('submit', function (e) {
    e.preventDefault()

    var download = parseFloat($('#download').val())
    var stream = parseFloat($('#stream').val())
    var download_count = $('#download_count').val()
    var stream_count = $('#stream_count').val()

    var iswcNo = $('#hidden_iswc').val()

    var total = {
      'download': download * download_count,
      'stream': stream * stream_count
    }

    loadTrackdataReport(iswcNo, total)
  })

  // disabled/remove holders based on settings
  $.each(holders.name, function (index, value) {
    if (value === false) {
      $('#button_' + index).remove()
    }
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

  // Set settings
  // Trackdata.deployed().then(function (instance) {
  //   return instance.setSettings('0.091', '0.0011', {from: web3.eth.coinbase, gas: 999999})
  // })
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
    $('#thisfrm').removeClass('loading')
    $('#txs').append('<li data-tx="' + result.tx + '">' + prettyPrintHash(result.tx, 8) + '</li>')
  })
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

function loadTrackdata (iswcNo) {
  Trackdata.deployed().then(function (instance) {
    $('#container-wrapper').addClass('loading')
    return instance.getTrackDetails(iswcNo)
  }).then(function (result) {
    if (result == '') {
      $('#mhead').text('Invalid ISWC No')
      $('#container-wrapper').html('<div class="ui negative fluid message"><div class="header"> Sorry, it looks like we dont have that ISWC No in the chain yet.</div><p>That offer has expired</p></div>')
    } else {
      var retJson = JSON.parse(result)
      var k = '<h2>' + retJson.songname + ' - ISWC: ' + retJson.iswcno + '</h2>'
      k += '<table class="ui single line table"> <thead> <tr> <th>Name</th><th>Email</th> <th>ISNI</th> <th class="right aligned">Ownership</th>'
      k += '</tr> </thead> <tbody>'
      $.each(retJson.owners, function (key, value) {
        k += '<tr>'
        k += '<td >' + value.n + '</td>'
        k += '<td >' + value.e + '</td>'
        k += '<td >' + value.i + '</td>'
        k += '<td class="right aligned">' + value.p + '</td>'
        k += '</tr>'
      })
      k += '</tbody>'
      k += '</table>'
      $('#container-wrapper').html(k)
    }
    $('#container-wrapper').removeClass('loading')
  })
}

function loadTrackdataReport (iswcNo, total) {
  Trackdata.deployed().then(function (instance) {
    $('#container-wrapper').addClass('loading')
    return instance.getTrackDetails(iswcNo)
  }).then(function (result) {
    if (result == '') {
      $('#mhead').text('Invalid ISWC No')
      $('#container-wrapper').html('<div class="ui negative fluid message"><div class="header"> Sorry, it looks like we dont have that ISWC No in the chain yet.</div><p>That offer has expired</p></div>')
    } else {
      var retJson = JSON.parse(result)
      var k = '<h2><i class="info circle icon"></i> Report Stats</h2>'
      k += '<table class="ui single line table"><thead><tr><th>Name</th><th class="right aligned">Download (<i class="dollar icon"></i>)</th><th class="right aligned">Stream (<i class="dollar icon"></i>)</th></tr></thead><tbody>'
      $.each(retJson.owners, function (key, value) {
        k += '<tr>'
        k += '<td >' + value.n + ' <span class="ui left pointing basic label">' + value.i + '</span>' + '</td>'
        k += '<td class="right aligned">' + value.p / 100 * total['download'] + '</td>'
        k += '<td class="right aligned">' + value.p / 100 * total['stream'] + '</td>'
        k += '</tr>'
      })
      k += '<tfoot><tr><th><b>Total</b></th><th class="right aligned">' + total['download'] + '</th><th class="right aligned">' + total['stream'] + '</th></tr></tfoot>'
      k += '</tbody>'
      k += '</table>'
      $('#container-report').html(k)
    }
    $('#container-wrapper').removeClass('loading')
  })
}

function addMoreHolders (holder, container_class = 'brown', _this) {
  var countIndex = countHolders(holder)

  if (holders.count[holder] >= countIndex) {
    var fieldReturn = '<div class="ui ' + container_class + ' message">'
    fieldReturn += '<div class="header capitalize"><i class="minus square icon pointer remover" data-holder="' + holder + '"></i> ' + holder + ' Holder</div><hr />'
    fieldReturn += '<div class="ui form">'
    fieldReturn += '<div class="fields">'
    fieldReturn += '<div class="field">'
    fieldReturn += '<label>Name</label>'
    fieldReturn += '<input type="text" name="name[' + holder + '][]">'
    fieldReturn += '</div>'
    fieldReturn += '<div class="field">'
    fieldReturn += '<label>Email</label>'
    fieldReturn += '<input type="email" name="email[' + holder + '][]">'
    fieldReturn += '</div>'
    fieldReturn += '<div class="field">'
    fieldReturn += '<label>ISNI No</label>'
    fieldReturn += '<input type="number" name="isni[' + holder + '][]">'
    fieldReturn += '</div>'
    fieldReturn += '<div class="field">'
    fieldReturn += '<label>Ownership</label>'
    fieldReturn += '<input type="number" min="1" max="100" name="percentage[][' + holder + '][]" class="percentage">'
    fieldReturn += '</div>'
    fieldReturn += '</div>'
    fieldReturn += '</div>'
    fieldReturn += '</div>'

    $('#container-fields').append(fieldReturn)
    $('#count_' + holder).html(countIndex)

    if (holders.count[holder] == countIndex) {
      $(_this).addClass('disabled')
    }
  }

  return fieldReturn
}

function countHolders (holder) {
  return $('#form_right').serializeArray().reduce(function (obj, item) {
    if (item.name == 'name[' + holder + '][]') {
      obj = isNaN(obj) ? 1 : obj + 1
    }
    return obj
  }, 1)
}

$(document).on('click', '.remover', function () {
  $(this).parent('div').parent('div').remove()
  var holder = $(this).attr('data-holder')
  var countIndex = countHolders(holder)
  $('#count_' + holder).html((countIndex - 1))
  if (holders.count[holder] >= countIndex) {
    $('#button_' + holder).removeClass('disabled')
  }
})
