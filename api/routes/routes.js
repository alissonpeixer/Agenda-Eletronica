import bcrypt from "bcrypt";
import Router from "@koa/router";
import { PrismaClient } from '@prisma/client'
import jwt from "jsonwebtoken";
import Validation_creedential from "../module/Validate_creedential.js";

export const router = new Router();
export const prisma = new PrismaClient()


const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);


router.post("/register", async ctx =>{ 
  const reqBody = ctx.request.body
  const password = bcrypt.hashSync(reqBody.password, salt);
  
  const validation = new Validation_creedential(reqBody);

  const validPrisma = await prisma.User.findUnique({where: {email: reqBody.email}}) || await prisma.User.findUnique({where: {username: reqBody.username}})

  if(validPrisma){
    ctx.status = 401
    ctx.body = "Username ou E-mail já em uso!"
    return
  }
  
  if(validation.Email()){
    ctx.status = 401
    ctx.body = "Email invalido"
    return
  }
  if(validation.UserName()){
    ctx.status = 401
    ctx.body = "Username invalido"
    return
  }
  if(validation.Password()){
    ctx.status = 401
    ctx.body = "Senha invalido"
    return
  }


  const createUser = await prisma.User.create({
    data: {
      username: reqBody.username.toLowerCase(),
      email: reqBody.email.toLowerCase(),
      password: password
    }
  })

  const acessToken = jwt.sign({
    data: createUser.userId
  }, process.env.JWT_SECRET_KEY , { expiresIn: '3h' });


  ctx.body = {
    email: createUser.email,
    username: createUser.username,
    acessToken
  }
})


router.get('/login', async ctx =>{
  const [,token] = ctx.request.header.authorization.split(" ");
  const [login, passwordBase] = atob(token).split(':');
  const user = await prisma.User.findUnique({where: {username: login}}) || await prisma.User.findUnique({where: {email: login}})
  
  if(!user){
    ctx.status = 401;
    ctx.body = "Login error"
    return
  }

  const password = bcrypt.compareSync(passwordBase, user.password);

  if(!password){
    ctx.status = 401;
    ctx.body = "Senha errada!"
    return
  }

  const acessToken = jwt.sign({
    data: user.userId
  }, process.env.JWT_SECRET_KEY , { expiresIn: '3h' });

  ctx.body = {
    username: user.username,
    email: user.email,
    acessToken
  }

})


router.post("/agendar", ctx => {
  console.log(ctx.body)
})