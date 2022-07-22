const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const regexUsername = /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/
const regexPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,28}$/


export default class Validation_creedential{
  constructor(reqBody){
    if(Boolean(reqBody)){
      this.email = reqBody.email;
      this.username = reqBody.username;
      this.password = reqBody.password;

      
    }
  }

  Email (){
    var valid = true;
    if(regexEmail.test(this.email.toLowerCase())){
      valid = false;
    }
    return valid
  }

  UserName(){ 
    var valid = true;
    if(regexUsername.test(this.username.toLowerCase())){
      valid = false;
    }
    return valid;
  }
  

  Password(){     
    var valid = true;
    if(regexPassword.test(this.password)){
      valid = false;
    }
    return valid;
  }



}

