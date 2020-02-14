import Web3 from 'web3';

let web3;

if(typeof window !== 'undefined' && typeof window.web3 !== 'undefined'){
  /*
  *We are on browser and has metamask running
  */
 window.web3 = new Web3(ethereum);
 window.addEventListener('load', async () => {
      // Modern dapp browsers...
      if (window.ethereum) {
          
          try {
              // Request account access if needed
              await ethereum.enable();
          } catch (error) {
              // User denied account access...
          }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
          window.web3 = new Web3(web3.currentProvider);
          
      }
      // Non-dapp browsers...
      else {
          console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
      
    });
    web3 = window.web3;
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
