const setCookie = (token,res) =>{
    res.cookie("jwttoken",token,{
        httpOnly:true,
        maxAge:24 * 2 * 60 * 60 * 1000
    })
}

module.exports = setCookie