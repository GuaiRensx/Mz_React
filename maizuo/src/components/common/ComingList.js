import React,{Component} from 'react';
import axios from 'axios'
import '../../styles/less/ComingList.less'

export class ComingList extends Component{
    constructor(){
        super();
        this.state={
            comingList: []
        }
    }
    componentWillMount(){
        axios.get('/mzapi/ajax/comingList?ci=113&token=&limit=10').then(res=>{
            let data=res.data;
            this.setState({
                comingList:data.coming
            });
        });
    }
    render(){
        return <div className="ComingList">
             <ul>
                {this.state.comingList.map(coming=>{
                    return <li key={coming.id}>
                    <div className="moiveInfo">
                        <a>
                            <div className="moiveImg fl"><img src={coming.img.replace(/w\.h/g,"128.180")}></img></div>
                            <div className="fileInfo fl">
                                <div className="title">
                                    <span className="name">{coming.nm}</span><span className="version">{coming.version||"2D"}</span>
                                </div>
                                <div className="star">
                                    <span>主演：{coming.star}</span>
                                </div>
                                <div className="area"><span >{coming.rt}上映</span></div>
                            </div>
                            <div className="buy fl">预售</div>
                        </a>
                    </div>
                </li>
                })}
            </ul>
        </div>
    }
}