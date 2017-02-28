pragma solidity ^0.4.2;

contract Tracks {
  struct STrack{
    uint trackId;
    bytes32 trackName;
    bytes32 authorDetails;
  }
  STrack[] public STracks;
  uint trackCount;
  address public STracksOwner;

  function Tracks(){
    STracksOwner = msg.sender;
  }

  function saveTrackDetails(uint _trackId, bytes32 _trackName,bytes32 _AuthorsDetails) returns (uint success){
    success = trackCount;
    STrack memory newTrack;
    newTrack.trackId = _trackId;
    newTrack.trackName = _trackName;
    newTrack.authorDetails = _AuthorsDetails;
    STracks[trackCount] = newTrack;
    trackCount++;
  }

  function getTrackDetails(uint _trackId) constant returns (uint trackId, bytes32 trackName, bytes32 authorDetails){
    STrack trackDetails = STracks[_trackId];
    trackName = trackDetails.trackName;
    trackId =  trackDetails.trackId;
    authorDetails =  trackDetails.authorDetails;
  }
}
