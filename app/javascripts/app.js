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
  },
  'colour': {
    'publish': 'blue',
    'record': 'orange',
    'revenue': 'yellow'
  }
}

var combineHolders = 'isni'

$(document).on('click', '#txs li', function () {
  var txnid = $(this).attr('data-tx')
  getTx(txnid)
})

$(document).ready(function () {
  $('.ui.sticky')
  .sticky({
    context: '#container-wrapper'
  })

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
      console.log(result)

      var perRate = {
        'download_publish': result[0],
        'stream_publish': result[1],
        'download_record': result[2],
        'stream_record': result[3],
        'download_revenue': result[4],
        'stream_revenue': result[5]
      }

      $.each(perRate, function (index, rate) {
        $('#' + index).html(rate)
        $('#' + index + '_hidden').val(rate)
      })
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

    var download = $('#download_count').val()
    var stream = $('#stream_count').val()

    var download_publish_hidden = $('#download_publish_hidden').val()
    var stream_publish_hidden = $('#stream_publish_hidden').val()

    var download_record_hidden = $('#download_record_hidden').val()
    var stream_record_hidden = $('#stream_record_hidden').val()

    var download_revenue_hidden = $('#download_revenue_hidden').val()
    var stream_revenue_hidden = $('#stream_revenue_hidden').val()

    var iswcNo = $('#hidden_iswc').val()

    console.log(download)

    var total = {
      'download_publish': download * download_publish_hidden,
      'stream_publish': stream * stream_publish_hidden,
      'download_record': download * download_record_hidden,
      'stream_record': stream * stream_record_hidden,
      'download_revenue': download * download_revenue_hidden,
      'stream_revenue': stream * stream_revenue_hidden
    }

    loadTrackdataReport(iswcNo, total)
  })

  // disabled/remove holders based on settings
  $.each(holders.name, function (index, value) {
    if (value === false) {
      $('#button_' + index).remove()
    }
  })
  // add button classes based on settings
  $('.addmore').each(function (index, value) {
    var holder = $(this).attr('data-holder')
    $(this).find('.button').addClass(holders.colour[holder])
    $(this).find('.label').addClass(holders.colour[holder])
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
  //   return instance.setSettingsPublish('0.091', '0.0011', {from: web3.eth.coinbase, gas: 999999})
  // })
  // Trackdata.deployed().then(function (instance) {
  //   return instance.setSettingsRecord('0.0915', '0.007', {from: web3.eth.coinbase, gas: 999999})
  // })
  // Trackdata.deployed().then(function (instance) {
  //   return instance.setSettingsRevenue('0.0915', '0.007', {from: web3.eth.coinbase, gas: 999999})
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

function fillDataPlease (_this) {
  $(_this).addClass('disabled')
  var iswc = ($("input[name*='iswc']").val() == '') ? makeno(5) : $("input[name*='iswc']").val()
  $("input[name*='iswc']").val(iswc)
  $("input[name*='songname']").val('Work From Home')

  setTimeout(function () {
    // first row
    $('#button_publish').trigger('click')
    $('#button_record').trigger('click')
    $('#button_revenue').trigger('click')
    $("input[name*='data[1]name']").val(makeid(4))
    $("input[name*='data[1]email']").val(makeid() + '@me.com')
    $("input[name*='data[1]isni']").val(makeno(5))
    $("input[name*='data[1]percentage']").val(50)
    $("input[name*='data[2]name']").val(makeid(4))
    $("input[name*='data[2]email']").val(makeid() + '@me.com')
    $("input[name*='data[2]isni']").val(makeno(5))
    $("input[name*='data[2]percentage']").val(50)
    $("input[name*='data[3]name']").val(makeid(4))
    $("input[name*='data[3]email']").val(makeid() + '@me.com')
    $("input[name*='data[3]isni']").val(makeno(5))
    $("input[name*='data[3]percentage']").val(50)

    // Second row
    $('#button_publish').trigger('click')
    $('#button_record').trigger('click')
    $('#button_revenue').trigger('click')
    $("input[name*='data[4]name']").val(makeid(4))
    $("input[name*='data[4]email']").val(makeid() + '@me.com')
    $("input[name*='data[4]isni']").val(makeno(5))
    $("input[name*='data[4]percentage']").val(50)
    $("input[name*='data[5]name']").val(makeid(4))
    $("input[name*='data[5]email']").val(makeid() + '@me.com')
    $("input[name*='data[5]isni']").val(makeno(5))
    $("input[name*='data[5]percentage']").val(50)
    $("input[name*='data[6]name']").val(makeid(4))
    $("input[name*='data[6]email']").val(makeid() + '@me.com')
    $("input[name*='data[6]isni']").val(makeno(5))
    $("input[name*='data[6]percentage']").val(50)
  }, 1000)
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
      $.each(retJson.owners, function (key, value) {
        k += '<table class="ui inverted ' + holders.colour[key] + ' table">'
        k += '<thead class="full-width"> <tr><th><div class="ui ribbon label">' + key.toUpperCase() + '</div>Name</th><th>Email</th><th>ISNI</th> <th class="right aligned">Ownership (%)</th>'
        k += '</tr> </thead> <tbody>'
        $.each(value, function (index, item) {
          k += '<tr class="red">'
          k += '<td >' + item.name + '</td>'
          k += '<td >' + item.email + '</td>'
          k += '<td >' + item.isni + '</td>'
          k += '<td class="right aligned">' + item.percentage + '</td>'
          k += '</tr>'
        })
        k += '</tbody>'
        k += '</table>'
      })
      $('#container-wrapper').html(k)
    }
    $('#container-wrapper').removeClass('loading')
  })
}

function loadTrackdataReport (iswcNo, total) {
  Trackdata.deployed().then(function (instance) {
    loadLoader()
    return instance.getTrackDetails(iswcNo)
  }).then(function (result) {
    if (result == '') {
      $('#mhead').text('Invalid ISWC No')
      $('#container-wrapper').html('<div class="ui negative fluid message"><div class="header"> Sorry, it looks like we dont have that ISWC No in the chain yet.</div><p>That offer has expired</p></div>')
    } else {
      var retJson = JSON.parse(result)
      // calulate amount
      $.each(retJson.owners, function (index, value) {
        $.each(value, function (key, item) {
          switch (item.holder) {
            case 'publish':
              retJson.owners[index][key].download = item.percentage / 100 * total['download_publish']
              retJson.owners[index][key].stream = item.percentage / 100 * total['stream_publish']
              break
            case 'record':
              retJson.owners[index][key].download = item.percentage / 100 * total['download_record']
              retJson.owners[index][key].stream = item.percentage / 100 * total['stream_record']
              break
            case 'revenue':
              retJson.owners[index][key].download = item.percentage / 100 * total['download_revenue']
              retJson.owners[index][key].stream = item.percentage / 100 * total['stream_revenue']
              break
          }
        })
      })
      retJson.total = total
      // end of calculation

      console.log(retJson)

      // add download and stream
      var k = '<h2>' + retJson.songname + ' - ISWC: ' + retJson.iswcno + '</h2>'
      $.each(retJson.owners, function (key, value) {
        k += '<table class="ui inverted ' + holders.colour[key] + ' table">'
        k += '<thead class="full-width"> <tr><th><div class="ui ribbon label">' + key.toUpperCase() + '</div>Name</th><th>Email</th><th>ISNI</th> <th class="right aligned">Ownership (%)</th><th class="right aligned">Download</th class="right aligned"><th class="right aligned">Stream</th>'
        k += '</tr> </thead> <tbody>'
        $.each(value, function (index, item) {
          console.log(key)
          k += '<tr class="red">'
          k += '<td >' + item.name + '</td>'
          k += '<td >' + item.email + '</td>'
          k += '<td >' + item.isni + '</td>'
          k += '<td class="right aligned">' + item.percentage + '</td>'
          k += '<td class="right aligned">' + item.download + '</td>'
          k += '<td class="right aligned">' + item.stream + '</td>'
          k += '</tr>'
        })
        k += '<tfoot><tr><th>Total</th><th></th><th></th><th></th><th class="right aligned">'
        k += retJson.total['download_' + key]
        k += '</th><th class="right aligned">'
        k += retJson.total['stream_' + key]
        k += '</th></tr></tfoot>'
        k += '</tbody>'
        k += '</table>'
      })
      $('#container-wrapper').html(k)
      // end download and stream

      drawGraph(retJson)
    }
    removeLoader()
  })
}
function drawGraph (jsonStats) {
  var categories = []
  var download = []
  var stream = []

  $.each(jsonStats.owners, function (index, value) {
    var thisgraph = 'graph' + index
    $('#container-graph').append('<div id="' + thisgraph + '" class="eight wide column"></div>')

    var data = []
    $.each(value, function (key, item) {
      data.push({
        name: item.name,
        y: parseInt(item.percentage)
      })
      categories.push(item.name)
      download.push(item.download)
      stream.push(item.stream)
    })
    drawPie(thisgraph, index.toUpperCase(), 'Percentage', data)
  })
  drawBar(categories, [{
    name: 'Download',
    data: download
  }, {
    name: 'Stream',
    data: stream
  }])
}

function drawBar (categories, data) {
  Highcharts.chart('container-graph-bar', {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Download and Stream Amount'
    },
    subtitle: {
      text: 'Source: Blockchain Data'
    },
    xAxis: {
      categories: categories,
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Amount ($)'
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
              '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: data
  })
}
function drawPie (container, title, seriesLabel, data) {
  console.log([{
    name: 'Microsoft Internet Explorer',
    y: 50
  }, {
    name: 'Proprietary or Undetectable',
    y: 50
  }])
  Highcharts.chart(container, {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: title
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false
        },
        showInLegend: true
      }
    },
    series: [{
      name: seriesLabel,
      colorByPoint: true,
      data: data
    }]
  })
}
function countHolders (holder) {
  return $('#thisfrm').serializeArray().reduce(function (obj, item) {
    if (item.name.indexOf('holder') !== -1) {
      if (item.value == holder) {
        obj = isNaN(obj) ? 1 : obj + 1
      }
    }
    return obj
  }, 1)
}

function countAllHolders () {
  return $('#thisfrm').serializeArray().reduce(function (obj, item) {
    if (item.name.indexOf('holder') !== -1) {
      obj = isNaN(obj) ? 1 : obj + 1
    }
    return obj
  }, 1)
}

function getOwners () {
  return $('#thisfrm').serializeArray().reduce(function (obj, item) {
    if (item.name.indexOf('data') !== -1) {
      var index = item.name.substring(item.name.lastIndexOf('[') + 1, item.name.lastIndexOf(']'))
      var itemName = item.name.substring(item.name.lastIndexOf(']') + 1, item.name.lastIndexOf(''))

      if (index in obj) {
        obj[index][itemName] = item.value
      } else {
        obj[index] = {}
        obj[index][itemName] = item.value
      }
    }
    return obj
  }, {})
}

function reorderData (data) {
  var output = {}
  $.each(data, function (index, value) {
    if (value.holder in output) {
      output[value.holder].push(value)
    } else {
      output[value.holder] = []
      output[value.holder].push(value)
    }
  })
  return output
}

$(document).on('click', '.addmore', function () {
  var holder = $(this).attr('data-holder')
  var countIndex = countHolders(holder)
  var countAllHolder = countAllHolders()

  if (holders.count[holder] >= countIndex) {
    var fieldReturn = '<div class="ui ' + holders.colour[holder] + ' message">'
    fieldReturn += '<div class="header capitalize"><i class="minus square icon pointer remover" data-holder="' + holder + '"></i> ' + holder + ' Holder</div><hr />'
    fieldReturn += '<input type="hidden" value="' + countAllHolder + '" name="data[' + countAllHolder + ']id">'
    fieldReturn += '<input type="hidden" value="' + holder + '" name="data[' + countAllHolder + ']holder">'
    fieldReturn += '<div class="ui form">'
    fieldReturn += '<div class="fields">'
    fieldReturn += '<div class="field">'
    fieldReturn += '<label>Name</label>'
    fieldReturn += '<input type="text" name="data[' + countAllHolder + ']name">'
    fieldReturn += '</div>'
    fieldReturn += '<div class="field">'
    fieldReturn += '<label>Email</label>'
    fieldReturn += '<input type="email" name="data[' + countAllHolder + ']email">'
    fieldReturn += '</div>'
    fieldReturn += '<div class="field">'
    fieldReturn += '<label>ISNI No</label>'
    fieldReturn += '<input type="number" name="data[' + countAllHolder + ']isni">'
    fieldReturn += '</div>'
    fieldReturn += '<div class="field">'
    fieldReturn += '<label>Ownership</label>'
    fieldReturn += '<input type="number" min="1" max="100" name="data[' + countAllHolder + ']percentage" class="percentage">'
    fieldReturn += '</div>'
    fieldReturn += '</div>'
    fieldReturn += '</div>'
    fieldReturn += '</div>'

    $('#container-fields').append(fieldReturn)
    $('#count_' + holder).html(countIndex)

    if (holders.count[holder] == countIndex) {
      $(this).addClass('disabled')
    }
    $('html, body').animate({
      scrollTop: $('#saveme').offset().top - 800
    })
  }
})

$(document).on('click', '.remover', function () {
  $(this).parent('div').parent('div').remove()
  var holder = $(this).attr('data-holder')
  var countIndex = countHolders(holder)
  $('#count_' + holder).html((countIndex - 1))
  if (holders.count[holder] >= countIndex) {
    $('#button_' + holder).removeClass('disabled')
  }
})

$(document).on('submit', '#thisfrm', function () {
  event.preventDefault()

  addingTrackData(
    parseInt($("input[name*='iswc']").val().trim()),
    $("input[name*='songname']").val().trim(),
    reorderData(getOwners())
  )
})

function addingTrackData (iswcno, songname, owners) {
  loadLoader('Please wait adding data to blockchain.....')
  var trackStr = {}
  var TrackData = {
    iswcno: iswcno,
    songname: songname,
    owners: owners
  }
  trackStr = JSON.stringify(TrackData)

  var account_one = web3.eth.coinbase
  var account_two = web3.eth.coinbase

  Trackdata.deployed().then(function (instance) {
    return instance.saveTrackDetails(iswcno, trackStr.toString(), {from: account_one, gas: 999999})
  }).then(function (result) {
    $('#thisfrm').fadeOut(800, function () {
      removeLoader()
      $('#thisfrm').html('<div class="ui olive message">Successfully logged to blockchain!</div>').fadeIn().delay(2000)
    })
    setTimeout(function () {
      window.location.reload(false)
    }, 3000)
  })
}

function loadLoader (_text = 'Loading...') {
  $('#content-main .dimmer .text').html(_text).parent().addClass('active')
}
function removeLoader () {
  $('#content-main .dimmer').removeClass('active')
}
