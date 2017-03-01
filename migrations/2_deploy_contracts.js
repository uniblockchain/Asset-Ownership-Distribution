var ConvertLib = artifacts.require('./ConvertLib.sol')
var Trackdata = artifacts.require('./Trackdata.sol')

module.exports = function (deployer) {
  deployer.deploy(ConvertLib)
  deployer.link(ConvertLib, Trackdata)
  deployer.deploy(Trackdata)
}
