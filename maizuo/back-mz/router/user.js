const express=require('express');
const Router=express.Router();
const mail=require('../mail.js');
const util=require('../utils/util.js')

const userModel=require('../model/userModel.js');


//账号验证
Router.post('/checkname',(req,res)=>{
	let {username}=req.body;
	userModel.find({username})
	.then((data)=>{
		if(data.length>0){
			res.send(util.sendData(-1,'该用户已注册',null))
		}else{
			res.send(util.sendData(0,'可以注册',null))
		}
	})
})
//邮箱验证码
	Router.post('/getcode',(req,res)=>{
	let {email}=req.body
	if (!email||email=="") {return res.send(util.sendData(-1,'参数错误',null))}
    let num1=(parseInt(Math.random(0,1)*10000)).toString()
    //生成验证码
	mail.sendmail(email,num1)
	.then((resolve)=>{
		obj[email]=num1
		//保存验证码信息
		res.send(util.sendData(0,'验证码已发送',null))
	})
	.catch((err)=>{
//		console.log(err)
		res.send(util.sendData(-1,'验证码发送失败',null))
	})
})
//注册
Router.post('/reg',(req,res)=>{
	let {username,pass,code}=req.body;
//	userModel.find({username})
	if(obj[username]!==code){return res.send(util.sendData(-1,'验证码错误',null))}
	userModel.insertMany({username,pass})
	.then((data)=>{
		res.send(util.sendData(0,'注册成功  请登录',null))
	})
	.catch((err)=>{
//		console.log(err)
		res.send(util.sendData(-1,'注册失败',null))
	})
})

	//登录
let obj={}
Router.post('/login',(req,res)=>{
	let {username,pass}=req.body
	userModel.find({username,pass})
	.then((data)=>{
//		console.log(data)
		if(data.length>=1){return res.send(util.sendData(0,'登录成功',null))}
		res.send(util.sendData(-1,'登录失败',null))
	})
})
module.exports=Router