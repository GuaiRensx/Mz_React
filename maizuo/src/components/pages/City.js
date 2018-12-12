import React,{Component} from 'react';
import axios from 'axios'
import '../../styles/less/city.less'

export class City extends Component{
    constructor(){
        super();
        this.state={
            citylist: [],
            hotcitylist:[],
            sideNav:[{text:"B",id:1},{text:"C",id:2},{text:"D",id:3},{text:"E",id:4},{text:"F",id:5},{text:"G",id:6},
            {text:"H",id:7},{text:"I",id:8},{text:"J",id:9},{text:"K",id:10},{text:"L",id:11},
            {text:"M",id:12},{text:"N",id:13},{text:"O",id:14},{text:"P",id:15},{text:"Q",id:16},{text:"R",id:17},{text:"S",id:18},
            {text:"T",id:19},{text:"W",id:20},{text:"X",id:21},{text:"Y",id:22},{text:"Z",id:23}]
        }
    }
    componentWillMount(){
        axios.get('cityapi/wapapi/allcitys.do?sign=a2452249d38136c3f7&time=1544254414').then(res=>{
            let obj=res.data;
            let data=Object.values(obj)
            console.log(data)
            this.setState({
                citylist:data,
                hotcitylist:data[0],
            });
        });
    }
    render(){
        return <div className="citylist">
            <div className="citylist-header clearfix">
                <div className="citylist-header-top">
                    <div className="back "><i className="iconfont icon-guanbi"></i></div>
                    <div className="title"><span>当前城市 -</span></div>
                </div>
                <div className="search-city-input">
                    <div className="input-wrap">
                        <i className="iconfont icon-search"></i>
                        <input type="text" placeholder="输入城市名或拼音" className="search-input"></input>
                    </div>
                </div>
            </div>
            <div className="mint-indexlist city-index">
                <ul className="mint-indexlist-content">
                <div className="recommend-city">
                    <div className="gprs-city">
                        <div className="city-index-title">GPS定位你所在城市</div>
                        <span className="gps-city">广州</span>
                    </div>
                    <div className="hot-city">
                        <div className="title">热门城市</div>
                        <ul className="clearfix">
                           {this.state.hotcitylist.map(hotcity=>{
                               return <li key={hotcity.id?hotcity.id:""}>{hotcity.name}</li>
                           })}
                        </ul>
                    </div>
                </div>
                    <li className="mint-indexsection city-index-section" >
                        <p className="mint-indexsection-index">A</p>
                        <ul className="clearfix">
                            <li>鞍山</li>
                            <li>安庆</li>
                            <li>安阳</li>
                            <li>安阳</li>
                        </ul>
                    </li>
                </ul>
                <div className="mint-indexlist-nav">
                    <ul>
                       {this.state.sideNav.map(side=>{
                           return  <li key={side.id}>{side.text}</li>
                       })}
                    </ul>
                </div>
            </div>
     </div>
    }
}