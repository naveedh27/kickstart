import React,{Component} from 'react';
import {Link} from '../../../routes'
import Layout from '../../../Component/Layout';
import Campaign from '../../../Ethereum/Campaign';
import RequestRow from '../../../Component/RequestRow'
import {Button,Table} from 'semantic-ui-react';


class RequestIndex extends Component {

  static async getInitialProps(props){

    const address = props.query.address;

    const campaign = Campaign(address);

    const requestCount = await campaign.methods.getRequestCount().call();

    const approversCount = await campaign.methods.noOfApprovers().call();

    const requests = await Promise.all(
        Array(parseInt(requestCount)).fill().map((element,index)=>{
          return campaign.methods.requests(index).call();
        })
    );

    return {
      address : address,
      requests : requests,
      requestCount : requestCount,
      approversCount : approversCount
    }

  }

  renderRow(){
    return this.props.requests.map((request,index) => {
      return <RequestRow
          key={index}
          id={index}
          request = {request}
          address = {this.props.address}
          approversCount = {this.props.approversCount}
        />
    });
  }

  render(){


    const {Header,Row,HeaderCell,Body} = Table;

      return (
        <Layout>
            <h3>Requests</h3>
            <Link route ={`/campaigns/${this.props.address}/requests/new`}>
                <a>
                  <Button primary
                      content = "Add Request"
                    />
                </a>
            </Link>

            <Table unstackable>
                <Header>
                  <Row>
                      <HeaderCell>ID</HeaderCell>
                      <HeaderCell>Description</HeaderCell>
                      <HeaderCell>Amount</HeaderCell>
                      <HeaderCell>Recipient</HeaderCell>
                      <HeaderCell>Approval Count</HeaderCell>
                      <HeaderCell>Approve</HeaderCell>
                      <HeaderCell>Finalize</HeaderCell>
                  </Row>
                </Header>
                <Body>
                    {this.renderRow()}
                </Body>
            </Table>

        </Layout>
      );

  }
}


export default RequestIndex;
