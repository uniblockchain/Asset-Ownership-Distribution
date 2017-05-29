pragma solidity ^0.4.4;

contract Trackdata {

  mapping(uint => string) trackDetails;
  mapping(string => string) settings;

  function setSettings(string download,string stream){
    settings['download'] = download;
    settings['stream'] = stream;
  }

  function getSettings() returns (string download, string stream){
    download = settings['download'];
    stream = settings['stream'];
    return (download, stream);
  }

  function saveTrackDetails(uint index, string _trackDetails){
    trackDetails[index] = _trackDetails;
  }

  function getTrackDetails(uint index) constant returns (string _trackDetails){
    _trackDetails = trackDetails[index];
  }

}
