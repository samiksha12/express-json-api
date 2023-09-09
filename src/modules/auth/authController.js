exports.login=(loginCredentials)=>{
    const {userName,password} = loginCredentials;
    if(userName === 'Samiksha' && password === 'JustAPassword@1214'){
        return true;
    }else{
        return ({"message":"Try using correct UserName and password"});
    }

}