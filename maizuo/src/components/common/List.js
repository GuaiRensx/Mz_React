import React, { Component } from 'react';
import axios from 'axios'
import { Tabs } from 'antd-mobile';
import { Route, NavLink, Redirect, Switch, withRouter } from 'react-router-dom';

import {MovieOnInfoList} from './MovieOnInfoList'
import {ComingList} from './ComingList'
export class List extends Component {
    constructor(){
        super();
        this.state={
            tabs:[
                {
                    title:'正在热映',
                    path:'/movieOnInfoList'
                },
                {
                    title:'即将上映',
                    path:'/comingList'
                }
            ]
        }
    }
    render() {
        console.log(this.props)
        return <div className="list">
            <Tabs tabs={this.state.tabs}
                initialPage={1}
                onChange={(tab, index) => {  }}
                onTabClick={(tab, index) => {  }}
            >
            </Tabs>
            <Switch>
                <Route path="/moive/movieOnInfoList" component={MovieOnInfoList} />
                <Route path="/moive/comingList" component={ComingList} />
            </Switch>
        </div>
    }
}