

export const uploadFileController = (req,res) => {
    try {
    //checing for file
    const AvailableFile = req.file;

    if(!AvailableFile){
        res.status(400).json({
            success:false,
            message:"Did't reciveve any file ",
        })
    }
      res.status(202).json({
            success:true,
            message:"file uploaded successful!",
        })
    

    } catch (error) {
        res.status(401).json({
            success:false,
            message:"error in uploading file",
            error
        })
    }
}