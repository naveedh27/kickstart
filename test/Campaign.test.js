const assert = require('assert');
const ganache = require('ganache-cli');

const Web3 = require('web3');

web3 = new Web3(ganache.provider());

const compiledFactory = require('../Ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../Ethereum/build/Campaign.json');

let accounts, factory, campaignAddress, campaign;


before(async()=>{
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
                .deploy({data : compiledFactory.bytecode})
                .send({from: accounts[0], gas : '1000000'});
  //factory.setProvider(ganache.provider());

  await factory.methods.createCampaign('1000').send({
    from:accounts[0],
    gas : '1000000'
  });

  [campaignAddress] = await factory.methods.getDeployed().call();

  campaign = await new web3.eth.Contract(
                        JSON.parse(compiledCampaign.interface),
                        campaignAddress
                      );

});

describe("Campaign",() =>{
  it('Deploys Both contract',()=>{
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);

  });

  it('Marks Caller as campaign Manager', async()=>{
    const manager = await campaign.methods.manager().call();
    assert.equal(manager,accounts[0]);
  });

  it('Can Contribute', async()=>{
    await campaign.methods.contribute().send({
      from:accounts[1],
      value : web3.utils.toWei('10','ether')
    });

    const noOfApprovers = await campaign.methods.noOfApprovers().call();
    const hasApproversAddress = await campaign.methods.approvers(accounts[1]).call();

    assert.equal(1,noOfApprovers);
    assert(hasApproversAddress);

  });

  it('Minimum Contribution', async()=>{
    try{
      await campaign.methods.contribute().send({
        from:accounts[1],
        value : '200'
      });
    assert(false);
    }catch(e){
      assert(true);
    }
  });

  it('Allows manager to make request', async()=>{

      await campaign.methods.createRequest("Buy me a Burger", web3.utils.toWei('5','ether'),accounts[5]).send({
        from:accounts[0],
        gas:'1000000'
      });
      const request =   await campaign.methods.requests(0).call();
      assert.equal("Buy me a Burger",request.description);

  });

  it('Is Approval Recived', async()=>{

      await campaign.methods.approveRequest(0).send({
        from:accounts[1],
        gas:'1000000'
      });

      let beforbal = await web3.eth.getBalance(accounts[5]);

      //console.log(web3.utils.fromWei((beforbal).toString(),'ether'));

      await campaign.methods.finalizeRequest(0).send({
        from:accounts[0],
        gas:'1000000'
      });

      //let afterbal = await web3.eth.getBalance(accounts[5]);

      console.log(web3.utils.fromWei((afterbal).toString(),'ether'));

      assert(web3.utils.fromWei((afterbal-beforbal).toString(),'ether') > 4.99);


  });



});
