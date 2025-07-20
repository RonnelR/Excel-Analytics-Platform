//checks for valid tokens
import jwt from 'jsonwebtoken'

export const isSignInRequired = async (req,res,next)=>{


//getting token from headers ,middleware for sign in check
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

//Checking admin middleware
export const isAdmin = (req,res,next) =>{
    try {
        const user = req.user;
if(user.role !== 'admin' ){
      res.status(401).json({
        success:false,
        message:'Unauthorized user',
    })
}else{
    next()
}

    } catch (error) {
          res.status(401).json({
        success:false,
        message:'Something went wrong!',
        error
    })
    }
}