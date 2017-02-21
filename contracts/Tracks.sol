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

  function saveTrackDetails(uint trackId, bytes32 trackName,bytes32[] AuthorsDetails) returns (uint identifier){
    if (msg.sender == STracksOwner) {
      STracks[trackId] = STrack(trackId, trackName, AuthorsDetails);
    }
  }

  function getTrackDetails(uint trackId) returns (bytes32,bytes32[]){
    STrack trackDetails = STracks[trackId];
    return (trackDetails.trackName,trackDetails.authorDetails);
  }
}
