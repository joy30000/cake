const crypto=require('crypto')
 const multer = require('multer')
const path=require('path')



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/uploads')
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(12,(err,bytes)=>{
      const fn = bytes.toString('hex') + path.extname(file.originalname)
      cb(null,fn)
    })
    
   
  }
})

const fileFilter = (req, file, cb) => {
  // Accept only jpg and jpeg formats
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
    cb(null, true);
  } else {
    cb(new Error('Not a JPG file!'), false);
   
  }
};


const upload = multer({ storage: storage, fileFilter: fileFilter  })

module.exports=upload;
