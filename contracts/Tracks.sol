pragma solidity ^0.4.2;

contract Tracks {

  address public STracksOwner;
  struct STrack{
    uint trackId;
    bytes32 trackName;
    mapping (uint => Author) Authors;
  }

  struct Author {
    bytes32[] authorDetails;
  }

  Author thisAuthor;
  mapping (uint => STrack) public STracks;

  function Tracks(){
    STracksOwner = msg.sender;
  }

  function saveTrackDetails(uint trackId, bytes32 trackName,bytes32[] AuthorsDetails) returns (uint identifier){
    STracks[trackId] = STrack(trackId, trackName);
    saveAuthorDetailsToTrack(AuthorsDetails, trackId);
  }

  function saveAuthorDetailsToTrack(bytes32[] AuthorsDetails, uint trackId){
    STrack includeAuthor = STracks[trackId];

    for (uint i = 0; i < AuthorsDetails.length; i++){
      Author details = thisAuthor;
      details.authorDetails.push(AuthorsDetails[i]);
      includeAuthor.Authors[i] = details;
    }
  }

  function getTrackDetails(uint trackId) returns (bytes32 trackName){
    STrack trackDetails = STracks[trackId];
    trackName = trackDetails.trackName;
  }
}
