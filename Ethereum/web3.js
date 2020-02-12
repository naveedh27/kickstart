import Web3 from 'web3';

let web3;

if(typeof window !== 'undefined' && typeof window.web3 !== 'undefined'){
  /*
  *We are on browser and has metamask running
  */
  web3 = new Web3(window.web3.currentProvider);

}else{
  /*
  *We are on server or user doesnt have metamask
  */
  const provider = new Web3.providers.HttpProvider(
      'https://rinkeby.infura.io/v3/14fee75d94434616a185b489cc9698fd'
  );

  web3 = new Web3(provider);

}




export default web3;