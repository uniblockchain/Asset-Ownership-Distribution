/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

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

var combineHolders = 'isni';

const Trackdata = __webpack_require__(1);

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
}

var TrackdataContract = web3.eth.contract(Trackdata.abi);
var trackDataInstance = TrackdataContract.at(
  '0x1b7323be5ea39b6da8b6cdfcdbff17090cdc3984'
);

$(document).on('click', '#txs li', function() {
  var txnid = $(this).attr('data-tx');
  getTx(txnid);
});

$(document).ready(function() {
  $('.ui.sticky').sticky({
    context: '#container-wrapper'
  });

  $('.ui.dropdown').dropdown();

  var iswcNo;
  $('#srchfrm').on('submit', function(e) {
    e.preventDefault();
    $('#scSearh').attr('disabled', true);
    iswcNo = $('#srchinput')
      .val()
      .trim();
    $('#srchfrm input').val('');

    if (iswcNo === '') {
      $('#scSearh').attr('disabled', false);
      return;
    }

    var settings = trackDataInstance.getSettings();

    var perRate = {
      download: settings[0],
      stream: settings[1]
    };
    $('#download_label').html('@ $ ' + perRate['download'] + ' each');
    $('#stream_label').html('@ $ ' + perRate['stream'] + ' each');
    $('#download').val(perRate['download']);
    $('#stream').val(perRate['stream']);

    loadTrackdata(iswcNo);

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
});

window.onload = function() {
  $('.ui.accordion').accordion();

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
  ];

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
  //
  // trackDataInstance.setSettings('0.091', '0.0011', {
  //   from: web3.eth.coinbase,
  //   gas: 999999
  // });
  // trackDataInstance.setRatio('40', '30', '30', {
  //   from: web3.eth.coinbase,
  //   gas: 999999
  // });

  // Set settings
  // Trackdata.deployed().then(function (instance) {
  //   return instance.setSettings('0.091', '0.0011', {from: web3.eth.coinbase, gas: 999999})
  // })

  // Set ratio
  // Trackdata.deployed().then(function (instance) {
  //   return instance.setRatio('40', '30', '30', {from: web3.eth.coinbase, gas: 999999})
  // })
};

function getTx(txid) {
  var trck = Trackdata.deployed();
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
  var iswc =
    $("input[name*='iswc']").val() == ''
      ? makeno(5)
      : $("input[name*='iswc']").val();
  $("input[name*='iswc']").val(iswc);
  $("input[name*='songname']").val('Work From Home');

  setTimeout(function() {
    // first row
    $('#button_publish').trigger('click');
    $('#button_record').trigger('click');
    $('#button_revenue').trigger('click');
    $("input[name*='data[1]name']").val(makeid(4));
    $("input[name*='data[1]email']").val(makeid() + '@me.com');
    $("input[name*='data[1]isni']").val(makeno(5));
    $("input[name*='data[1]percentage']").val(50);
    $("input[name*='data[2]name']").val(makeid(4));
    $("input[name*='data[2]email']").val(makeid() + '@me.com');
    $("input[name*='data[2]isni']").val(makeno(5));
    $("input[name*='data[2]percentage']").val(50);
    $("input[name*='data[3]name']").val(makeid(4));
    $("input[name*='data[3]email']").val(makeid() + '@me.com');
    $("input[name*='data[3]isni']").val(makeno(5));
    $("input[name*='data[3]percentage']").val(50);

    // Second row
    $('#button_publish').trigger('click');
    $('#button_record').trigger('click');
    $('#button_revenue').trigger('click');
    $("input[name*='data[4]name']").val(makeid(4));
    $("input[name*='data[4]email']").val(makeid() + '@me.com');
    $("input[name*='data[4]isni']").val(makeno(5));
    $("input[name*='data[4]percentage']").val(50);
    $("input[name*='data[5]name']").val(makeid(4));
    $("input[name*='data[5]email']").val(makeid() + '@me.com');
    $("input[name*='data[5]isni']").val(makeno(5));
    $("input[name*='data[5]percentage']").val(50);
    $("input[name*='data[6]name']").val(makeid(4));
    $("input[name*='data[6]email']").val(makeid() + '@me.com');
    $("input[name*='data[6]isni']").val(makeno(5));
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
  for (var i = 0; i < 5; i++) {
    text += possible.charAt(Math.floor(Math.random() * len));
  }
  return text;
}

function loadTrackdata(iswcNo) {
  iswcNo = web3.fromAscii(iswcNo);
  trackDataInstance.getTrackDetails
    .call(iswcNo)
    .then(function(_trackDetails) {
      console.dir(_trackDetails);
    })
    .catch(function(e) {
      console.dir(e);
    });
  result = '';
  if (result == '') {
    $('#mhead').text('Invalid ISWC No');
    $('#container-wrapper').html(
      '<div class="ui negative fluid message"><div class="header"> Sorry, it looks like we dont have that ISWC No in the chain yet.</div><p>That offer has expired</p></div>'
    );
  } else {
    var retJson = JSON.parse(result);
    var k = '<h2>' + retJson.songname + ' - ISWC: ' + retJson.iswcno + '</h2>';
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
  Trackdata.deployed()
    .then(function(instance) {
      loadLoader();
      return instance.getTrackDetails(iswcNo);
    })
    .then(function(result) {
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
        var k =
          '<h2>' + retJson.songname + ' - ISWC: ' + retJson.iswcno + '</h2>';
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
    });
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
      '<input type="number" name="data[' + countAllHolder + ']isni">';
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

  addingTrackData(
    parseInt(
      $("input[name*='iswc']")
        .val()
        .trim()
    ),
    $("input[name*='songname']")
      .val()
      .trim(),
    reorderData(getOwners())
  );
});

$(document).on('submit', '#srchfrm', function() {
  event.preventDefault();
  var iswcNo = $('#srchinput')
    .val()
    .trim();
  $('#srchfrm')[0].reset();
  loadLoader();

  if (iswcNo === '') {
    $('#scSearh').attr('disabled', false);
    return;
  }

  Trackdata.deployed()
    .then(function(instance) {
      return instance.getSettings();
    })
    .then(function(result) {
      var perRate = {
        download: result[0],
        stream: result[1]
      };
      $('#download_label').html('@ $ ' + perRate['download'] + ' each');
      $('#stream_label').html('@ $ ' + perRate['stream'] + ' each');
      $('#download').val(perRate['download']);
      $('#stream').val(perRate['stream']);
    });

  loadTrackdata(iswcNo);

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

function addingTrackData(iswcno, songname, owners) {
  loadLoader('Please wait adding data to blockchain.....');
  var trackStr = {};
  var TrackData = {
    iswcno: iswcno,
    songname: songname,
    owners: owners
  };
  trackStr = JSON.stringify(TrackData);

  var account_one = web3.eth.coinbase;
  var account_two = web3.eth.coinbase;

  trackDataInstance.saveTrackDetails(
    iswcno,
    trackStr.toString(),
    {
      from: account_one,
      gas: 999999
    },
    function(err, result) {
      setTimeout(function() {
        window.location.reload(false);
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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = {"contractName":"MusicRecords","abi":[{"constant":false,"inputs":[{"name":"index","type":"bytes32"},{"name":"_trackDetails","type":"string"}],"name":"saveTrackDetails","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"download","type":"string"},{"name":"stream","type":"string"}],"name":"setSettingsPublish","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"download","type":"string"},{"name":"stream","type":"string"}],"name":"setSettingsRevenue","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getSettings","outputs":[{"name":"download_publish","type":"string"},{"name":"stream_publish","type":"string"},{"name":"download_record","type":"string"},{"name":"stream_record","type":"string"},{"name":"download_revenue","type":"string"},{"name":"stream_revenue","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"bytes32"}],"name":"getTrackDetails","outputs":[{"name":"_trackDetails","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"download","type":"string"},{"name":"stream","type":"string"}],"name":"setSettingsRecord","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}],"bytecode":"0x6060604052341561000f57600080fd5b610fed8061001e6000396000f300606060405260043610610077576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806268b5761461007c5780632c4b1275146100e6578063310f30b61461018657806385b4bb5314610226578063c30726bb146104d0578063c642316d14610570575b600080fd5b341561008757600080fd5b6100e460048080356000191690602001909190803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050610610565b005b34156100f157600080fd5b610184600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050919050506106ba565b005b341561019157600080fd5b610224600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050610764565b005b341561023157600080fd5b61023961080e565b6040518080602001806020018060200180602001806020018060200187810387528d818151815260200191508051906020019080838360005b8381101561028d578082015181840152602081019050610272565b50505050905090810190601f1680156102ba5780820380516001836020036101000a031916815260200191505b5087810386528c818151815260200191508051906020019080838360005b838110156102f35780820151818401526020810190506102d8565b50505050905090810190601f1680156103205780820380516001836020036101000a031916815260200191505b5087810385528b818151815260200191508051906020019080838360005b8381101561035957808201518184015260208101905061033e565b50505050905090810190601f1680156103865780820380516001836020036101000a031916815260200191505b5087810384528a818151815260200191508051906020019080838360005b838110156103bf5780820151818401526020810190506103a4565b50505050905090810190601f1680156103ec5780820380516001836020036101000a031916815260200191505b50878103835289818151815260200191508051906020019080838360005b8381101561042557808201518184015260208101905061040a565b50505050905090810190601f1680156104525780820380516001836020036101000a031916815260200191505b50878103825288818151815260200191508051906020019080838360005b8381101561048b578082015181840152602081019050610470565b50505050905090810190601f1680156104b85780820380516001836020036101000a031916815260200191505b509c5050505050505050505050505060405180910390f35b34156104db57600080fd5b6104f5600480803560001916906020019091905050610d5c565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561053557808201518184015260208101905061051a565b50505050905090810190601f1680156105625780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561057b57600080fd5b61060e600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050610e5e565b005b60011515600080846000191660001916815260200190815260200160002060010160009054906101000a900460ff1615151415151561064e57600080fd5b806000808460001916600019168152602001908152602001600020600001908051906020019061067f929190610f08565b506001600080846000191660001916815260200190815260200160002060010160006101000a81548160ff0219169083151502179055505050565b81600160405180807f646f776e6c6f61645f7075626c6973680000000000000000000000000000000081525060100190509081526020016040518091039020908051906020019061070c929190610f08565b5080600160405180807f73747265616d5f7075626c697368000000000000000000000000000000000000815250600e0190509081526020016040518091039020908051906020019061075f929190610f08565b505050565b81600160405180807f646f776e6c6f61645f726576656e7565000000000000000000000000000000008152506010019050908152602001604051809103902090805190602001906107b6929190610f08565b5080600160405180807f73747265616d5f726576656e7565000000000000000000000000000000000000815250600e01905090815260200160405180910390209080519060200190610809929190610f08565b505050565b610816610f88565b61081e610f88565b610826610f88565b61082e610f88565b610836610f88565b61083e610f88565b600160405180807f646f776e6c6f61645f7075626c69736800000000000000000000000000000000815250601001905090815260200160405180910390208054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156109105780601f106108e557610100808354040283529160200191610910565b820191906000526020600020905b8154815290600101906020018083116108f357829003601f168201915b50505050509550600160405180807f73747265616d5f7075626c697368000000000000000000000000000000000000815250600e01905090815260200160405180910390208054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156109e95780601f106109be576101008083540402835291602001916109e9565b820191906000526020600020905b8154815290600101906020018083116109cc57829003601f168201915b50505050509450600160405180807f646f776e6c6f61645f7265636f72640000000000000000000000000000000000815250600f01905090815260200160405180910390208054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610ac25780601f10610a9757610100808354040283529160200191610ac2565b820191906000526020600020905b815481529060010190602001808311610aa557829003601f168201915b50505050509350600160405180807f73747265616d5f7265636f726400000000000000000000000000000000000000815250600d01905090815260200160405180910390208054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610b9b5780601f10610b7057610100808354040283529160200191610b9b565b820191906000526020600020905b815481529060010190602001808311610b7e57829003601f168201915b50505050509250600160405180807f646f776e6c6f61645f726576656e756500000000000000000000000000000000815250601001905090815260200160405180910390208054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610c745780601f10610c4957610100808354040283529160200191610c74565b820191906000526020600020905b815481529060010190602001808311610c5757829003601f168201915b50505050509150600160405180807f73747265616d5f726576656e7565000000000000000000000000000000000000815250600e01905090815260200160405180910390208054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610d4d5780601f10610d2257610100808354040283529160200191610d4d565b820191906000526020600020905b815481529060010190602001808311610d3057829003601f168201915b50505050509050909192939495565b610d64610f88565b60011515600080846000191660001916815260200190815260200160002060010160009054906101000a900460ff161515141515610da157600080fd5b60008083600019166000191681526020019081526020016000206000018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610e525780601f10610e2757610100808354040283529160200191610e52565b820191906000526020600020905b815481529060010190602001808311610e3557829003601f168201915b50505050509050919050565b81600160405180807f646f776e6c6f61645f7265636f72640000000000000000000000000000000000815250600f01905090815260200160405180910390209080519060200190610eb0929190610f08565b5080600160405180807f73747265616d5f7265636f726400000000000000000000000000000000000000815250600d01905090815260200160405180910390209080519060200190610f03929190610f08565b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610f4957805160ff1916838001178555610f77565b82800160010185558215610f77579182015b82811115610f76578251825591602001919060010190610f5b565b5b509050610f849190610f9c565b5090565b602060405190810160405280600081525090565b610fbe91905b80821115610fba576000816000905550600101610fa2565b5090565b905600a165627a7a723058208d4b18d4a1117dc89d8bb1879f31422f605c5492e8ba0d4505dc74c7bc6d07fb0029","deployedBytecode":"0x606060405260043610610077576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806268b5761461007c5780632c4b1275146100e6578063310f30b61461018657806385b4bb5314610226578063c30726bb146104d0578063c642316d14610570575b600080fd5b341561008757600080fd5b6100e460048080356000191690602001909190803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050610610565b005b34156100f157600080fd5b610184600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050919050506106ba565b005b341561019157600080fd5b610224600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050610764565b005b341561023157600080fd5b61023961080e565b6040518080602001806020018060200180602001806020018060200187810387528d818151815260200191508051906020019080838360005b8381101561028d578082015181840152602081019050610272565b50505050905090810190601f1680156102ba5780820380516001836020036101000a031916815260200191505b5087810386528c818151815260200191508051906020019080838360005b838110156102f35780820151818401526020810190506102d8565b50505050905090810190601f1680156103205780820380516001836020036101000a031916815260200191505b5087810385528b818151815260200191508051906020019080838360005b8381101561035957808201518184015260208101905061033e565b50505050905090810190601f1680156103865780820380516001836020036101000a031916815260200191505b5087810384528a818151815260200191508051906020019080838360005b838110156103bf5780820151818401526020810190506103a4565b50505050905090810190601f1680156103ec5780820380516001836020036101000a031916815260200191505b50878103835289818151815260200191508051906020019080838360005b8381101561042557808201518184015260208101905061040a565b50505050905090810190601f1680156104525780820380516001836020036101000a031916815260200191505b50878103825288818151815260200191508051906020019080838360005b8381101561048b578082015181840152602081019050610470565b50505050905090810190601f1680156104b85780820380516001836020036101000a031916815260200191505b509c5050505050505050505050505060405180910390f35b34156104db57600080fd5b6104f5600480803560001916906020019091905050610d5c565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561053557808201518184015260208101905061051a565b50505050905090810190601f1680156105625780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561057b57600080fd5b61060e600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050610e5e565b005b60011515600080846000191660001916815260200190815260200160002060010160009054906101000a900460ff1615151415151561064e57600080fd5b806000808460001916600019168152602001908152602001600020600001908051906020019061067f929190610f08565b506001600080846000191660001916815260200190815260200160002060010160006101000a81548160ff0219169083151502179055505050565b81600160405180807f646f776e6c6f61645f7075626c6973680000000000000000000000000000000081525060100190509081526020016040518091039020908051906020019061070c929190610f08565b5080600160405180807f73747265616d5f7075626c697368000000000000000000000000000000000000815250600e0190509081526020016040518091039020908051906020019061075f929190610f08565b505050565b81600160405180807f646f776e6c6f61645f726576656e7565000000000000000000000000000000008152506010019050908152602001604051809103902090805190602001906107b6929190610f08565b5080600160405180807f73747265616d5f726576656e7565000000000000000000000000000000000000815250600e01905090815260200160405180910390209080519060200190610809929190610f08565b505050565b610816610f88565b61081e610f88565b610826610f88565b61082e610f88565b610836610f88565b61083e610f88565b600160405180807f646f776e6c6f61645f7075626c69736800000000000000000000000000000000815250601001905090815260200160405180910390208054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156109105780601f106108e557610100808354040283529160200191610910565b820191906000526020600020905b8154815290600101906020018083116108f357829003601f168201915b50505050509550600160405180807f73747265616d5f7075626c697368000000000000000000000000000000000000815250600e01905090815260200160405180910390208054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156109e95780601f106109be576101008083540402835291602001916109e9565b820191906000526020600020905b8154815290600101906020018083116109cc57829003601f168201915b50505050509450600160405180807f646f776e6c6f61645f7265636f72640000000000000000000000000000000000815250600f01905090815260200160405180910390208054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610ac25780601f10610a9757610100808354040283529160200191610ac2565b820191906000526020600020905b815481529060010190602001808311610aa557829003601f168201915b50505050509350600160405180807f73747265616d5f7265636f726400000000000000000000000000000000000000815250600d01905090815260200160405180910390208054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610b9b5780601f10610b7057610100808354040283529160200191610b9b565b820191906000526020600020905b815481529060010190602001808311610b7e57829003601f168201915b50505050509250600160405180807f646f776e6c6f61645f726576656e756500000000000000000000000000000000815250601001905090815260200160405180910390208054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610c745780601f10610c4957610100808354040283529160200191610c74565b820191906000526020600020905b815481529060010190602001808311610c5757829003601f168201915b50505050509150600160405180807f73747265616d5f726576656e7565000000000000000000000000000000000000815250600e01905090815260200160405180910390208054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610d4d5780601f10610d2257610100808354040283529160200191610d4d565b820191906000526020600020905b815481529060010190602001808311610d3057829003601f168201915b50505050509050909192939495565b610d64610f88565b60011515600080846000191660001916815260200190815260200160002060010160009054906101000a900460ff161515141515610da157600080fd5b60008083600019166000191681526020019081526020016000206000018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610e525780601f10610e2757610100808354040283529160200191610e52565b820191906000526020600020905b815481529060010190602001808311610e3557829003601f168201915b50505050509050919050565b81600160405180807f646f776e6c6f61645f7265636f72640000000000000000000000000000000000815250600f01905090815260200160405180910390209080519060200190610eb0929190610f08565b5080600160405180807f73747265616d5f7265636f726400000000000000000000000000000000000000815250600d01905090815260200160405180910390209080519060200190610f03929190610f08565b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610f4957805160ff1916838001178555610f77565b82800160010185558215610f77579182015b82811115610f76578251825591602001919060010190610f5b565b5b509050610f849190610f9c565b5090565b602060405190810160405280600081525090565b610fbe91905b80821115610fba576000816000905550600101610fa2565b5090565b905600a165627a7a723058208d4b18d4a1117dc89d8bb1879f31422f605c5492e8ba0d4505dc74c7bc6d07fb0029","sourceMap":"26:1480:2:-;;;;;;;;;;;;;;;;;","deployedSourceMap":"26:1480:2:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1153:180;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;220:145;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;513;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;661:489;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:2;8:100;;;99:1;94:3;90;84:5;80:1;75:3;71;64:6;52:2;49:1;45:3;40:15;;8:100;;;12:14;3:109;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1;8:100;33:3;30:1;27:2;8:100;;;99:1;94:3;90;84:5;80:1;75:3;71;64:6;52:2;49:1;45:3;40:15;;8:100;;;12:14;3:109;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1;8:100;33:3;30:1;27:2;8:100;;;99:1;94:3;90;84:5;80:1;75:3;71;64:6;52:2;49:1;45:3;40:15;;8:100;;;12:14;3:109;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1;8:100;33:3;30:1;27:2;8:100;;;99:1;94:3;90;84:5;80:1;75:3;71;64:6;52:2;49:1;45:3;40:15;;8:100;;;12:14;3:109;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1;8:100;33:3;30:1;27:2;8:100;;;99:1;94:3;90;84:5;80:1;75:3;71;64:6;52:2;49:1;45:3;40:15;;8:100;;;12:14;3:109;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1;8:100;33:3;30:1;27:2;8:100;;;99:1;94:3;90;84:5;80:1;75:3;71;64:6;52:2;49:1;45:3;40:15;;8:100;;;12:14;3:109;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1336:168:2;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:2;8:100;;;99:1;94:3;90;84:5;80:1;75:3;71;64:6;52:2;49:1;45:3;40:15;;8:100;;;12:14;3:109;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;368:142:2;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1153:180;1256:4;1235:25;;:5;:12;1241:5;1235:12;;;;;;;;;;;;;;;;;:17;;;;;;;;;;;;:25;;;;1227:34;;;;;;;;1288:13;1265:5;:12;1271:5;1265:12;;;;;;;;;;;;;;;;;:20;;:36;;;;;;;;;;;;:::i;:::-;;1325:4;1305:5;:12;1311:5;1305:12;;;;;;;;;;;;;;;;;:17;;;:24;;;;;;;;;;;;;;;;;;1153:180;;:::o;220:145::-;314:8;283;:28;;;;;;;;;;;;;;;;;;;;;;;;:39;;;;;;;;;;;;:::i;:::-;;355:6;326:8;:26;;;;;;;;;;;;;;;;;;;;;;;;:35;;;;;;;;;;;;:::i;:::-;;220:145;;:::o;513:::-;607:8;576;:28;;;;;;;;;;;;;;;;;;;;;;;;:39;;;;;;;;;;;;:::i;:::-;;648:6;619:8;:26;;;;;;;;;;;;;;;;;;;;;;;;:35;;;;;;;;;;;;:::i;:::-;;513:145;;:::o;661:489::-;705:23;;:::i;:::-;732:21;;:::i;:::-;757:22;;:::i;:::-;783:20;;:::i;:::-;807:23;;:::i;:::-;834:21;;:::i;:::-;879:8;:28;;;;;;;;;;;;;;;;;;;;;;;;860:47;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;928:8;:26;;;;;;;;;;;;;;;;;;;;;;;;911:43;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;976:8;:27;;;;;;;;;;;;;;;;;;;;;;;;958:45;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1023:8;:25;;;;;;;;;;;;;;;;;;;;;;;;1007:41;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1071:8;:28;;;;;;;;;;;;;;;;;;;;;;;;1052:47;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1120:8;:26;;;;;;;;;;;;;;;;;;;;;;;;1103:43;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;661:489;;;;;;:::o;1336:168::-;1401:20;;:::i;:::-;1455:4;1434:25;;:5;:12;1440:5;1434:12;;;;;;;;;;;;;;;;;:17;;;;;;;;;;;;:25;;;1426:34;;;;;;;;1480:5;:12;1486:5;1480:12;;;;;;;;;;;;;;;;;:20;;1464:36;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1336:168;;;:::o;368:142::-;460:8;430;:27;;;;;;;;;;;;;;;;;;;;;;;;:38;;;;;;;;;;;;:::i;:::-;;500:6;472:8;:25;;;;;;;;;;;;;;;;;;;;;;;;:34;;;;;;;;;;;;:::i;:::-;;368:142;;:::o;26:1480::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;:::o;:::-;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o","source":"pragma solidity ^0.4.4;\n\n\ncontract MusicRecords {\n\n\tstruct TrackDetails {\n\t\tstring details;\n\t\tbool used;\n\t}\n\tmapping(bytes32 => TrackDetails) track;\n\tmapping(string => string) settings;\n\tmapping(string => uint) ratio;\n\n\tfunction setSettingsPublish(string download, string stream){\n\t\tsettings['download_publish'] = download;\n\t\tsettings['stream_publish'] = stream;\n\t}\n\n\tfunction setSettingsRecord(string download, string stream){\n\t\tsettings['download_record'] = download;\n\t\tsettings['stream_record'] = stream;\n\t}\n\n\tfunction setSettingsRevenue(string download, string stream){\n\t\tsettings['download_revenue'] = download;\n\t\tsettings['stream_revenue'] = stream;\n\t}\n\n\tfunction getSettings() constant returns (\n\t\tstring download_publish,\n\t\tstring stream_publish,\n\t\tstring download_record,\n\t\tstring stream_record,\n\t\tstring download_revenue,\n\t\tstring stream_revenue){\n\t\tdownload_publish = settings['download_publish'];\n\t\tstream_publish = settings['stream_publish'];\n\t\tdownload_record = settings['download_record'];\n\t\tstream_record = settings['stream_record'];\n\t\tdownload_revenue = settings['download_revenue'];\n\t\tstream_revenue = settings['stream_revenue'];\n\t}\n\n\tfunction saveTrackDetails(bytes32 index, string _trackDetails) public {\n\t\trequire(track[index].used != true);\n\t\ttrack[index].details = _trackDetails;\n\t\ttrack[index].used = true;\n\t}\n\n\tfunction getTrackDetails(bytes32 index) public constant returns (string _trackDetails){\n\t\trequire(track[index].used == true);\n\t\t_trackDetails = track[index].details;\n\t}\n}\n","sourcePath":"/Users/sibizulu/Code/Asset-Ownership-Distribution/contracts/MusicRecords.sol","ast":{"attributes":{"absolutePath":"/Users/sibizulu/Code/Asset-Ownership-Distribution/contracts/MusicRecords.sol","exportedSymbols":{"MusicRecords":[260]}},"children":[{"attributes":{"literals":["solidity","^","0.4",".4"]},"id":75,"name":"PragmaDirective","src":"0:23:2"},{"attributes":{"baseContracts":[null],"contractDependencies":[null],"contractKind":"contract","documentation":null,"fullyImplemented":true,"linearizedBaseContracts":[260],"name":"MusicRecords","scope":261},"children":[{"attributes":{"canonicalName":"MusicRecords.TrackDetails","name":"TrackDetails","scope":260,"visibility":"public"},"children":[{"attributes":{"constant":false,"name":"details","scope":80,"stateVariable":false,"storageLocation":"default","type":"string storage pointer","value":null,"visibility":"internal"},"children":[{"attributes":{"name":"string","type":"string storage pointer"},"id":76,"name":"ElementaryTypeName","src":"76:6:2"}],"id":77,"name":"VariableDeclaration","src":"76:14:2"},{"attributes":{"constant":false,"name":"used","scope":80,"stateVariable":false,"storageLocation":"default","type":"bool","value":null,"visibility":"internal"},"children":[{"attributes":{"name":"bool","type":"bool"},"id":78,"name":"ElementaryTypeName","src":"94:4:2"}],"id":79,"name":"VariableDeclaration","src":"94:9:2"}],"id":80,"name":"StructDefinition","src":"52:55:2"},{"attributes":{"constant":false,"name":"track","scope":260,"stateVariable":true,"storageLocation":"default","type":"mapping(bytes32 => struct MusicRecords.TrackDetails storage ref)","value":null,"visibility":"internal"},"children":[{"attributes":{"type":"mapping(bytes32 => struct MusicRecords.TrackDetails storage ref)"},"children":[{"attributes":{"name":"bytes32","type":"bytes32"},"id":81,"name":"ElementaryTypeName","src":"117:7:2"},{"attributes":{"contractScope":null,"name":"TrackDetails","referencedDeclaration":80,"type":"struct MusicRecords.TrackDetails storage pointer"},"id":82,"name":"UserDefinedTypeName","src":"128:12:2"}],"id":83,"name":"Mapping","src":"109:32:2"}],"id":84,"name":"VariableDeclaration","src":"109:38:2"},{"attributes":{"constant":false,"name":"settings","scope":260,"stateVariable":true,"storageLocation":"default","type":"mapping(string memory => string storage ref)","value":null,"visibility":"internal"},"children":[{"attributes":{"type":"mapping(string memory => string storage ref)"},"children":[{"attributes":{"name":"string","type":"string storage pointer"},"id":85,"name":"ElementaryTypeName","src":"158:6:2"},{"attributes":{"name":"string","type":"string storage pointer"},"id":86,"name":"ElementaryTypeName","src":"168:6:2"}],"id":87,"name":"Mapping","src":"150:25:2"}],"id":88,"name":"VariableDeclaration","src":"150:34:2"},{"attributes":{"constant":false,"name":"ratio","scope":260,"stateVariable":true,"storageLocation":"default","type":"mapping(string memory => uint256)","value":null,"visibility":"internal"},"children":[{"attributes":{"type":"mapping(string memory => uint256)"},"children":[{"attributes":{"name":"string","type":"string storage pointer"},"id":89,"name":"ElementaryTypeName","src":"195:6:2"},{"attributes":{"name":"uint","type":"uint256"},"id":90,"name":"ElementaryTypeName","src":"205:4:2"}],"id":91,"name":"Mapping","src":"187:23:2"}],"id":92,"name":"VariableDeclaration","src":"187:29:2"},{"attributes":{"constant":false,"implemented":true,"isConstructor":false,"modifiers":[null],"name":"setSettingsPublish","payable":false,"scope":260,"stateMutability":"nonpayable","superFunction":null,"visibility":"public"},"children":[{"children":[{"attributes":{"constant":false,"name":"download","scope":112,"stateVariable":false,"storageLocation":"default","type":"string memory","value":null,"visibility":"internal"},"children":[{"attributes":{"name":"string","type":"string storage pointer"},"id":93,"name":"ElementaryTypeName","src":"248:6:2"}],"id":94,"name":"VariableDeclaration","src":"248:15:2"},{"attributes":{"constant":false,"name":"stream","scope":112,"stateVariable":false,"storageLocation":"default","type":"string memory","value":null,"visibility":"internal"},"children":[{"attributes":{"name":"string","type":"string storage pointer"},"id":95,"name":"ElementaryTypeName","src":"265:6:2"}],"id":96,"name":"VariableDeclaration","src":"265:13:2"}],"id":97,"name":"ParameterList","src":"247:32:2"},{"attributes":{"parameters":[null]},"children":[],"id":98,"name":"ParameterList","src":"279:0:2"},{"children":[{"children":[{"attributes":{"argumentTypes":null,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"operator":"=","type":"string storage ref"},"children":[{"attributes":{"argumentTypes":null,"isConstant":false,"isLValue":true,"isPure":false,"lValueRequested":true,"type":"string storage ref"},"children":[{"attributes":{"argumentTypes":null,"overloadedDeclarations":[null],"referencedDeclaration":88,"type":"mapping(string memory => string storage ref)","value":"settings"},"id":99,"name":"Identifier","src":"283:8:2"},{"attributes":{"argumentTypes":null,"hexvalue":"646f776e6c6f61645f7075626c697368","isConstant":false,"isLValue":false,"isPure":true,"lValueRequested":false,"subdenomination":null,"token":"string","type":"literal_string \"download_publish\"","value":"download_publish"},"id":100,"name":"Literal","src":"292:18:2"}],"id":101,"name":"IndexAccess","src":"283:28:2"},{"attributes":{"argumentTypes":null,"overloadedDeclarations":[null],"referencedDeclaration":94,"type":"string memory","value":"download"},"id":102,"name":"Identifier","src":"314:8:2"}],"id":103,"name":"Assignment","src":"283:39:2"}],"id":104,"name":"ExpressionStatement","src":"283:39:2"},{"children":[{"attributes":{"argumentTypes":null,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"operator":"=","type":"string storage ref"},"children":[{"attributes":{"argumentTypes":null,"isConstant":false,"isLValue":true,"isPure":false,"lValueRequested":true,"type":"string storage ref"},"children":[{"attributes":{"argumentTypes":null,"overloadedDeclarations":[null],"referencedDeclaration":88,"type":"mapping(string memory => string storage ref)","value":"settings"},"id":105,"name":"Identifier","src":"326:8:2"},{"attributes":{"argumentTypes":null,"hexvalue":"73747265616d5f7075626c697368","isConstant":false,"isLValue":false,"isPure":true,"lValueRequested":false,"subdenomination":null,"token":"string","type":"literal_string \"stream_publish\"","value":"stream_publish"},"id":106,"name":"Literal","src":"335:16:2"}],"id":107,"name":"IndexAccess","src":"326:26:2"},{"attributes":{"argumentTypes":null,"overloadedDeclarations":[null],"referencedDeclaration":96,"type":"string memory","value":"stream"},"id":108,"name":"Identifier","src":"355:6:2"}],"id":109,"name":"Assignment","src":"326:35:2"}],"id":110,"name":"ExpressionStatement","src":"326:35:2"}],"id":111,"name":"Block","src":"279:86:2"}],"id":112,"name":"FunctionDefinition","src":"220:145:2"},{"attributes":{"constant":false,"implemented":true,"isConstructor":false,"modifiers":[null],"name":"setSettingsRecord","payable":false,"scope":260,"stateMutability":"nonpayable","superFunction":null,"visibility":"public"},"children":[{"children":[{"attributes":{"constant":false,"name":"download","scope":132,"stateVariable":false,"storageLocation":"default","type":"string memory","value":null,"visibility":"internal"},"children":[{"attributes":{"name":"string","type":"string storage pointer"},"id":113,"name":"ElementaryTypeName","src":"395:6:2"}],"id":114,"name":"VariableDeclaration","src":"395:15:2"},{"attributes":{"constant":false,"name":"stream","scope":132,"stateVariable":false,"storageLocation":"default","type":"string memory","value":null,"visibility":"internal"},"children":[{"attributes":{"name":"string","type":"string storage pointer"},"id":115,"name":"ElementaryTypeName","src":"412:6:2"}],"id":116,"name":"VariableDeclaration","src":"412:13:2"}],"id":117,"name":"ParameterList","src":"394:32:2"},{"attributes":{"parameters":[null]},"children":[],"id":118,"name":"ParameterList","src":"426:0:2"},{"children":[{"children":[{"attributes":{"argumentTypes":null,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"operator":"=","type":"string storage ref"},"children":[{"attributes":{"argumentTypes":null,"isConstant":false,"isLValue":true,"isPure":false,"lValueRequested":true,"type":"string storage ref"},"children":[{"attributes":{"argumentTypes":null,"overloadedDeclarations":[null],"referencedDeclaration":88,"type":"mapping(string memory => string storage ref)","value":"settings"},"id":119,"name":"Identifier","src":"430:8:2"},{"attributes":{"argumentTypes":null,"hexvalue":"646f776e6c6f61645f7265636f7264","isConstant":false,"isLValue":false,"isPure":true,"lValueRequested":false,"subdenomination":null,"token":"string","type":"literal_string \"download_record\"","value":"download_record"},"id":120,"name":"Literal","src":"439:17:2"}],"id":121,"name":"IndexAccess","src":"430:27:2"},{"attributes":{"argumentTypes":null,"overloadedDeclarations":[null],"referencedDeclaration":114,"type":"string memory","value":"download"},"id":122,"name":"Identifier","src":"460:8:2"}],"id":123,"name":"Assignment","src":"430:38:2"}],"id":124,"name":"ExpressionStatement","src":"430:38:2"},{"children":[{"attributes":{"argumentTypes":null,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"operator":"=","type":"string storage ref"},"children":[{"attributes":{"argumentTypes":null,"isConstant":false,"isLValue":true,"isPure":false,"lValueRequested":true,"type":"string storage ref"},"children":[{"attributes":{"argumentTypes":null,"overloadedDeclarations":[null],"referencedDeclaration":88,"type":"mapping(string memory => string storage ref)","value":"settings"},"id":125,"name":"Identifier","src":"472:8:2"},{"attributes":{"argumentTypes":null,"hexvalue":"73747265616d5f7265636f7264","isConstant":false,"isLValue":false,"isPure":true,"lValueRequested":false,"subdenomination":null,"token":"string","type":"literal_string \"stream_record\"","value":"stream_record"},"id":126,"name":"Literal","src":"481:15:2"}],"id":127,"name":"IndexAccess","src":"472:25:2"},{"attributes":{"argumentTypes":null,"overloadedDeclarations":[null],"referencedDeclaration":116,"type":"string memory","value":"stream"},"id":128,"name":"Identifier","src":"500:6:2"}],"id":129,"name":"Assignment","src":"472:34:2"}],"id":130,"name":"ExpressionStatement","src":"472:34:2"}],"id":131,"name":"Block","src":"426:84:2"}],"id":132,"name":"FunctionDefinition","src":"368:142:2"},{"attributes":{"constant":false,"implemented":true,"isConstructor":false,"modifiers":[null],"name":"setSettingsRevenue","payable":false,"scope":260,"stateMutability":"nonpayable","superFunction":null,"visibility":"public"},"children":[{"children":[{"attributes":{"constant":false,"name":"download","scope":152,"stateVariable":false,"storageLocation":"default","type":"string memory","value":null,"visibility":"internal"},"children":[{"attributes":{"name":"string","type":"string storage pointer"},"id":133,"name":"ElementaryTypeName","src":"541:6:2"}],"id":134,"name":"VariableDeclaration","src":"541:15:2"},{"attributes":{"constant":false,"name":"stream","scope":152,"stateVariable":false,"storageLocation":"default","type":"string memory","value":null,"visibility":"internal"},"children":[{"attributes":{"name":"string","type":"string storage pointer"},"id":135,"name":"ElementaryTypeName","src":"558:6:2"}],"id":136,"name":"VariableDeclaration","src":"558:13:2"}],"id":137,"name":"ParameterList","src":"540:32:2"},{"attributes":{"parameters":[null]},"children":[],"id":138,"name":"ParameterList","src":"572:0:2"},{"children":[{"children":[{"attributes":{"argumentTypes":null,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"operator":"=","type":"string storage ref"},"children":[{"attributes":{"argumentTypes":null,"isConstant":false,"isLValue":true,"isPure":false,"lValueRequested":true,"type":"string storage ref"},"children":[{"attributes":{"argumentTypes":null,"overloadedDeclarations":[null],"referencedDeclaration":88,"type":"mapping(string memory => string storage ref)","value":"settings"},"id":139,"name":"Identifier","src":"576:8:2"},{"attributes":{"argumentTypes":null,"hexvalue":"646f776e6c6f61645f726576656e7565","isConstant":false,"isLValue":false,"isPure":true,"lValueRequested":false,"subdenomination":null,"token":"string","type":"literal_string \"download_revenue\"","value":"download_revenue"},"id":140,"name":"Literal","src":"585:18:2"}],"id":141,"name":"IndexAccess","src":"576:28:2"},{"attributes":{"argumentTypes":null,"overloadedDeclarations":[null],"referencedDeclaration":134,"type":"string memory","value":"download"},"id":142,"name":"Identifier","src":"607:8:2"}],"id":143,"name":"Assignment","src":"576:39:2"}],"id":144,"name":"ExpressionStatement","src":"576:39:2"},{"children":[{"attributes":{"argumentTypes":null,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"operator":"=","type":"string storage ref"},"children":[{"attributes":{"argumentTypes":null,"isConstant":false,"isLValue":true,"isPure":false,"lValueRequested":true,"type":"string storage ref"},"children":[{"attributes":{"argumentTypes":null,"overloadedDeclarations":[null],"referencedDeclaration":88,"type":"mapping(string memory => string storage ref)","value":"settings"},"id":145,"name":"Identifier","src":"619:8:2"},{"attributes":{"argumentTypes":null,"hexvalue":"73747265616d5f726576656e7565","isConstant":false,"isLValue":false,"isPure":true,"lValueRequested":false,"subdenomination":null,"token":"string","type":"literal_string \"stream_revenue\"","value":"stream_revenue"},"id":146,"name":"Literal","src":"628:16:2"}],"id":147,"name":"IndexAccess","src":"619:26:2"},{"attributes":{"argumentTypes":null,"overloadedDeclarations":[null],"referencedDeclaration":136,"type":"string memory","value":"stream"},"id":148,"name":"Identifier","src":"648:6:2"}],"id":149,"name":"Assignment","src":"619:35:2"}],"id":150,"name":"ExpressionStatement","src":"619:35:2"}],"id":151,"name":"Block","src":"572:86:2"}],"id":152,"name":"FunctionDefinition","src":"513:145:2"},{"attributes":{"constant":true,"implemented":true,"isConstructor":false,"modifiers":[null],"name":"getSettings","payable":false,"scope":260,"stateMutability":"view","superFunction":null,"visibility":"public"},"children":[{"attributes":{"parameters":[null]},"children":[],"id":153,"name":"ParameterList","src":"681:2:2"},{"children":[{"attributes":{"constant":false,"name":"download_publish","scope":204,"stateVariable":false,"storageLocation":"default","type":"string memory","value":null,"visibility":"internal"},"children":[{"attributes":{"name":"string","type":"string storage pointer"},"id":154,"name":"ElementaryTypeName","src":"705:6:2"}],"id":155,"name":"VariableDeclaration","src":"705:23:2"},{"attributes":{"constant":false,"name":"stream_publish","scope":204,"stateVariable":false,"storageLocation":"default","type":"string memory","value":null,"visibility":"internal"},"children":[{"attributes":{"name":"string","type":"string storage pointer"},"id":156,"name":"ElementaryTypeName","src":"732:6:2"}],"id":157,"name":"VariableDeclaration","src":"732:21:2"},{"attributes":{"constant":false,"name":"download_record","scope":204,"stateVariable":false,"storageLocation":"default","type":"string memory","value":null,"visibility":"internal"},"children":[{"attributes":{"name":"string","type":"string storage pointer"},"id":158,"name":"ElementaryTypeName","src":"757:6:2"}],"id":159,"name":"VariableDeclaration","src":"757:22:2"},{"attributes":{"constant":false,"name":"stream_record","scope":204,"stateVariable":false,"storageLocation":"default","type":"string memory","value":null,"visibility":"internal"},"children":[{"attributes":{"name":"string","type":"string storage pointer"},"id":160,"name":"ElementaryTypeName","src":"783:6:2"}],"id":161,"name":"VariableDeclaration","src":"783:20:2"},{"attributes":{"constant":false,"name":"download_revenue","scope":204,"stateVariable":false,"storageLocation":"default","type":"string memory","value":null,"visibility":"internal"},"children":[{"attributes":{"name":"string","type":"string storage pointer"},"id":162,"name":"ElementaryTypeName","src":"807:6:2"}],"id":163,"name":"VariableDeclaration","src":"807:23:2"},{"attributes":{"constant":false,"name":"stream_revenue","scope":204,"stateVariable":false,"storageLocation":"default","type":"string memory","value":null,"visibility":"internal"},"children":[{"attributes":{"name":"string","type":"string storage pointer"},"id":164,"name":"ElementaryTypeName","src":"834:6:2"}],"id":165,"name":"VariableDeclaration","src":"834:21:2"}],"id":166,"name":"ParameterList","src":"701:155:2"},{"children":[{"children":[{"attributes":{"argumentTypes":null,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"operator":"=","type":"string memory"},"children":[{"attributes":{"argumentTypes":null,"overloadedDeclarations":[null],"referencedDeclaration":155,"type":"string memory","value":"download_publish"},"id":167,"name":"Identifier","src":"860:16:2"},{"attributes":{"argumentTypes":null,"isConstant":false,"isLValue":true,"isPure":false,"lValueRequested":false,"type":"string storage ref"},"children":[{"attributes":{"argumentTypes":null,"overloadedDeclarations":[null],"referencedDeclaration":88,"type":"mapping(string memory => string storage ref)","value":"settings"},"id":168,"name":"Identifier","src":"879:8:2"},{"attributes":{"argumentTypes":null,"hexvalue":"646f776e6c6f61645f7075626c697368","isConstant":false,"isLValue":false,"isPure":true,"lValueRequested":false,"subdenomination":null,"token":"string","type":"literal_string \"download_publish\"","value":"download_publish"},"id":169,"name":"Literal","src":"888:18:2"}],"id":170,"name":"IndexAccess","src":"879:28:2"}],"id":171,"name":"Assignment","src":"860:47:2"}],"id":172,"name":"ExpressionStatement","src":"860:47:2"},{"children":[{"attributes":{"argumentTypes":null,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"operator":"=","type":"string memory"},"children":[{"attributes":{"argumentTypes":null,"overloadedDeclarations":[null],"referencedDeclaration":157,"type":"string memory","value":"stream_publish"},"id":173,"name":"Identifier","src":"911:14:2"},{"attributes":{"argumentTypes":null,"isConstant":false,"isLValue":true,"isPure":false,"lValueRequested":false,"type":"string storage ref"},"children":[{"attributes":{"argumentTypes":null,"overloadedDeclarations":[null],"referencedDeclaration":88,"type":"mapping(string memory => string storage ref)","value":"settings"},"id":174,"name":"Identifier","src":"928:8:2"},{"attributes":{"argumentTypes":null,"hexvalue":"73747265616d5f7075626c697368","isConstant":false,"isLValue":false,"isPure":true,"lValueRequested":false,"subdenomination":null,"token":"string","type":"literal_string \"stream_publish\"","value":"stream_publish"},"id":175,"name":"Literal","src":"937:16:2"}],"id":176,"name":"IndexAccess","src":"928:26:2"}],"id":177,"name":"Assignment","src":"911:43:2"}],"id":178,"name":"ExpressionStatement","src":"911:43:2"},{"children":[{"attributes":{"argumentTypes":null,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"operator":"=","type":"string memory"},"children":[{"attributes":{"argumentTypes":null,"overloadedDeclarations":[null],"referencedDeclaration":159,"type":"string memory","value":"download_record"},"id":179,"name":"Identifier","src":"958:15:2"},{"attributes":{"argumentTypes":null,"isConstant":false,"isLValue":true,"isPure":false,"lValueRequested":false,"type":"string storage ref"},"children":[{"attributes":{"argumentTypes":null,"overloadedDeclarations":[null],"referencedDeclaration":88,"type":"mapping(string memory => string storage ref)","value":"settings"},"id":180,"name":"Identifier","src":"976:8:2"},{"attributes":{"argumentTypes":null,"hexvalue":"646f776e6c6f61645f7265636f7264","isConstant":false,"isLValue":false,"isPure":true,"lValueRequested":false,"subdenomination":null,"token":"string","type":"literal_string \"download_record\"","value":"download_record"},"id":181,"name":"Literal","src":"985:17:2"}],"id":182,"name":"IndexAccess","src":"976:27:2"}],"id":183,"name":"Assignment","src":"958:45:2"}],"id":184,"name":"ExpressionStatement","src":"958:45:2"},{"children":[{"attributes":{"argumentTypes":null,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"operator":"=","type":"string memory"},"children":[{"attributes":{"argumentTypes":null,"overloadedDeclarations":[null],"referencedDeclaration":161,"type":"string memory","value":"stream_record"},"id":185,"name":"Identifier","src":"1007:13:2"},{"attributes":{"argumentTypes":null,"isConstant":false,"isLValue":true,"isPure":false,"lValueRequested":false,"type":"string storage ref"},"children":[{"attributes":{"argumentTypes":null,"overloadedDeclarations":[null],"referencedDeclaration":88,"type":"mapping(string memory => string storage ref)","value":"settings"},"id":186,"name":"Identifier","src":"1023:8:2"},{"attributes":{"argumentTypes":null,"hexvalue":"73747265616d5f7265636f7264","isConstant":false,"isLValue":false,"isPure":true,"lValueRequested":false,"subdenomination":null,"token":"string","type":"literal_string \"stream_record\"","value":"stream_record"},"id":187,"name":"Literal","src":"1032:15:2"}],"id":188,"name":"IndexAccess","src":"1023:25:2"}],"id":189,"name":"Assignment","src":"1007:41:2"}],"id":190,"name":"ExpressionStatement","src":"1007:41:2"},{"children":[{"attributes":{"argumentTypes":null,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"operator":"=","type":"string memory"},"children":[{"attributes":{"argumentTypes":null,"overloadedDeclarations":[null],"referencedDeclaration":163,"type":"string memory","value":"download_revenue"},"id":191,"name":"Identifier","src":"1052:16:2"},{"attributes":{"argumentTypes":null,"isConstant":false,"isLValue":true,"isPure":false,"lValueRequested":false,"type":"string storage ref"},"children":[{"attributes":{"argumentTypes":null,"overloadedDeclarations":[null],"referencedDeclaration":88,"type":"mapping(string memory => string storage ref)","value":"settings"},"id":192,"name":"Identifier","src":"1071:8:2"},{"attributes":{"argumentTypes":null,"hexvalue":"646f776e6c6f61645f726576656e7565","isConstant":false,"isLValue":false,"isPure":true,"lValueRequested":false,"subdenomination":null,"token":"string","type":"literal_string \"download_revenue\"","value":"download_revenue"},"id":193,"name":"Literal","src":"1080:18:2"}],"id":194,"name":"IndexAccess","src":"1071:28:2"}],"id":195,"name":"Assignment","src":"1052:47:2"}],"id":196,"name":"ExpressionStatement","src":"1052:47:2"},{"children":[{"attributes":{"argumentTypes":null,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"operator":"=","type":"string memory"},"children":[{"attributes":{"argumentTypes":null,"overloadedDeclarations":[null],"referencedDeclaration":165,"type":"string memory","value":"stream_revenue"},"id":197,"name":"Identifier","src":"1103:14:2"},{"attributes":{"argumentTypes":null,"isConstant":false,"isLValue":true,"isPure":false,"lValueRequested":false,"type":"string storage ref"},"children":[{"attributes":{"argumentTypes":null,"overloadedDeclarations":[null],"referencedDeclaration":88,"type":"mapping(string memory => string storage ref)","value":"settings"},"id":198,"name":"Identifier","src":"1120:8:2"},{"attributes":{"argumentTypes":null,"hexvalue":"73747265616d5f726576656e7565","isConstant":false,"isLValue":false,"isPure":true,"lValueRequested":false,"subdenomination":null,"token":"string","type":"literal_string \"stream_revenue\"","value":"stream_revenue"},"id":199,"name":"Literal","src":"1129:16:2"}],"id":200,"name":"IndexAccess","src":"1120:26:2"}],"id":201,"name":"Assignment","src":"1103:43:2"}],"id":202,"name":"ExpressionStatement","src":"1103:43:2"}],"id":203,"name":"Block","src":"856:294:2"}],"id":204,"name":"FunctionDefinition","src":"661:489:2"},{"attributes":{"constant":false,"implemented":true,"isConstructor":false,"modifiers":[null],"name":"saveTrackDetails","payable":false,"scope":260,"stateMutability":"nonpayable","superFunction":null,"visibility":"public"},"children":[{"children":[{"attributes":{"constant":false,"name":"index","scope":235,"stateVariable":false,"storageLocation":"default","type":"bytes32","value":null,"visibility":"internal"},"children":[{"attributes":{"name":"bytes32","type":"bytes32"},"id":205,"name":"ElementaryTypeName","src":"1179:7:2"}],"id":206,"name":"VariableDeclaration","src":"1179:13:2"},{"attributes":{"constant":false,"name":"_trackDetails","scope":235,"stateVariable":false,"storageLocation":"default","type":"string memory","value":null,"visibility":"internal"},"children":[{"attributes":{"name":"string","type":"string storage pointer"},"id":207,"name":"ElementaryTypeName","src":"1194:6:2"}],"id":208,"name":"VariableDeclaration","src":"1194:20:2"}],"id":209,"name":"ParameterList","src":"1178:37:2"},{"attributes":{"parameters":[null]},"children":[],"id":210,"name":"ParameterList","src":"1223:0:2"},{"children":[{"children":[{"attributes":{"argumentTypes":null,"isConstant":false,"isLValue":false,"isPure":false,"isStructConstructorCall":false,"lValueRequested":false,"names":[null],"type":"tuple()","type_conversion":false},"children":[{"attributes":{"argumentTypes":[{"typeIdentifier":"t_bool","typeString":"bool"}],"overloadedDeclarations":[null],"referencedDeclaration":275,"type":"function (bool) pure","value":"require"},"id":211,"name":"Identifier","src":"1227:7:2"},{"attributes":{"argumentTypes":null,"commonType":{"typeIdentifier":"t_bool","typeString":"bool"},"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"operator":"!=","type":"bool"},"children":[{"attributes":{"argumentTypes":null,"isConstant":false,"isLValue":true,"isPure":false,"lValueRequested":false,"member_name":"used","referencedDeclaration":79,"type":"bool"},"children":[{"attributes":{"argumentTypes":null,"isConstant":false,"isLValue":true,"isPure":false,"lValueRequested":false,"type":"struct MusicRecords.TrackDetails storage ref"},"children":[{"attributes":{"argumentTypes":null,"overloadedDeclarations":[null],"referencedDeclaration":84,"type":"mapping(bytes32 => struct MusicRecords.TrackDetails storage ref)","value":"track"},"id":212,"name":"Identifier","src":"1235:5:2"},{"attributes":{"argumentTypes":null,"overloadedDeclarations":[null],"referencedDeclaration":206,"type":"bytes32","value":"index"},"id":213,"name":"Identifier","src":"1241:5:2"}],"id":214,"name":"IndexAccess","src":"1235:12:2"}],"id":215,"name":"MemberAccess","src":"1235:17:2"},{"attributes":{"argumentTypes":null,"hexvalue":"74727565","isConstant":false,"isLValue":false,"isPure":true,"lValueRequested":false,"subdenomination":null,"token":"bool","type":"bool","value":"true"},"id":216,"name":"Literal","src":"1256:4:2"}],"id":217,"name":"BinaryOperation","src":"1235:25:2"}],"id":218,"name":"FunctionCall","src":"1227:34:2"}],"id":219,"name":"ExpressionStatement","src":"1227:34:2"},{"children":[{"attributes":{"argumentTypes":null,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"operator":"=","type":"string storage ref"},"children":[{"attributes":{"argumentTypes":null,"isConstant":false,"isLValue":true,"isPure":false,"lValueRequested":true,"member_name":"details","referencedDeclaration":77,"type":"string storage ref"},"children":[{"attributes":{"argumentTypes":null,"isConstant":false,"isLValue":true,"isPure":false,"lValueRequested":false,"type":"struct MusicRecords.TrackDetails storage ref"},"children":[{"attributes":{"argumentTypes":null,"overloadedDeclarations":[null],"referencedDeclaration":84,"type":"mapping(bytes32 => struct MusicRecords.TrackDetails storage ref)","value":"track"},"id":220,"name":"Identifier","src":"1265:5:2"},{"attributes":{"argumentTypes":null,"overloadedDeclarations":[null],"referencedDeclaration":206,"type":"bytes32","value":"index"},"id":221,"name":"Identifier","src":"1271:5:2"}],"id":222,"name":"IndexAccess","src":"1265:12:2"}],"id":223,"name":"MemberAccess","src":"1265:20:2"},{"attributes":{"argumentTypes":null,"overloadedDeclarations":[null],"referencedDeclaration":208,"type":"string memory","value":"_trackDetails"},"id":224,"name":"Identifier","src":"1288:13:2"}],"id":225,"name":"Assignment","src":"1265:36:2"}],"id":226,"name":"ExpressionStatement","src":"1265:36:2"},{"children":[{"attributes":{"argumentTypes":null,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"operator":"=","type":"bool"},"children":[{"attributes":{"argumentTypes":null,"isConstant":false,"isLValue":true,"isPure":false,"lValueRequested":true,"member_name":"used","referencedDeclaration":79,"type":"bool"},"children":[{"attributes":{"argumentTypes":null,"isConstant":false,"isLValue":true,"isPure":false,"lValueRequested":false,"type":"struct MusicRecords.TrackDetails storage ref"},"children":[{"attributes":{"argumentTypes":null,"overloadedDeclarations":[null],"referencedDeclaration":84,"type":"mapping(bytes32 => struct MusicRecords.TrackDetails storage ref)","value":"track"},"id":227,"name":"Identifier","src":"1305:5:2"},{"attributes":{"argumentTypes":null,"overloadedDeclarations":[null],"referencedDeclaration":206,"type":"bytes32","value":"index"},"id":228,"name":"Identifier","src":"1311:5:2"}],"id":229,"name":"IndexAccess","src":"1305:12:2"}],"id":230,"name":"MemberAccess","src":"1305:17:2"},{"attributes":{"argumentTypes":null,"hexvalue":"74727565","isConstant":false,"isLValue":false,"isPure":true,"lValueRequested":false,"subdenomination":null,"token":"bool","type":"bool","value":"true"},"id":231,"name":"Literal","src":"1325:4:2"}],"id":232,"name":"Assignment","src":"1305:24:2"}],"id":233,"name":"ExpressionStatement","src":"1305:24:2"}],"id":234,"name":"Block","src":"1223:110:2"}],"id":235,"name":"FunctionDefinition","src":"1153:180:2"},{"attributes":{"constant":true,"implemented":true,"isConstructor":false,"modifiers":[null],"name":"getTrackDetails","payable":false,"scope":260,"stateMutability":"view","superFunction":null,"visibility":"public"},"children":[{"children":[{"attributes":{"constant":false,"name":"index","scope":259,"stateVariable":false,"storageLocation":"default","type":"bytes32","value":null,"visibility":"internal"},"children":[{"attributes":{"name":"bytes32","type":"bytes32"},"id":236,"name":"ElementaryTypeName","src":"1361:7:2"}],"id":237,"name":"VariableDeclaration","src":"1361:13:2"}],"id":238,"name":"ParameterList","src":"1360:15:2"},{"children":[{"attributes":{"constant":false,"name":"_trackDetails","scope":259,"stateVariable":false,"storageLocation":"default","type":"string memory","value":null,"visibility":"internal"},"children":[{"attributes":{"name":"string","type":"string storage pointer"},"id":239,"name":"ElementaryTypeName","src":"1401:6:2"}],"id":240,"name":"VariableDeclaration","src":"1401:20:2"}],"id":241,"name":"ParameterList","src":"1400:22:2"},{"children":[{"children":[{"attributes":{"argumentTypes":null,"isConstant":false,"isLValue":false,"isPure":false,"isStructConstructorCall":false,"lValueRequested":false,"names":[null],"type":"tuple()","type_conversion":false},"children":[{"attributes":{"argumentTypes":[{"typeIdentifier":"t_bool","typeString":"bool"}],"overloadedDeclarations":[null],"referencedDeclaration":275,"type":"function (bool) pure","value":"require"},"id":242,"name":"Identifier","src":"1426:7:2"},{"attributes":{"argumentTypes":null,"commonType":{"typeIdentifier":"t_bool","typeString":"bool"},"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"operator":"==","type":"bool"},"children":[{"attributes":{"argumentTypes":null,"isConstant":false,"isLValue":true,"isPure":false,"lValueRequested":false,"member_name":"used","referencedDeclaration":79,"type":"bool"},"children":[{"attributes":{"argumentTypes":null,"isConstant":false,"isLValue":true,"isPure":false,"lValueRequested":false,"type":"struct MusicRecords.TrackDetails storage ref"},"children":[{"attributes":{"argumentTypes":null,"overloadedDeclarations":[null],"referencedDeclaration":84,"type":"mapping(bytes32 => struct MusicRecords.TrackDetails storage ref)","value":"track"},"id":243,"name":"Identifier","src":"1434:5:2"},{"attributes":{"argumentTypes":null,"overloadedDeclarations":[null],"referencedDeclaration":237,"type":"bytes32","value":"index"},"id":244,"name":"Identifier","src":"1440:5:2"}],"id":245,"name":"IndexAccess","src":"1434:12:2"}],"id":246,"name":"MemberAccess","src":"1434:17:2"},{"attributes":{"argumentTypes":null,"hexvalue":"74727565","isConstant":false,"isLValue":false,"isPure":true,"lValueRequested":false,"subdenomination":null,"token":"bool","type":"bool","value":"true"},"id":247,"name":"Literal","src":"1455:4:2"}],"id":248,"name":"BinaryOperation","src":"1434:25:2"}],"id":249,"name":"FunctionCall","src":"1426:34:2"}],"id":250,"name":"ExpressionStatement","src":"1426:34:2"},{"children":[{"attributes":{"argumentTypes":null,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"operator":"=","type":"string memory"},"children":[{"attributes":{"argumentTypes":null,"overloadedDeclarations":[null],"referencedDeclaration":240,"type":"string memory","value":"_trackDetails"},"id":251,"name":"Identifier","src":"1464:13:2"},{"attributes":{"argumentTypes":null,"isConstant":false,"isLValue":true,"isPure":false,"lValueRequested":false,"member_name":"details","referencedDeclaration":77,"type":"string storage ref"},"children":[{"attributes":{"argumentTypes":null,"isConstant":false,"isLValue":true,"isPure":false,"lValueRequested":false,"type":"struct MusicRecords.TrackDetails storage ref"},"children":[{"attributes":{"argumentTypes":null,"overloadedDeclarations":[null],"referencedDeclaration":84,"type":"mapping(bytes32 => struct MusicRecords.TrackDetails storage ref)","value":"track"},"id":252,"name":"Identifier","src":"1480:5:2"},{"attributes":{"argumentTypes":null,"overloadedDeclarations":[null],"referencedDeclaration":237,"type":"bytes32","value":"index"},"id":253,"name":"Identifier","src":"1486:5:2"}],"id":254,"name":"IndexAccess","src":"1480:12:2"}],"id":255,"name":"MemberAccess","src":"1480:20:2"}],"id":256,"name":"Assignment","src":"1464:36:2"}],"id":257,"name":"ExpressionStatement","src":"1464:36:2"}],"id":258,"name":"Block","src":"1422:82:2"}],"id":259,"name":"FunctionDefinition","src":"1336:168:2"}],"id":260,"name":"ContractDefinition","src":"26:1480:2"}],"id":261,"name":"SourceUnit","src":"0:1507:2"},"compiler":{"name":"solc","version":"0.4.18+commit.9cf6e910.Emscripten.clang"},"networks":{"10101010":{"events":{},"links":{},"address":"0x1b7323be5ea39b6da8b6cdfcdbff17090cdc3984"}},"schemaVersion":"1.0.1","updatedAt":"2018-01-05T04:58:21.088Z"}

/***/ })
/******/ ]);