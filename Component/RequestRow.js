import React,{Component} from 'react';
import web3 from '../Ethereum/web3';
import {Table,Button} from 'semantic-ui-react';
import Campaign from '../Ethereum/Campaign';


class RequestRow extends Component{


   onApprove = async(event) =>{

      const campaign = Campaign(this.props.address);
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.approveRequest(this.props.id).send({
        from : accounts[0]
      })

   }

   onFinalize = async(event) =>{

      const campaign = Campaign(this.props.address);
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.finalizeRequest(this.props.id).send({
        from : accounts[0]
      })

   }


  render(){

    const {Row,Cell} = Table;
    const {id, request} = this.props;

    return (

        <Row>
          <Cell>{id} </Cell>
          <Cell>{request.description} </Cell>
          <Cell>{web3.utils.fromWei(request.value,'ether')} </Cell>
          <Cell>{request.recipient} </Cell>
          <Cell>{request.approvalCount} / {this.props.approversCount} </Cell>
          <Cell>
              <Button basic color="green"
                content = "Approve"
                onClick = {this.onApprove}
              />
           </Cell>
          <Cell>
              <Button
                color ="teal"
                content = "Finalize"
                onClick = {this.onFinalize}
              />
          </Cell>
        </Row>

      );
  }
}

export default RequestRow
