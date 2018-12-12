import React,{Component} from 'react';
import axios from 'axios'
import '../../styles/less/Detail.less'

export class Detail extends Component{
    constructor(){
        super();
        this.state={

        }
    }
    componentWillMount(){
        axios.get('mzapi/ajax/detailmovie?movieId=249342').then(res=>{
            let data=res.data;
            console.log(data)
            this.setState({
            });
        });
    }
    render(){
        return <div className="film">
            <div className="film-header">
                <div className="back fl"><i className="iconfont icon-fanhui"></i></div>
                <div className="film-name fl">海王</div>
            </div>
            <div className="film-pic">
                <img src="http://p0.meituan.net/movie/c106904da68edd848afd4a320976d051346321.jpg"></img>
            </div>
            <div className="film-info">
                <div className="col clearfix">
                    <div className="flim-title fl">
                        <span className="name">海王</span>
                        <span className="item">3D</span>
                    </div>
                    <div className="film-grade fr">
                        <span className="grade">7.4</span>
                        <span className="grade-text">分</span>
                    </div>
            </div>
            <div className="film-category grey-text">动作 | 奇幻 | 冒险</div>
            <div className="film-premiere-time grey-text">2018-12-07上映</div>
            <div className="film-nation-runtime grey-text">美国   澳大利亚  | 143分钟</div>
            <div className="test grey-text">本片由杰森·莫玛领衔主演，讲述半人半亚特兰蒂斯血统的亚瑟·库瑞踏上永生难忘的征途——他不但需要直面自己的特殊身世，更不得不面对生而为王的考验：自己究竟能否配得上“海王”之名。</div>
            <div className="show"><i className="iconfont icon-down"></i></div>
     </div>
</div>
    }
}