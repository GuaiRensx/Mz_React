import React, { Component } from 'react';
import axios from 'axios'
import '../../styles/less/now.less'

export class MovieOnInfoList extends Component {
    constructor() {
        super();
        this.state = {
            nowlist: []
        }
    }
    componentWillMount() {
        axios.get('/mzapi/ajax/movieOnInfoList?token=').then(res => {
            let data = res.data;
            console.log(data);
            this.setState({
                nowlist: data.movieList
                
            });
        });
    }
    render() {
        return <div className="movieOnInfoList">
            <ul>
                {this.state.nowlist.map(movieList=>{
                    return <li key={movieList.id}>
                    <div className="moiveInfo">
                        <a>
                            <div className="moiveImg fl"><img src={movieList.img.replace(/w\.h/g,"128.180")}></img></div>
                            <div className="fileInfo fl">
                                <div className="title">
                                    <span className="name">{movieList.nm}</span><span className="version">{movieList.version||"2D"}</span>
                                </div>
                                <div className="grade clearfix">
                                    <span className="fl">观众评分</span> <p className="mark fl">{movieList.sc}</p>   
                                </div>
                                <div className="star">
                                    <span>主演：{movieList.star}</span>
                                </div>
                                <div className="area"><span >{movieList.showInfo}</span></div>
                            </div>
                            <div className="buy fl">购票</div>
                        </a>
                    </div>
                </li>
                })}
            </ul>
        </div>
    }
}
