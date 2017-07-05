pragma solidity ^0.4.4;

contract Trackdata {

  mapping(uint => string) trackDetails;
  mapping(string => string) settings;
  mapping(string => uint) ratio;

  function setSettings(string download, string stream){
    settings['download'] = download;
    settings['stream'] = stream;
  }

  function setRatio(uint publish, uint record, uint revenue){
    ratio['publish'] = publish;
    ratio['record'] = record;
    ratio['revenue'] = revenue;
  }

  function getSettings() constant returns (string download, string stream, uint publish, uint record, uint revenue){
    download = settings['download'];
    stream = settings['stream'];
    publish = ratio['stream'];
    record = ratio['stream'];
    revenue = ratio['stream'];
  }

  function saveTrackDetails(uint index, string _trackDetails){
    trackDetails[index] = _trackDetails;
  }

  function getTrackDetails(uint index) constant returns (string _trackDetails){
    _trackDetails = trackDetails[index];
  }
}
