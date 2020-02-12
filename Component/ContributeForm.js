import React,{Component} from 'react';
import {Form,Input,Message,Button} from 'semantic-ui-react';
import Campaign from '../Ethereum/Campaign';
import web3 from '../Ethereum/web3';
import {Router} from '../routes'


class  ContributeForm extends Component {

  state = {
    value : '',
    loading : false,
    errMsg : ''
  }

   onSubmit = async (event) => {
    event.preventDefault();
    const campaign = Campaign(this.props.address);

    try{

      const accounts = await web3.eth.getAccounts();

      this.setState({loading:true});

      await campaign.methods.contribute().send({
        from : accounts[0],
        value : web3.utils.toWei(this.state.value,'ether')
      });

      Router.replaceRoute(`/campaigns/${this.props.address}`);

    }catch(e){
        this.setState({errMsg : e.message});
    }

    this.setState({loading:false});

  }

  render(){

    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errMsg}>
        <Form.Field>
          <label>Amount to Contribute </label>
          <Input
              label = "ether"
              labelPosition ="right"
              value = {this.state.value}
              onChange = {(event)=>this.setState({value:event.target.value})}
          />
        </Form.Field>
        <Button primary
        type = "submit"
        loading = {this.state.loading}
        content = "Contribute"
        />

        <Message
        className="errorMessage"
           error
           header='oops!'
           content = {this.state.errMsg}
         />

      </Form>
    )

  }
}

export default ContributeForm
