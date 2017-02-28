pragma solidity ^0.4.2;

contract Trackdata {

  mapping(uint => bytes32) trackDetails;

  function saveTrackDetails(uint index, bytes32 _trackDetails){
    trackDetails[index] = _trackDetails;
  }

  function getTrackDetails(uint index) constant returns (bytes32 _trackDetails){
    _trackDetails = trackDetails[index];
  }

}
