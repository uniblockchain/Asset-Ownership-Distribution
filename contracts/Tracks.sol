pragma solidity ^0.4.2;

contract Tracks {

  address public STracksOwner;
  struct STrack{
    uint trackId;
    bytes32 trackName;
    bytes32[] authorDetails;
  }

  STrack[] public STracks;

  function Tracks(){
    STracksOwner = msg.sender;
  }

  function saveTrackDetails(uint trackId, bytes32 trackName,bytes32[] AuthorsDetails) returns (bool identifier){
    if (msg.sender != STracksOwner) {
        return false;
    }
    if (STracks[trackId].trackId != 0) {
        return false;
    }
    STracks[trackId] = STrack(trackId, trackName, AuthorsDetails);
    return true;
  }

  function getTrackDetails(uint trackId) returns (bytes32,bytes32[]){
    STrack trackDetails = STracks[trackId];
    return (trackDetails.trackName,trackDetails.authorDetails);
  }
}
