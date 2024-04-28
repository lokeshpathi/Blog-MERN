import express from 'express'
import cors from 'cors'
const app = express()
import User from './Models/model.js'
import Post from './Models/model2.js'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import multer from 'multer'
const uploadMiddleware = multer({dest:'./Server/uploads/'})
import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const secret = "afofadsfiahdfglakndfoidkhferupmvi"
const salt = bcrypt.genSaltSync(10)

app.use(cors({credentials:true,origin:"http://localhost:5173"}))
app.use(express.json())
app.use(cookieParser())
app.use('/uploads',express.static(__dirname+'/uploads/'))
console.log(__dirname)
mongoose.connect('mongodb://localhost:27017/UsersAuth')

app.post('/register',(req,res)=>{
    const {username,password} = req.body;
    User.create({username,password:bcrypt.hashSync(password,salt)})
    .then(result=>{
       return  res.status(200).json({username,password})
    })
    .catch(err=>res.status(400).json(err.message))
})


app.post('/login',(req,res)=>{
    const {username,password} = req.body;
    User.findOne({username})
    .then(result=>{
         if (bcrypt.compareSync(password,result.password)){
            jwt.sign({username,id:result._id},secret,{},(err,token)=>{
                if(token) return res.cookie('token',token).json({id:result._id,username})
                else return res.json(err)
            })
         }
         else{
            return res.status(400).json({msg:"wrong password"})
         }
    })
    .catch(err=>res.status(400).json({msg:"username not found"}))
})


app.get('/profile',(req,res)=>{
    const {token} = req.cookies;
    jwt.verify(token,secret,{},(err,info)=>{
        if (err){
            return res.json(err);
        }
        return res.json(info)

    })
})

app.post('/logout',(req,res)=>{
    res.cookie('token','').json({msg:"logout success"})
})


app.post('/post',uploadMiddleware.single('file'),(req,res)=>{
    const {originalname,path} = req.file;
    const fileArray = originalname.split('.');
    const ext = fileArray[1];
    const newPath = path+"." +ext;
    fs.renameSync(path,newPath);

    const {token} = req.cookies;
    jwt.verify(token,secret,{},(err,info)=>{
        if (err){
            return res.json(err);
        }
        const {title,summary,content} = req.body;
        Post.create({
            title,
            summary,
            content,
            cover:newPath.substring(7),
            author:info.id
        })
        .then((response)=>res.json(response))
        .catch(err=>res.json(err.message))
    })
})


app.get('/post',(req,res)=>{
      Post.find().populate('author',['username']).sort({createdAt:-1})
      .then(response=>res.json(response))
      .catch(err=>res.json(err))
 
}) 

app.get('/post/:id',(req,res)=>{
    const {id} =req.params;
    Post.findById(id).populate('author',['username'])
    .then(response=>res.json(response))
    .catch(err=>res.json(err))
})

app.put('/post',uploadMiddleware.single('file'),(req,res)=>{
    let newPath=null;
    if(req.file){
        const {originalname,path} = req.file;
        const fileArray = originalname.split('.');
        const ext = fileArray[1];
        newPath = path+"." +ext;
        fs.renameSync(path,newPath);
    }

    const {token} = req.cookies;
    jwt.verify(token,secret,{},(err,info)=>{
        if (err){
            return res.status(404).json(err);
        }
        const {id,title,summary,content} = req.body;
        Post.findById(id)
        .then(response=>{
            const isAuthor = JSON.stringify(info.id)===JSON.stringify(response.author)
            if (!isAuthor){
                return res.json({msg:"Invalid Author"})
            }
            response.updateOne({
                title,
                summary,
                content,
                cover:newPath?newPath.substring(7):response.cover,
            })
            .then((response1)=>res.json(response))
            .catch(error=>res.json(error.message))
        })
    })
})

app.listen(3000,()=>{
    console.log('Server is running!...')
})