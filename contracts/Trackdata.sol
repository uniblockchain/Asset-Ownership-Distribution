pragma solidity ^0.4.4;

contract Trackdata {

  mapping(uint => string) trackDetails;
  mapping(string => string) settings;
  mapping(string => uint) ratio;

  function setSettingsPublish(string download, string stream){
    settings['download_publish'] = download;
    settings['stream_publish'] = stream;
  }
  function setSettingsRecord(string download, string stream){
    settings['download_record'] = download;
    settings['stream_record'] = stream;
  }
  function setSettingsRevenue(string download, string stream){
    settings['download_revenue'] = download;
    settings['stream_revenue'] = stream;
  }
  function getSettings() constant returns (
      string download_publish,
      string stream_publish,
      string download_record,
      string stream_record,
      string download_revenue,
      string stream_revenue){
    download_publish = settings['download_publish'];
    stream_publish = settings['stream_publish'];
    download_record = settings['download_record'];
    stream_record = settings['stream_record'];
    download_revenue = settings['download_revenue'];
    stream_revenue = settings['stream_revenue'];
  }

  function saveTrackDetails(uint index, string _trackDetails){
    trackDetails[index] = _trackDetails;
  }

  function getTrackDetails(uint index) constant returns (string _trackDetails){
    _trackDetails = trackDetails[index];
  }
}
