import React, { Component } from 'react';
import { Tabs } from 'antd-mobile';
import { Banner } from '../common/Banner';
import { Route, NavLink, Redirect, Switch, withRouter, Link } from 'react-router-dom';
import { MovieOnInfoList } from '../common/MovieOnInfoList'
import { ComingList } from '../common/ComingList'

export class Moive extends Component {
    constructor() {
        super();
        this.state = {
            tabs: [
                {
                    title: '正在热映',
                    path: '/movieOnInfoList'
                },
                {
                    title: '即将上映',
                    path: '/comingList'
                },
            ],
            gundong: 666,
            headerStyle: {},
            listStyle: { position: "fixed", top: 209 }
        }
        this.TanClick = this.TanClick.bind(this);
        this.cityClick=this.cityClick.bind(this);
    }
    cityClick(){
    //    this.props.history.push("/city");
    this.props.history.push("/detail");
        console.log(this.props);
    }
    
    TanClick(tabs, idx) {
        //改变url地址
        //用来跳转的使用pathmo\
        //用来进行匹配的使用url
        let { history, match } = this.props;
        let url = match.path + tabs.path
        history.push(url);
    }
    componentWillMount() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }
    componentWillUnmount(){
        window.removeEventListener('scroll', this.handleScroll.bind(this));
    }
    handleScroll() {
        if (window.scrollY >= 200) {
            this.setState(
                { gundong: 888 }
            );
            setTimeout(() => {
                console.log(this.state.gundong)
            }, 70)
        }
        else if (window.scrollY <= 200) {
            this.setState(
                { gundong: 8888 }
            );
        }
    }

    render() {
        let { match } = this.props
        return <div className="moive">
                <div className="city-fixed" onClick={this.cityClick}>
                    <span className="">广州</span>
                    <i className="iconfont icon-down"></i>
            </div>
            <Banner ></Banner>
            <div className="list" >
                <div className="header" style={{position:(this.state.gundong=="888"?"fixed":"relative"),zIndex:88,top:0}}>
                    {
                        (() => {
                            if (this.state.gundong == "888") {
                                return (
                                    <div className="moive-header"  >
                                        <div className="moive-header-city fl">
                                            <span>广州</span>
                                            <i className="iconfont icon-down"></i>
                                        </div>
                                        <div className="moive-header-content fl">电影</div>
                                    </div>
                                )
                            }
                            else if (this.state.gundong != "888") {
                                return
                            }
                        })()
                    }
                    <Tabs
                        tabs={this.state.tabs}
                        onChange={(tabs, index) => { }}
                        onTabClick={this.TanClick}
                        style={this.state.listStyle}
                    >
                    </Tabs>
                </div>
                <Switch>
                    <Route path={match.url + "/movieOnInfoList"} component={MovieOnInfoList} />
                    <Route path={match.url + "/comingList"} component={ComingList} />
                </Switch>
            </div>
        </div>
    }
}