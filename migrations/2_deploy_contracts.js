const DappToken = artifacts.require('DappToken')
const DaiToken = artifacts.require('DaiToken')
const TokenFarm = artifacts.require('TokenFarm')

module.exports =async function(deployer, network, accounts) {
  //Deploy Mock DAI token
  await deployer.deploy(DaiToken)
  const daiToken = await DaiToken.deployed()

  //Deploy Dapp Token
  await deployer.deploy(DappToken)
  const dappToken = await DappToken.deployed()

  //Deploy Tokenfarm
  await deployer.deploy(TokenFarm, dappToken.address, daiToken.address)
  const tokenFarm = await TokenFarm.deployed()

  //Transfer all token to tokenfarm 
  await dappToken.transfer(tokenFarm.address, '1000000000000000000000000')

  //Transfer 100 Mock DAI token to investor
  await daiToken.transfer(accounts[1], '100000000000000000000')
}


