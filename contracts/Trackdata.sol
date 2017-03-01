pragma solidity ^0.4.4;

contract Trackdata {

  mapping(uint => string) trackDetails;

  function saveTrackDetails(uint index, string _trackDetails){
    trackDetails[index] = _trackDetails;
  }

  function getTrackDetails(uint index) constant returns (string _trackDetails){
    _trackDetails = trackDetails[index];
  }

}
