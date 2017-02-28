pragma solidity ^0.4.2;

contract Tracks {
  struct STrack{
    uint trackId;
    bytes32 trackName;
    bytes32[] authorDetails;
  }
  STrack[] public STracks;
  address public STracksOwner;

  function Tracks(){
    STracksOwner = msg.sender;
  }

  function saveTrackDetails(uint _trackId, bytes32 _trackName,bytes32[] _AuthorsDetails) returns (bool success){
    STrack memory newTrack;
    newTrack.trackId = _trackId;
    newTrack.trackName = _trackName;
    newTrack.authorDetails = _AuthorsDetails;
    STracks[_trackId] = newTrack;
    return true;
  }

  function getTrackDetails(uint _trackId) returns (uint, bytes32, bytes32[]){
    STrack trackDetails = STracks[_trackId];
    return (trackDetails.trackId, trackDetails.trackName,trackDetails.authorDetails);
  }
}
