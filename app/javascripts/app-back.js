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
