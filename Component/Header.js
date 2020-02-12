import React, {Component} from 'react';
import { Menu,Button } from 'semantic-ui-react'
import {Link} from '../routes';


export default  (props) =>  {

    return(
      <Menu style={{marginTop:'10px'}}>
         <Link route="/">
          <a className="item">CrowdCampaign</a>
         </Link>
         <Menu.Menu position='right'>
           <Menu.Item>
             <Link route="/">
              <a className="item">Campaign</a>
             </Link>
           </Menu.Item>

           <Menu.Item>
             <Link route="/campaigns/new">
              <a className="item">+</a>
             </Link>
           </Menu.Item>
         </Menu.Menu>
       </Menu>
    );

  }
