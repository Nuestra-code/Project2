//import the dependencies
const jwt = require('jsonwebtoken');

const secret = 'TechStoreAPI';

//signing process
module.exports.createAccessToken =(user) => {
    const data = {
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin
    }

    return jwt.sign(data, secret, {});
}

//verify process
module.exports.verify = (req,res,next) => {
    
    let token = req.header.authorization

    if(typeof token !== "undefined")
    {
        token = token.slice(7, token.length);
        
        return jwt.verify(token,secret, (err,data) => {
            if (err){
                return res.send({auth:'failed'})
            } else {
                next();
            }
        })
    }
}

//decoding process
module.exports.decode = (token) => {
    if (typeof token != 'undefined')
    {
        token = token.slice(7, token.length)

        return jwt.verify(token, secret, (err,data) => {
            if (err){
                return null
            } else {
                return jwt.decode(token, {complete: true}).payload
            }
        })
    }
}