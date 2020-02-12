const WALLETPROVIDER = require('truffle-hdwallet-provider');
const Web3 = require('web3');

const compiledFactory = require('./build/CampaignFactory.json');


const provider = new WALLETPROVIDER(
  'soldier ice act culture uniform stereo census worth creek try grief mass',
  'https://rinkeby.infura.io/v3/14fee75d94434616a185b489cc9698fd'
);

// const provider = new WALLETPROVIDER(
//   'caution tilt convince say choose title cigar salt marriage few traffic hill',
//   'http://localhost:8545'
// );

const web3 = new Web3(provider);
let accounts , inbox;

const deploy = async ()=>{
accounts = await web3.eth.getAccounts();

 console.log('Address from which contract will be deployed : '+accounts[0]);

 const inbox = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({data:compiledFactory.bytecode})
    .send({from : accounts[0],gas: '10000000' });

  //console.log(interface);
  console.log('Contract Address '+inbox.options.address);
  inbox.setProvider(provider);
}


deploy();
