pragma solidity ^0.4.4;


contract MusicRecords {

	struct TrackDetails {
		string details;
		string iswc;
		string mpn;      // music project name
		bool used;
	}
	mapping(bytes32 => TrackDetails) track;
	mapping(string => string) settings;
	mapping(string => uint) ratio;

	function setSettingsPublish(string download, string stream){
		settings['download_publish'] = download;
		settings['stream_publish'] = stream;
	}

	function setSettingsRecord(string download, string stream){
		settings['download_record'] = download;
		settings['stream_record'] = stream;
	}

	function setSettingsRevenue(string download, string stream){
		settings['download_revenue'] = download;
		settings['stream_revenue'] = stream;
	}

	function getSettings() constant returns (
		string download_publish,
		string stream_publish,
		string download_record,
		string stream_record,
		string download_revenue,
		string stream_revenue){
		download_publish = settings['download_publish'];
		stream_publish = settings['stream_publish'];
		download_record = settings['download_record'];
		stream_record = settings['stream_record'];
		download_revenue = settings['download_revenue'];
		stream_revenue = settings['stream_revenue'];
	}

	function saveTrackDetails(bytes32 _isrc, string _iswc, string _mpn, string _trackDetails) public {
		
		require(int(_isrc) != 0 && bytes(_trackDetails).length != 0);
		require(track[_isrc].used != true);
		track[_isrc].details = _trackDetails;
		track[_isrc].iswc = _iswc;
		track[_isrc].mpn = _mpn;
		track[_isrc].used = true;
	}

	function getTrackDetails(bytes32 isrc) public constant returns (string _trackDetails, string _iswc, string _mpn){
		require(track[isrc].used == true);
		_trackDetails = track[isrc].details;
		_iswc = track[isrc].iswc;
		_mpn = track[isrc].mpn;
	}
}
