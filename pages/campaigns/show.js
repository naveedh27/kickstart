import React,{Component} from 'react';
import Layout from '../../Component/Layout'
import ContributeForm from '../../Component/ContributeForm'
import {Card,Grid,Button} from 'semantic-ui-react'
import Campaign from '../../Ethereum/Campaign'
import web3 from '../../Ethereum/web3'
import {Link} from '../../routes';

class CampaignShow extends Component{

  static async getInitialProps(props){

    const campaign = Campaign(props.query.address);
    const summary = await campaign.methods.getSummary().call();


    return {
      address : props.query.address,
      minimumContrib : summary[0],
      balance : summary[1],
      requestCount : summary[2],
      approversCount : summary[3],
      manager : summary[4]
    };


  }

  renderCard(){
    const items = [
      {
        header: this.props.manager,
        meta:'Address of manager',
        description:'Manager Created Campaign and Can create request for money',
        style : {overflowWrap : 'break-word'}
      },
      {
        header:  web3.utils.fromWei(this.props.balance,'ether') + ' Ether' ,
        meta:'Balance',
        description:'Available Balance in Contract'
      },
      {
        header: this.props.requestCount,
        meta:'Total Number of Requests',
        description:'Number of Requests in Campaign So Far'
      },
      {
        header: this.props.minimumContrib +' Wei' ,
        meta:'Minimum Contribution',
        description:'Minimum Contribution needed to join Campaign'
      },
      {
        header: this.props.approversCount ,
        meta:'Number of Approvers',
        description:'Total Number of Approvers in Campaign'
      }
    ];

    return <Card.Group items ={items} />
  }

    render(){
      return (
        <Layout>
          <h3>Campaign Details : </h3>
          <Grid>
          <Grid.Row>
              <Grid.Column width={12}>
                {this.renderCard()}

              </Grid.Column>
              <Grid.Column  width={4}>
                <ContributeForm address ={this.props.address} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
            <Grid.Column  width={4}>
              <Link route ={`/campaigns/${this.props.address}/requests`} >
              <a>
                <Button
                  primary
                  content = "View Requests"
                />
              </a>
              </Link>
              </Grid.Column>
            </Grid.Row>
          </Grid>


        </Layout>

      );
    }

}


export default CampaignShow;
