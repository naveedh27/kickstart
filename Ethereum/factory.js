import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';


const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x80796738395fBbE3C3372eC4CFA70C09135340C4'
);


export default instance;
