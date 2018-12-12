import React,{Component} from 'react';
import axios from 'axios'
import '../../styles/less/cinemas.less'

export class Cinema extends Component{
    constructor(){
        super();
        this.state={
            cinemaList: []
        }
    }
    componentWillMount(){
        axios.get('/mzapi/ajax/cinemaList?day=2018-12-07&offset=0&limit=20&districtId=-1&lineId=-1&hallType=-1&brandId=-1&serviceId=-1&areaId=-1&stationId=-1&item=&updateShowDay=true&reqId=1544152195769&cityId=20').then(res=>{
            let data=res.data;
            console.log(data)
            this.setState({
                cinemaList:data.cinemas
            });
        });
    }
    render(){
        return <div className="cinemaList">
            <div className="cinemas-header">
                <div className="cinmeas-header-top clearfix">
                    <div className="cinmeas-header-top-city fl">
                        <span>广州</span>
                        <i className="iconfont icon-down"></i>
                    </div>
                    <div className="cinmeas-header-top-content fl">影院</div>
                    <div className="cinmeas-header-top-serach fl"><i className="iconfont icon-search"></i></div>
                </div>
                <div className="cinmeas-header-bot clearfix">
                    <div className="cinmeas-header-bot-entireCity fl">
                        <span>全城</span>
                        <i className="iconfont icon-down"></i>
                    </div>
                    <div className="cinmeas-header-bot-lately fl">
                        <span>最近去过</span>
                        <i className="iconfont icon-down"></i>
                    </div>
                </div>
            </div>
            <div className="cinema-list-wrap">
                <ul>
                   {this.state.cinemaList.map(cinemas=>{
                       return <li key={cinemas.id}>
                       <a className="clearfix">
                           <div className="cinema-info-lf fl">
                               <span className="cinema-name">{cinemas.nm}</span>
                               <span className="cinema-address">{cinemas.addr}</span>
                           </div> 
                           <div className="cinema-info-rt fl">
                               <div className="floor-price"><i>￥</i>{cinemas.sellPrice}<span>起</span></div>
                               <div className="cinema-distance">距我{cinemas.distance}</div>
                           </div>   
                       </a>
                   </li>
                   })}
                </ul>
            </div>
        </div>
    }
}