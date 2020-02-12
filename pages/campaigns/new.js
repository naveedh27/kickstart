import React,{Component} from 'react';
import {Button,Input,Form,Message} from 'semantic-ui-react';
import Layout from '../../Component/Layout';
import factory from '../../Ethereum/factory';
import web3 from '../../Ethereum/web3';
import {Router} from '../../routes';


class CampaignNew extends Component{

  state = {
    minContrib : '',
    errorMsg : '',
    isLoading : false
  }

  onSubmit = async (event) =>{
      event.preventDefault();
      try{
        this.setState({isLoading:true,errorMsg:''});
        const accounts = await web3.eth.getAccounts();
        await factory.methods.createCampaign(this.state.minContrib)
              .send({
                from : accounts[0]
              });

        Router.pushRoute('/');

      }catch(e){
        this.setState({isLoading:false});
        this.setState({errorMsg : e.message});
      }

  }


render(){
  return (
    <Layout>
    <div>

        <h3>New Campaigns</h3>
          <Form onSubmit={this.onSubmit} error={!!this.state.errorMsg}>
            <Form.Field>
             <label>Minimum Contribution</label>
            <Input
               action={{ color: 'teal', labelPosition: 'left', icon: 'euro', content: 'Wei' }}
               placeholder=''
               value = {this.state.minContrib}
               onChange = {(event)=>
                 this.setState({minContrib : event.target.value}) }
              />
            </Form.Field>
            <Button type='submit'
              primary
              loading={this.state.isLoading}
              content ='Create Campaign'/>

            <Message
               error
               header='oops!'
               content = {this.state.errorMsg}
             />

         </Form>
        </div>

      </Layout >
  );
}

}


export default CampaignNew;
