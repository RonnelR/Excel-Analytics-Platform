import multer from 'multer';
import path from 'path'


     //storage setup
     const storage = multer.diskStorage({
        destination:(req,file,cb)=>{
            //folder to save file
            cb(null,'uploads/')
        },
        filename:(req,file,cb)=>{
            // const uniqueName = Date.now()+'-'+file.originalname;
            const uniqueName = file.originalname;

            cb(null,uniqueName)
        } 
     });


     //file filter for only accepting excel file
    const fileFilter = (req,file,cb) =>{
        const ext = path.extname(file.originalname)

        if(ext !== '.xlsx'){

        return cb(new Error("Plese upload an excel file"),false);
     
        }

        cb(null,true)
    };
    const upload = multer({
        storage,
        fileFilter
    });

    export default upload