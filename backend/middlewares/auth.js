//checks for valid tokens
import jwt from 'jsonwebtoken'

export const auth = async (req,res,next)=>{

//getting token from headers
const token = req.headers.authorization;

if(!token){
    res.status(401).json({
        success:false,
        message:'token missing!'
    })
}

try {
    //verifing token
    const verified = await jwt.verify(token,process.env.JWT_SECRET)
    req.user = verified;
    next()

} catch (error) {
     res.status(401).json({
        success:false,
        message:'Something went wrong!',
        error
    })
}

}