import React, { Component } from 'react';
import { Route, NavLink, Redirect, Switch, withRouter } from 'react-router-dom';

import './icon-font/iconfont.css';

import 'antd-mobile/dist/antd-mobile.css';
import { TabBar } from 'antd-mobile';
import Axios from 'axios';
import './styles/less/App.less'

import { Moive } from './components/pages/Moive'
import { My } from './components/pages/My'
import { Shop } from './components/pages/Shop'
import { Cinema } from './components/pages/Cinema'
// import {City } from './components/pages/City'
import {Detail } from './components/pages/Detail'

//配置baseUrl
Axios.defaults.baseURL='http://localhost:3333'

class App extends Component {
    constructor() {
        super();
        this.state = {
            tabs: [
                {
                    title: '电影',
                    path: '/moive',
                    selectedIcon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAMAAADyHTlpAAAA8FBMVEVHcEz/YRb/Xxf/YBb/Xxf/Yhj/////Xxf/aBf/gID/YBb/Xxf/ZjP/YBf/YBj/YRf/YBb/YBb/Xxb/Yhj/YBf/Xxf/YBb/YRf/Zhr/YBj/Xxf/YBf/YBb/YBf/ZBf/YBf/YBj/Xxn/Xxf/YBb/Zh//Xxf/YRf/YBf/Xxb/Xxf/aBz/bST/Xxf/YBj/Xxf/Xxf/axv/Zhr/ZBb/YBf/YBb/Xxb/Xxf/Xxf/gCv/Xxf/YRj/YBf/ZiL/YBf/Xxb/YBf/Xxb/YBb/YBf/YBz/Xxf/Xxf/YRf/YBf/YBb/YBf/Yxr/Xxb/Xxf/Yh3/YBf/Xxbkz5BLAAAAT3RSTlMAZ25Q7EEBsRYC+oYF3SBM/X3zVsD2xXEKd466ok0hv0oz05UZZlmy5swbDuFA62MTFBek71vuvgb5P+oP4vK0tuWoJcuz69/arzHxexpaQ/WkmwAAAeZJREFUOMuVVVd74kAMHNzWhpiYYjAthGJagNxBCCXlei/z///NPTiJ18Y5bL3trL6VNCuNgIh56mA8newn0/FA9fC6WSPhMjRXjKxXPC/7pFNrdHrD3bDXadQcsn+Z5HjRJW1/JSEr3ya7F0eeB41L5SwGnilLaocYmMtTXCXEuhfM56KeZCG5BKtAyr6LPK/DU7G0LhXD4zXzi7AijYXw6rxMsnweAgVqL7V1KYyXi7ca25s2tTdhDoLdZz55J1VUYQtAi5UQuloy4NfqU5HyrrMJoMm6hCnsWwDwl7bMp865CfOBusyvzREACPoyO0aVt9sbVg0Z9CkAeK5jRpg0BUkRwxzXA1TW4rTP9FkcqlEFBmw8sVSp65GoMPR65YmzBgfAmJ2AeY1kVY5rVklqwV90OAam7AFAscxW84FCchWcN1ssFwGgxykw4RAASmwD5g3DLGe8NYE2SwAw5ATYcwcAa24AbCU6dW4BbLgGgB33R6/++c+rGXLNwEAGXjP8luc6q5M9sHJcL2Vn5YJ6R0n9Ok/s1wxTcHq27p9nC+hSWOkmNosOnFSXQ0yzjFSalUUJgYXGuwR9/cpfv38mq3aks3w7WArflU+nd8Hj4+cvP76RfJ9uw1jqxw/vjstIu7dO2D/eRmZUEGhCxQAAAABJRU5ErkJggg==',
                    Icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAMAAADyHTlpAAAA8FBMVEVHcEx5foN7fYR5gIN5fYN6foX///95fYOAgIuAgP96foN5fYOZmZl5foKAgId8gIN6foJ6foN6gIJ6foJ6foJ5fYN6foN6foOAgJl6foN5foN6foJ6foN7foR8g4N5fYN8gIN9fYJ6foN6f4J6hYV7fYJ7foR6foJ6fYN5fYJ7hISAgJJ5foJ8gIN6foJ5foOGhoaAgIx6hYV5foN6foJ7foR6foJ5fYOAgKp6foJ5fYZ6fYOIiIh6fYN5fYN6foJ6foJ5foJ5foN8g4N6foN5fYN6fYN5foJ7fYN6fYN6foN6fYN9goKAgIl6gIJ5fYJTmjlkAAAAT3RSTlMAZ25Q7EEBsRYChvoF3SBM/X1W88D2xXEKd6K6jk0hv0oz05UZZlmy5swbDuFA62MTFBek71u+7gb5P+oP4vK0tuWoJcuz2t/r8XuvMRpaxb0kCQAAAedJREFUOMuVVVd74kAMHFxYG2JiisG0OBTTAuQOAgFSrvcy///f3IOTeG2cw9bbzupbSbPSCIiYqw7G08l+Mh0PVBevmzkSDkNzxMh8xfOyT9r1Zrc33A173WbdJvuXSY4XHmn5KwlZ+RbpXRx5HjQulbMYeKYsqR1iYK5IcZUQ616wmIt6koXkEswCKfsuirwOT6XyulwKj9csLsKKNBbCq/Mqyep5CBSovdTmUeRfLt5qbG1a1N6EOQh6z3zyTqqowjaANishdLVkwK/ZpyLl3WAHQIcNCVPYNwHgLy2ZT51zA8YDdZlfiyMAEPRldvI13m5vWMvLoE8BwHVsI8KkIUiKGGY7LqCyHqd9ps/iUJ0qMGDziaVKQ49ERV5vVJ44a3IAjNkNmNdI1uS4Ro2kFvxFl2Ngyh4AlKpsdx4oJFfBeafNagkAepwCEw4BoMwWYNwwzHLGWwNosQwAQ06APXcAsOYGwFaiU+cWwIZrANhxf/Tqn/+8miHXDAxk4DXDb7mOvTrZAyvbcVN2Vi6od5TUr/PEfs0wBadn6/55tgCPwkw3sVl04KS6HGKalU+lWVmUEFhovEvQ1+/88fN3smpHOsu3gqXwVfl0ehc8Pn7+8usbyffpNoypfvzw7riMtHvrhP0D3epmVPfhgXsAAAAASUVORK5CYII='
                },
                {
                    title: '影院',
                    path: '/cinema',
                    selectedIcon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAMAAADyHTlpAAAA6lBMVEVHcEz/YRf/Zh//YBf/ZjP/gID/Xxb/Xxb/Xxb/Xxb/YBb/YBz/bST/YRj/Xxf/Xxf/Xxf/Xxf/Yxn/YRb/cRz/YBb/YBj/Xxb/Xxf/YBf/YBb/ZBv/YBb/Yhb/YBf/Xxf/Yhb/YBf/YBf/YBf/Xxj/Yxz/YBn/YBb/YBj/Xxf/Yhf/Zhr/YBf/Xxf/YBf/YBf/YBf/Xxn/bST/Zhr/Xxb/YRj/YBf/YRj/Xxb/YBf/YBb/////YBb/Xxf/aR7/YBf/YBf/Xxf/Yhr/YRn/YBf/dBf/YRj/YBb/YBj/YBf/Xxf/Yhj/ZiL/XxaDOMqEAAAATXRSTlMAfBmyBQLz/ub7rCUOX6Z7+cs+iQnENdz0mLccilE43jnf7cB2JD39d7NEFKTU+Ly9MwcK8VRvFcPK7wFyxhGc95knR00LdOdKpcxeD+qqMm4AAAEbSURBVDjL7dLVbsNAFATQMa4dO2SHmbHMzNzO//9OHxKnSWNIH6JKVed1j7R39w6wrjiKwdAYijORkmBk+kkAcESqI4dfKw9S/R4AhZ3oGQdUABiUo6lMAwC5ytPJf7p+qsXyucXzXD6m+dIkWXiYg+cXKTLpR2umKJHXV57sXZIxYdaWqV1nBU83LNzeH6v7u0en5PMLKqzbSzTBtApYpVmbz6RHQH3j63cap24BAO7ckwNza3PjcA8AYOl8X6RdnXH/X4pT785TNc1E0I9OJptRl007iH406X7RkTAbwYtqmGLk0bFBKWypEo3xlA7Z1sKo1uZwStkqh3el3KJHq1G9qnq0GN3BIglgJ5uJppnsNv5suGJ+Rn85nzMoZaO8dqcoAAAAAElFTkSuQmCC',
                    Icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAMAAADyHTlpAAAA6lBMVEVHcEx5fYR6hYV6foKZmZmAgP96foJ5fYN6fYN6foJ6foJ8g4N7foSAgJJ5foN6foN6foJ6foN7gIR7f4KOjo56foJ9fYd6fYN5fYN6foN5fYN6foN7foSAgIl7gIR6fYN9fYZ5foJ6foJ6foJ5fYSAgId5fYZ6foN6foJ5fYOAgIx8gIN5foN6foJ5fYN5gIN5fYN6foJ9fYKAgJl5fYN6foOSkpJ5hoZ6foJ5foJ6foN5foJ7fYT///97foOHh4eLi4t6foJ8g4N7foR6foV6fYJ7fYR5foJ8gIN5fYJ6gIJ6fYOIiIh5fYIRyTyJAAAATXRSTlMAfBmyBQLz/ub7rCVfDqZ7+cs+iQnENdz0mLeKURw43jnfwO12JD13/bMURKTx1FS9vDMK+G8HFe/Kw8ZyAZwRC/cnTUeZdOdKzF6lD3GigGEAAAEbSURBVDjL7dLVbsNAFATQMa4dO2SHmbHMzNzO//9OHxKnSWNIH6JKVed1j7R39w6wrjiKwdAYijORkmBkBkkAcESqI4dfK/dTgx4AhZ3oGftUABiUo6lMAwC5ytPJf7p+qsXyucXzXD6m+dIkWbifg5cXKTLpR2umKJFX157snZMxYdaWabzOMp5uWXh8OFb39w5PyecXlFmPL9EE0ypglWZtPpFuAPWV79+pTd0CANy5Z5vmwdbG9hEAwNL5tki7Om3/X7Kpd+epmmYi6Ecnk82oy2Y8iH406X7RsTAbwYtqmGLs0ZFBKWypEo3RlA7Z0sKo1uJwStmuhnel2qZHK1G9qni0GN3BIglgJ5uJppnsLv5suGJ+Rn85ny6nZaNDXMy3AAAAAElFTkSuQmCC'
                },
                {
                    title: '9.9拼团',
                    path: '/shop',
                    selectedIcon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAMAAADyHTlpAAAAPFBMVEVHcEx5fYN5fYZ6foJ6foJ6foN6hYV5fYN5hoZ6fYN6foJ5fYR6foJ5fYN6foOAgIx6foN7gIR6hYV5fYKbhixrAAAAE3RSTlMAtT39sncZ1BXm+Xq0/nEUez4XrXVzfQAAALlJREFUOMu91UkOwyAMBVDmhMyt73/XToEQiI2R2nqF0BMYJD5C/LCU8YCVNyqR4wxU6THK2zxYh+7o7KDjugYs2Z4FE4YeHEkd+DAEqJz6ABiVkk3j/N+oLK9f8unEaKDvgNnrU3Y8+pI9i74l67I+kkN3yaBB1mmUVXrIGk1khaaSpidJ0rOkaCYJmkucFhKlayFRupzk/h6u6X1ZRU4n9ottSJcL2hBvDaGpNDuKxaa5Ad/ybXy7HjOcHHXQm/ROAAAAAElFTkSuQmCC',
                    Icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAMAAADyHTlpAAAAPFBMVEVHcEx5fYN5fYZ6foJ6foJ6foN6hYV5fYN5hoZ6fYN6foJ5fYR6foJ5fYN6foOAgIx6foN7gIR6hYV5fYKbhixrAAAAE3RSTlMAtT39sncZ1BXm+Xq0/nEUez4XrXVzfQAAALlJREFUOMu91UkOwyAMBVDmhMyt73/XToEQiI2R2nqF0BMYJD5C/LCU8YCVNyqR4wxU6THK2zxYh+7o7KDjugYs2Z4FE4YeHEkd+DAEqJz6ABiVkk3j/N+oLK9f8unEaKDvgNnrU3Y8+pI9i74l67I+kkN3yaBB1mmUVXrIGk1khaaSpidJ0rOkaCYJmkucFhKlayFRupzk/h6u6X1ZRU4n9ottSJcL2hBvDaGpNDuKxaa5Ad/ybXy7HjOcHHXQm/ROAAAAAElFTkSuQmCC'
                },
                {
                    title: '我的',
                    path: '/my',
                    Icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAMAAADyHTlpAAABuVBMVEVHcEx6foKqqqp5fYOAgJV6foN5hob///+AgP96foKAgJ+AgJl6fYOAgId6foJ6foJ5fYN6fYN6foJ5fYN6foJ5fYN7foR6fYN5fYaSkpJ6gIJ6gIJ6foN5fYOAgIp5gIZ6foN5foN5foN7fYR6fYSAgL97foR5foJ9fYJ8gIN6fYSAgKqAgJJ7f4J6foN6foN7gIR9fYZ6foN6f4J5fYN5fYKAgI56foN6foJ5gIN5fYR5fYN6foN5fYOAgIl5fYR6fYN6gIJ6gIJ7hIR5fYOOjo55f4J8gIN7gIR6fYN8gIN5foKLi4t7gIR6fYR6foJ6foJ5fYZ5fYN9goKAgI95gIZ6foV6gIV7f4J6foN6foN5foN5foKAgIx6foN7foR7gISZmZl6fYN5foJ5fYN5fYN6fYN6hYV6foN5fYN6fYN6fYN7foR7f4J6gIJ5fYZ5fYN6foN6foN5foJ5foKAgId5foN7foR6fYN5fYR5fYN7f4J6foN6foV6foJ7foR5f4J5gIN6foJ6foN6foN5fYN6foKJiYl7gIR5foJ6f4J7hIR6gIV5foN6foV6foN6foJ7foN5fYIvwsurAAAAknRSTlMA8wP4DIoVAQLvCAriJPmyvd62u9X6Veo7B15ggP4YKNFnaWifBFvnM06dBg6Fy38+N4aV7MwSmP1UdvBt9hx41mRcHfIJj0o6o0ThCzab9cQ/0C8QKksygZR3Y98UfVk8Bdjb7tTaF4jOoeRfh2I9tXuO5cggZU3gfPyJx0G+U41S7cmqv6wNOMqXGyyiSdPAnBplCB8AAAHsSURBVBgZpcFldxpBAAXQByzs4hKSkABxd3d317q7u7u79/3ispwUZpeZDz29F//ja83v2M7PX99rK5FR8aXK8dn9ERIv36b517MZ4/UbmlbXYbd+j3R8qP6x+227dtlLxp/w3a726T2ja7C6EeLdB2XYM59cJR8jw9hiChbXyTt+COZ7biNrhRGIaum6BrlZBiDoKuZJKKwwgjxnnD1QMLaYQt5Rnj0NOX2D0TXkHWMJ5PQNbi4h7yADOuTc3HwOwSEehsJTvoKoiAeg8JAvIIpzPxTu8xFEXu6DgkYHRCGWQaGMLogaWQGFCjZC1MGbUOhiB0S9HIHCCHshKuGUjqyG48i62IAsfYolEPlGuQjTEZ45hYylq0zBtMhRHywWGIHJs0OeX75ymbwwC1OEC7DyOFgOU+uJUmacu+SHqZwOD2ySDCWQVZ+YKd9uRVYixCQKuFkahE2wlG4UMsKcm4bF9BzDBiS0MHlrAjkTMTKsQUqfHKe3DXvavByf1KHgrGIncjpZ5YTKGKM+5PiiHIOCx8tmCJrp9UCuhTFYxNgCqe60KwiLoCvdDQmjn+2waWe/gULVDPhh4w+wGgUG+jiMAsPsG4DdIIsgUcRB2DQNFVdCorJ4qAlWdXRDys06WNXXaJDSapz4V38AjYJ1L4JkBvkAAAAASUVORK5CYII=',
                    selectedIcon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAMAAADyHTlpAAABuVBMVEVHcEz/Xxb/qlX/YBf/aiv/YBb/YRj/////gID/YBb/YCD/Zhr/YBf/Yxz/Xxf/YBf/YBf/Xxf/Xxb/Xxf/YBf/YBb/YBj/YBf/bST/Xxr/Yhj/YBj/YBj/YCD/Xxb/YBr/Xxf/YRb/YRj/YBb/YBb/gED/Xxb/YBb/Yhf/Xxn/bST/YBf/gCv/YBf/YBb/Xxf/YBb/Xxf/YRf/Yxn/YBb/YRj/Yxz/YBf/Xxf/Xxf/Xxj/Xxf/YBf/YBf/YBb/ZBv/Xxf/YRf/YBb/cRz/YRb/YRr/YBf/YBj/YRr/Xxf/Yhf/Xxf/Yxj/dBf/Xxf/YBf/YBb/YRj/YBb/Yhv/YRj/YCD/YRj/Xxj/YBj/YBb/YRr/YBf/Xxf/Zhr/YBb/Yhr/ZjP/Xxb/YBb/YRf/ZBb/Xxf/Xxf/Xxb/YBb/Xxb/YBf/Xxb/Xxf/YBf/YBf/YBf/YBn/YRj/Xxf/YBf/YBb/YBj/YBf/YBf/YBf/Xxb/YRb/YRf/YBf/Xxn/YBj/Yhj/Xxf/YBn/YBf/Xxf/YBf/YBf/Yif/YBb/YBf/YBj/YBf/aBz/YBb/Yxf/Yhj/YBf/YBf/Xxf/XxYGQSJMAAAAknRSTlMA8wP4DIoVAQLvCAriJPmyvd62u9X6VeoHO15ggBj+KNFnaWifBFvnTjMOnQaFf8uVhjc+/VQSmMzsdvZ4bfAc1mTyCVwdj0o6o0ThNgub9cQ/0C8qEIFLd5Qy32MUfTwF29hZF9Tu5NrOiKF7tWKHPV+OyOUgZU3g/Il8x1ONQb5S7cmqvw2sOJfKG6IsSZzA05paHMAAAAHsSURBVBgZpcFldxpBAAXQByzs4hKSkABxd3d317q7u7u79/3ispwUZpeZDz29F//ja83P2M7vX99qK5GR/lzl+OL+AInnbyv417M54/UbmlbXYLd2l3R8rP6x+327dtlLxh/z3a726T2j67C6EeK9BwnsmU2ukk+RYWwxBYub5B0/BLPd15C1wghEtXTdhtw8AxD0FvMsFFYYQZ4zzm4oGFtMIe8YT5+CnL7B6DryjrIEcvoGN5eQd4QBHXJubr6E4AAPQ+EJX0BUxINQeMhXEMW5Dwr3+QgiL/dDQaMDohATUEjQBVEj01BIsxGiTt6CQi87IeriCBRG2AVRCad0ZDUcR9a5BmTpUyyByDfBRZgO8cxJZCxdZAqmRU74YLHACEyeHfL88tXL5KV5mCJcgJXHwXKY2k6UMuPCFT9M5XR4YJNkqAxZ9WVz5dttyCoLMYkCbpYGYRMspRuFjDBnpmExPcOwAQktTF6fRM5kjAxrkNLHRultwZ4WL0fHdCg4q9iBnA5WOaEyzqgPOb4ox6Hg8bIJgiZ6PZBrZQwWMbZCqqfCFYRF0FXRAwljiO2waeeQgULVDPhh4w+wGgUGhtmPAv0cHoDdIIsgUcRB2DT3FVdCorK4rxlWdXRDys06WNXXaJDSapz4V38Alz11L/iRrcAAAAAASUVORK5CYII='
                }
            ],
            currentTab: 0
        }
    }
    tabClick(idx, path) {
        this.setState({
            currentTab: idx
        })
        //编程式导航
        //获取history的方式
        //1、通过Route
        //2、通过withRouter高阶组件
        if(idx==0){
            this.props.history.push(`${path}/movieOnInfoList`);
        }else{
            this.props.history.push(path)
        }
    }
    componentWillMount(){
        //获取hash值
        let hash=window.location.hash.slice(1);
        console.log(hash);
        //找出对应索引值
        let currentTab = 0
        this.state.tabs.some((item,idx)=>{
            if(hash=="/moive/movieOnInfoList" || "/moive/comingList" ){
                currentTab=0
            }else{
                currentTab=idx;
                return item.path===hash
            }
        });   
        this.setState({
            currentTab
        })
    }
    render() {

        return <div className="containers">
        <div className="content">

        <Switch>
                <Route path="/detail" component={Detail} />
                {/* <Route path="/city" component={City} /> */}
                <Route path="/moive" component={Moive} />
                <Route path="/cinema" component={Cinema} />
                <Route path="/shop" component={Shop} />
                <Route path="/my" component={My} />
                <Redirect from="/" to="/moive/movieOnInfoList" exact></Redirect>
            </Switch>
        </div>
            <TabBar
                tintColor="#ff5f16"
                unselectedTintColor="#797d82"
                noRenderContent={true}
            >
                {
                    this.state.tabs.map((tab, idx) => {

                        return <TabBar.Item
                            icon={
                                <div className="aa"  style={{
                                    width: '22px',
                                    height: '22px',
                                    background: `url(${tab.Icon})  center center /  21px 21px no-repeat`
                                }}
                                />
                            }
                            selectedIcon={
                                <div className="aa" style={{
                                    width: '22px',
                                    height: '22px',
                                    background: `url(${tab.selectedIcon})  center center /  21px 21px no-repeat`
                                }}
                                />
                            }
                            title={tab.title}
                            key={tab.path}
                            selected={this.state.currentTab === idx}
                            onPress={this.tabClick.bind(this, idx, tab.path)}
                        >
                        </TabBar.Item>
                    })
                }
            </TabBar>
        </div>
    }
}
//利用高阶组件传递路由参数
App = withRouter(App);
export default App;
