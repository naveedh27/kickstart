import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';


const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x68Be74226def2F3E2b3bEc8B6828236d307c0446'
);


export default instance;
