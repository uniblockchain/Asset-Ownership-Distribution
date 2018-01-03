const MusicRecords = artifacts.require('./MusicRecords.sol');

module.exports = function(deployer) {
  deployer.deploy(MusicRecords);
};
