const jwt = require('jsonwebtoken')

const generateToken = (user)=>{
    const token =  jwt.sign({id:user.user_id,role:user.role},process.env.JWT_SECRET_KEY,{
        expiresIn:'2d'
    })
    return token
}

module.exports = generateToken