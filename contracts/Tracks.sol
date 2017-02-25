pragma solidity ^0.4.2;

contract Tracks {

  address public STracksOwner;
  struct STrack{
    uint trackId;
    string trackName;
    string authorDetails;
  }

  STrack[] public STracks;

  function Tracks(){
    STracksOwner = msg.sender;
  }

  function saveTrackDetails(uint trackId, string trackName,string AuthorsDetails) returns (bool identifier){
    if (msg.sender != STracksOwner) {
        return false;
    }
    if (STracks[trackId].trackId != 0) {
        return false;
    }
    STracks[trackId] = STrack(trackId, trackName, AuthorsDetails);
    return true;
  }

  function getTrackDetails(uint trackId) returns (uint, string, string){
    STrack trackDetails = STracks[trackId];
    return (trackId, trackDetails.trackName,trackDetails.authorDetails);
  }
}
