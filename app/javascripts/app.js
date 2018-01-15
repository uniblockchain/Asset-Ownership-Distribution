var accounts;
var account;

var holders = {
  name: {
    publish: true,
    record: true,
    revenue: true
  },
  count: {
    publish: 5,
    record: 7,
    revenue: 7
  },
  colour: {
    publish: 'brown',
    record: 'orange',
    revenue: 'yellow'
  }
};

const content = [
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
];

var combineHolders = 'isni';

const MusicRecords = require('../../build/contracts/MusicRecords.json');

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
}

var MusicRecordsContract = web3.eth.contract(MusicRecords.abi);
var MusicRecordsInstance = MusicRecordsContract.at(
  '0x3770dde12d4c8a61e218a73fe119875b29bd6a4c'
);

$(document).on('click', '#txs li', function() {
  var txnid = $(this).attr('data-tx');
  getTx(txnid);
});

$(document).on('click', 'body', function() {
  $('.isni-no')
    .toArray()
    .forEach(function(field) {
      new Cleave(field, {
        numericOnly: true,
        delimiter: ' ',
        blocks: [4, 4, 4, 4]
      });
    });
});

window.onload = function() {
  $('.ui.accordion').accordion();

  $('.ui.search').search({
    source: content
  });

  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert('There was an error fetching your accounts.');
      return;
    }
    if (accs.length == 0) {
      alert(
        "Couldn't get any accounts! Make sure your Ethereum client is configured correctly."
      );
      return;
    }
    accounts = accs;
    account = accounts[0];
    refreshBalance();
  });

  // MusicRecordsInstance.setSettingsPublish('0.091', '0.0011', {
  //   from: web3.eth.coinbase,
  //   gas: 999999
  // });
  // MusicRecordsInstance.setSettingsRecord('0.0915', '0.007', {
  //   from: web3.eth.coinbase,
  //   gas: 999999
  // });
  // MusicRecordsInstance.setSettingsRevenue('0.001', '0.001', {
  //   from: web3.eth.coinbase,
  //   gas: 999999
  // });
};

function getTx(txid) {
  web3.eth.getTransaction(txid, function(errr, ress) {
    if (errr) {
      console.log('Error ' + errr);
    }
    var str = web3.toAscii(ress.input);
    $('.ui.modal').modal('show');
    $('#mhead').text('Tx. ' + txid);
    $('#respData').html('<pre>' + str + '</pre>');
  });
}

function refreshBalance() {
  var filter = web3.eth.filter({ address: web3.eth.coinbase });

  filter.watch(function(error, result) {
    if (!error) {
      console.log(result);
    }
  });

  document.getElementById('status').innerText = web3.fromWei(
    web3.eth.getBalance(web3.eth.coinbase),
    'ether'
  );
}

function prettyPrintHash(hash, len) {
  return (
    hash.slice(0, len) + '...' + hash.slice(hash.length - len, hash.length)
  );
}

$(document).on('change', 'input.percentage', function() {
  var sum = 0;
  var limit = 0;
  $('input.percentage').each(function() {
    if (limit == 1) {
      $(this).val(0);
      $(this).attr('disabled', 'disabled');
    } else {
      $(this).removeAttr('disabled');
      var thisval = Number($(this).val());
      sum += thisval;
      if (sum > 100) {
        sum = sum - thisval;
        $(this).val(100 - sum);
        sum = 100;
        limit = 1;
      }
      if (sum == 100) {
        limit = 1;
      }
    }
  });
});

function fillDataPlease(_this) {
  $(_this).addClass('disabled');
  const isrc = 'US-S1Z-' + makeno(2) + '-' + makeno(5);
  const iswc = 'T-' + makeno(9) + '-' + makeno(1);
  const songName = content[Math.floor(Math.random() * 22 + 1)];
  $("input[name*='isrc']").val(isrc);
  $("input[name*='iswc']").val(iswc);
  $("input[name*='songname']").val(songName.title);

  setTimeout(function() {
    // first row
    $('#button_publish').trigger('click');
    $('#button_record').trigger('click');
    $('#button_revenue').trigger('click');
    $("input[name*='data[1]name']").val(makeid(4));
    $("input[name*='data[1]email']").val(makeid() + '@me.com');
    $("input[name*='data[1]isni']").val(
      makeno(4) + ' ' + makeno(4) + ' ' + makeno(4) + ' ' + makeno(4)
    );

    $("input[name*='data[1]percentage']").val(50);
    $("input[name*='data[2]name']").val(makeid(4));
    $("input[name*='data[2]email']").val(makeid() + '@me.com');
    $("input[name*='data[2]isni']").val(
      makeno(4) + ' ' + makeno(4) + ' ' + makeno(4) + ' ' + makeno(4)
    );
    $("input[name*='data[2]percentage']").val(50);
    $("input[name*='data[3]name']").val(makeid(4));
    $("input[name*='data[3]email']").val(makeid() + '@me.com');
    $("input[name*='data[3]isni']").val(
      makeno(4) + ' ' + makeno(4) + ' ' + makeno(4) + ' ' + makeno(4)
    );
    $("input[name*='data[3]percentage']").val(50);

    // Second row
    $('#button_publish').trigger('click');
    $('#button_record').trigger('click');
    $('#button_revenue').trigger('click');
    $("input[name*='data[4]name']").val(makeid(4));
    $("input[name*='data[4]email']").val(makeid() + '@me.com');
    $("input[name*='data[4]isni']").val(
      makeno(4) + ' ' + makeno(4) + ' ' + makeno(4) + ' ' + makeno(4)
    );
    $("input[name*='data[4]percentage']").val(50);
    $("input[name*='data[5]name']").val(makeid(4));
    $("input[name*='data[5]email']").val(makeid() + '@me.com');
    $("input[name*='data[5]isni']").val(
      makeno(4) + ' ' + makeno(4) + ' ' + makeno(4) + ' ' + makeno(4)
    );
    $("input[name*='data[5]percentage']").val(50);
    $("input[name*='data[6]name']").val(makeid(4));
    $("input[name*='data[6]email']").val(makeid() + '@me.com');
    $("input[name*='data[6]isni']").val(
      makeno(4) + ' ' + makeno(4) + ' ' + makeno(4) + ' ' + makeno(4)
    );
    $("input[name*='data[6]percentage']").val(50);
  }, 1000);
}

function makeid() {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  for (var i = 0; i < 5; i++) {
    text += possible.charAt(Math.floor(Math.random() * 4));
  }

  return text;
}

function makeno(len) {
  var text = '';
  var possible = '0123456789';
  for (var i = 0; i < len; i++) {
    text += possible.charAt(Math.floor(Math.random() * len));
  }
  return text;
}

function loadTrackdata(isrc) {
  var result = MusicRecordsInstance.getTrackDetails.call(isrc);
  console.dir(result[0]);
  if (result == '') {
    $('#mhead').text('Invalid ISRC No');
    $('#container-wrapper').html(
      '<div class="ui negative fluid message"><div class="header"> Sorry, it looks like we dont have that ISRC No in the chain yet.</div><p>That offer has expired</p></div>'
    );
  } else {
    var retJson = JSON.parse(result[0]);
    console.dir(retJson);
    var k = '<h2>' + retJson.name + ' - ISRC: ' + retJson.isrc + '</h2>';
    $.each(retJson.owners, function(key, value) {
      k += '<table class="ui inverted ' + holders.colour[key] + ' table">';
      k +=
        '<thead class="full-width"> <tr><th><div class="ui ribbon label">' +
        key.toUpperCase() +
        '</div>Name</th><th>Email</th><th>ISNI</th> <th class="right aligned">Ownership (%)</th>';
      k += '</tr> </thead> <tbody>';
      $.each(value, function(index, item) {
        k += '<tr class="red">';
        k += '<td >' + item.name + '</td>';
        k += '<td >' + item.email + '</td>';
        k += '<td >' + item.isni + '</td>';
        k += '<td class="right aligned">' + item.percentage + '</td>';
        k += '</tr>';
      });
      k += '</tbody>';
      k += '</table>';
    });
    $('#container-wrapper').html(k);
  }
  $('#container-wrapper').removeClass('loading');
}

function loadTrackdataReport(iswcNo, total) {
  var result = MusicRecordsInstance.getTrackDetails.call(iswcNo);

  if (result == '') {
    $('#mhead').text('Invalid ISWC No');
    $('#container-wrapper').html(
      '<div class="ui negative fluid message"><div class="header"> Sorry, it looks like we dont have that ISWC No in the chain yet.</div><p>That offer has expired</p></div>'
    );
  } else {
    var retJson = JSON.parse(result);
    // calulate amount
    $.each(retJson.owners, function(index, value) {
      $.each(value, function(key, item) {
        retJson.owners[index][key].download =
          item.percentage / 100 * total['download'];
        retJson.owners[index][key].stream =
          item.percentage / 100 * total['stream'];
      });
    });
    retJson.download = total['download'];
    retJson.stream = total['stream'];
    // end of calculation

    // add download and stream
    var k = '<h2>' + retJson.songname + ' - ISWC: ' + retJson.iswcno + '</h2>';
    $.each(retJson.owners, function(key, value) {
      k += '<table class="ui inverted ' + holders.colour[key] + ' table">';
      k +=
        '<thead class="full-width"> <tr><th><div class="ui ribbon label">' +
        key.toUpperCase() +
        '</div>Name</th><th>Email</th><th>ISNI</th> <th class="right aligned">Ownership (%)</th><th class="right aligned">Download</th class="right aligned"><th class="right aligned">Stream</th>';
      k += '</tr> </thead> <tbody>';
      $.each(value, function(index, item) {
        k += '<tr class="red">';
        k += '<td >' + item.name + '</td>';
        k += '<td >' + item.email + '</td>';
        k += '<td >' + item.isni + '</td>';
        k += '<td class="right aligned">' + item.percentage + '</td>';
        k += '<td class="right aligned">' + item.download + '</td>';
        k += '<td class="right aligned">' + item.stream + '</td>';
        k += '</tr>';
      });
      k +=
        '<tfoot><tr><th>Total</th><th></th><th></th><th></th><th class="right aligned">' +
        retJson.download +
        '</th><th class="right aligned">' +
        retJson.stream +
        '</th></tr></tfoot>';
      k += '</tbody>';
      k += '</table>';
    });
    $('#container-wrapper').html(k);
    // end download and stream

    drawGraph(retJson);
  }
  removeLoader();
}
function drawGraph(jsonStats) {
  var categories = [];
  var download = [];
  var stream = [];

  $.each(jsonStats.owners, function(index, value) {
    var thisgraph = 'graph' + index;
    $('#container-graph').append(
      '<div id="' + thisgraph + '" class="eight wide column"></div>'
    );

    var data = [];
    $.each(value, function(key, item) {
      data.push({
        name: item.name,
        y: parseInt(item.percentage)
      });
      categories.push(item.name);
      download.push(item.download);
      stream.push(item.stream);
    });
    drawPie(thisgraph, index.toUpperCase(), 'Percentage', data);
  });
  drawBar(categories, [
    {
      name: 'Download',
      data: download
    },
    {
      name: 'Stream',
      data: stream
    }
  ]);
}

function drawBar(categories, data) {
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
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
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
  });
}
function drawPie(container, title, seriesLabel, data) {
  console.log([
    {
      name: 'Microsoft Internet Explorer',
      y: 50
    },
    {
      name: 'Proprietary or Undetectable',
      y: 50
    }
  ]);
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
    series: [
      {
        name: seriesLabel,
        colorByPoint: true,
        data: data
      }
    ]
  });
}
function countHolders(holder) {
  return $('#thisfrm')
    .serializeArray()
    .reduce(function(obj, item) {
      if (item.name.indexOf('holder') !== -1) {
        if (item.value == holder) {
          obj = isNaN(obj) ? 1 : obj + 1;
        }
      }
      return obj;
    }, 1);
}

function countAllHolders() {
  return $('#thisfrm')
    .serializeArray()
    .reduce(function(obj, item) {
      if (item.name.indexOf('holder') !== -1) {
        obj = isNaN(obj) ? 1 : obj + 1;
      }
      return obj;
    }, 1);
}

function getOwners() {
  return $('#thisfrm')
    .serializeArray()
    .reduce(function(obj, item) {
      if (item.name.indexOf('data') !== -1) {
        var index = item.name.substring(
          item.name.lastIndexOf('[') + 1,
          item.name.lastIndexOf(']')
        );
        var itemName = item.name.substring(
          item.name.lastIndexOf(']') + 1,
          item.name.lastIndexOf('')
        );

        if (index in obj) {
          obj[index][itemName] = item.value;
        } else {
          obj[index] = {};
          obj[index][itemName] = item.value;
        }
      }
      return obj;
    }, {});
}

function reorderData(data) {
  var output = {};
  $.each(data, function(index, value) {
    if (value.holder in output) {
      output[value.holder].push(value);
    } else {
      output[value.holder] = [];
      output[value.holder].push(value);
    }
  });
  return output;
}

$(document).on('click', '.addmore', function() {
  var holder = $(this).attr('data-holder');
  var countIndex = countHolders(holder);
  var countAllHolder = countAllHolders();

  if (holders.count[holder] >= countIndex) {
    var fieldReturn = '<div class="ui ' + holders.colour[holder] + ' message">';
    fieldReturn +=
      '<div class="header capitalize"><i class="minus square icon pointer remover" data-holder="' +
      holder +
      '"></i> ' +
      holder +
      ' Holder</div><hr />';
    fieldReturn +=
      '<input type="hidden" value="' +
      countAllHolder +
      '" name="data[' +
      countAllHolder +
      ']id">';
    fieldReturn +=
      '<input type="hidden" value="' +
      holder +
      '" name="data[' +
      countAllHolder +
      ']holder">';
    fieldReturn += '<div class="ui form">';
    fieldReturn += '<div class="fields">';
    fieldReturn += '<div class="field">';
    fieldReturn += '<label>Name</label>';
    fieldReturn +=
      '<input type="text" name="data[' + countAllHolder + ']name">';
    fieldReturn += '</div>';
    fieldReturn += '<div class="field">';
    fieldReturn += '<label>Email</label>';
    fieldReturn +=
      '<input type="email" name="data[' + countAllHolder + ']email">';
    fieldReturn += '</div>';
    fieldReturn += '<div class="field">';
    fieldReturn += '<label>ISNI No</label>';
    fieldReturn +=
      '<input type="text" name="data[' +
      countAllHolder +
      ']isni" class="isni-no">';
    fieldReturn += '</div>';
    fieldReturn += '<div class="field">';
    fieldReturn += '<label>Ownership</label>';
    fieldReturn +=
      '<input type="number" min="1" max="100" name="data[' +
      countAllHolder +
      ']percentage" class="percentage">';
    fieldReturn += '</div>';
    fieldReturn += '</div>';
    fieldReturn += '</div>';
    fieldReturn += '</div>';

    $('#container-fields').append(fieldReturn);
    $('#count_' + holder).html(countIndex);

    if (holders.count[holder] == countIndex) {
      $(this).addClass('disabled');
    }
    $('html, body').animate({
      scrollTop: $('#saveme').offset().top - 800
    });
  }
});

$(document).on('click', '.remover', function() {
  $(this)
    .parent('div')
    .parent('div')
    .remove();
  var holder = $(this).attr('data-holder');
  var countIndex = countHolders(holder);
  $('#count_' + holder).html(countIndex - 1);
  if (holders.count[holder] >= countIndex) {
    $('#button_' + holder).removeClass('disabled');
  }
});

$(document).on('submit', '#thisfrm', function() {
  event.preventDefault();

  const isrc = $("input[name*='isrc']").val();
  const iswc = $("input[name*='iswc']").val();
  const songName = $("input[name*='songname']").val();

  addingTrackData(
    isrc.trim(),
    iswc.trim(),
    songName.trim(),
    reorderData(getOwners())
  );
});

function addingTrackData(isrc, iswc, name, owners) {
  loadLoader('Please wait adding data to blockchain.....');
  var trackStr = {};
  var MusicRecords = {
    isrc: isrc,
    iswc: iswc,
    name: name,
    owners: owners
  };
  trackStr = JSON.stringify(MusicRecords);

  var account_one = web3.eth.coinbase;
  var account_two = web3.eth.coinbase;

  MusicRecordsInstance.saveTrackDetails(
    isrc,
    iswc,
    name,
    trackStr.toString(),
    {
      from: account_one,
      gas: 999999
    },
    function(err, result) {
      console.dir(result);
      console.dir(err);
      setTimeout(function() {
        //window.location.reload(false);
      }, 3000);
    }
  );
}

function loadLoader(_text = 'Loading...') {
  $('#content-main .dimmer .text')
    .html(_text)
    .parent()
    .addClass('active');
}
function removeLoader() {
  $('#content-main .dimmer').removeClass('active');
}

const Formatting = {
  init: function() {
    new Cleave('#iswc-no', {
      prefix: 'T',
      delimiter: '-',
      blocks: [1, 9, 1],
      numericOnly: true
    });
    new Cleave('#srchinput', {
      delimiter: '-',
      blocks: [2, 3, 2, 5],
      uppercase: true
    });
    new Cleave('#isrc-no', {
      delimiter: '-',
      blocks: [2, 3, 2, 5],
      uppercase: true
    });
  }
};

$(document).ready(function() {
  $('.ui.sticky').sticky({
    context: '#container-wrapper'
  });

  $('.ui.dropdown').dropdown();

  Formatting.init();

  var iswcNo;
  $('#srchfrm').on('submit', function(e) {
    e.preventDefault();

    const isrc = $('#srchinput').val();

    $('#scSearh').attr('disabled', true);
    $('#srchfrm input').val('');

    if (isrc === '') {
      $('#scSearh').attr('disabled', false);
      return;
    }

    var settings = MusicRecordsInstance.getSettings();

    var perRate = {
      download: settings[0],
      stream: settings[1]
    };
    $('#download_label').html('@ $ ' + perRate['download'] + ' each');
    $('#stream_label').html('@ $ ' + perRate['stream'] + ' each');
    $('#download').val(perRate['download']);
    $('#stream').val(perRate['stream']);

    loadTrackdata(isrc);

    $('#calculatefrm')
      .find('input, button, select')
      .attr('disabled', false);
    $('#calculatefrm')
      .find('input, button')
      .removeClass('disabled');
    $('#calculatefrm .ui.dropdown.selection').removeClass('disabled');
    $('#hidden_iswc').val(iswcNo);
    $('#scSearh').attr('disabled', false);
  });

  $('#fillData').on('click', function(e) {
    e.preventDefault();
    fillDataPlease(this);
  });

  $('#calculatefrm').on('submit', function(e) {
    e.preventDefault();

    var download = parseFloat($('#download').val());
    var stream = parseFloat($('#stream').val());
    var download_count = $('#download_count').val();
    var stream_count = $('#stream_count').val();

    var iswcNo = $('#hidden_iswc').val();

    var total = {
      download: download * download_count,
      stream: stream * stream_count
    };

    loadTrackdataReport(iswcNo, total);
  });

  // disabled/remove holders based on settings
  $.each(holders.name, function(index, value) {
    if (value === false) {
      $('#button_' + index).remove();
    }
  });
  // add button classes based on settings
  $('.addmore').each(function(index, value) {
    var holder = $(this).attr('data-holder');
    $(this)
      .find('.button')
      .addClass(holders.colour[holder]);
    $(this)
      .find('.label')
      .addClass(holders.colour[holder]);
  });

  $('.ui.form').form({
    fields: {
      iswc: {
        identifier: 'iswc',
        rules: [
          {
            type: 'regExp[/^[T](-)\\d{9}(-)\\d{1}/]',
            prompt: 'Please enter the right iswc'
          }
        ]
      },
      songname: {
        identifier: 'iswc',
        rules: [
          {
            type: 'empty',
            prompt: 'Please enter the song name'
          }
        ]
      }
    }
  });
});

var events = MusicRecordsInstance.allEvents(function(error, log) {
  if (!error) console.dir(log);
});
