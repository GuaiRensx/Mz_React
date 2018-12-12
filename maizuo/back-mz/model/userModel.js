const mongoose=require('mongoose')

//schema 对象  有几个表就要几个对象
let Schema=mongoose.Schema;
let userSchema=new Schema({
	username:{type:String,required:true},
	pass:{type:String,required:true}
	})
//type 字段类型   required  是否必须

let usermodel=mongoose.model('user',userSchema);
//参数一  集合名字  参数二   schema对象   将schema对象变成model
//usermodel.insertMany({username:'123',pass:'456'})
//.then((data)=>{
//	console.log(data)
//})
//.catch((err)=>{
//	console.log(err)
//})

//usermodel.find()
//.then((data)=>{
//	console.log(data)
//})
//.catch((err)=>{
//	console.log(err)
//})

module.exports=usermodel