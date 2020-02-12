import React,{Component} from 'react';
import {Form,Button,Message,Input} from 'semantic-ui-react';
import Campaign from '../../../Ethereum/Campaign';
import web3 from '../../../Ethereum/web3';
import Layout from '../../../Component/Layout';
import {Router,Link} from '../../../routes';


class NewRequest extends Component {

  state = {
    desc : '',
    value : '',
    recipient : '',
    loading : false,
    errMsg : ''
  }

  static async getInitialProps(props){

    return{
      address : props.query.address
    }
  }


  onSubmit = async (event) => {
    event.preventDefault();

    const campaign = Campaign(this.props.address);


    try {

      this.setState({loading:true,errMsg:''});

      const accounts = await web3.eth.getAccounts();

      await campaign.methods.createRequest(
              this.state.desc,
              web3.utils.toWei(this.state.value,'ether'),
              this.state.recipient).send({
                from :accounts[0]
              });

      Router.pushRoute(`/campaigns/${this.props.address}/requests`);

    } catch (e) {

      console.log(e);

      this.setState({errMsg:e.message});

    } finally {
    }

    this.setState({loading:false});

  }

  render(){

      return(
        <Layout>
        <Link route ={`/campaigns/${this.props.address}/requests`}>
          <a>
            <Button primary
              icon = "arrow circle left"
              content = "Back"
            />
          </a>
        </Link>
        <h3>Create a Request</h3>
          <Form onSubmit={this.onSubmit} error={!!this.state.errMsg}>
            <Form.Field>
              <label>Description</label>
              <Input
              value = {this.state.desc}
               onChange ={ (event) => {this.setState({desc:event.target.value})} }
              />
            </Form.Field>
            <Form.Field>
              <label>Value in Ether</label>
              <Input
              value = {this.state.value}
                onChange ={ (event) => {this.setState({value:event.target.value})} }
              />
            </Form.Field>
            <Form.Field>
              <label>Recipient</label>
              <Input
              value = {this.state.recipient}
                onChange ={ (event) => {this.setState({recipient:event.target.value})} }
              />
            </Form.Field>
            <Button primary
            loading = {this.state.loading}
              content = "Create Request"
            />
            <Message
               error
               header='oops!'
               content = {this.state.errMsg}
             />

          </Form>
      </Layout>
      );

  }
}

export default NewRequest;
