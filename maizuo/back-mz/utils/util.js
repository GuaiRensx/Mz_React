function sendData(err,msg,data){
//	let data='暂无数据' ||data;
	return{
		err:err,
		msg:msg,
		data:data
	}
}
//构建返回数据
module.exports={sendData}
