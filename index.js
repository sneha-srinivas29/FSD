const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const multer = require('multer')
var morgan=require('morgan')
const swaggerJSDoc=require('swagger-jsdoc')
const swaggerUi=require('swagger-ui-express')
var rfs=require('rotating-file-stream')
const Registers = require('./models/RegisterDataSchema')
const Uploads= require('./models/UploadsDataSchema')
const Patients = require('./models/PatientsDataSchema')
const Hospitals=require('./models/HospitalsDataSchema')
const Logins=require('./models/LoginDataSchema')
const Orders=require('./models/OrdersDataSchema')
const Donors=require('./models/DonorsDataSchema')
const path = require('path');
const bcrypt = require('bcryptjs');
const bodyParser=require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json());
app.use(cors());

const options={
  definition:{
    openapi:'3.0.0',
    info:{
      title:'BMD',
      version:'1.0.0'
    },
    servers:[
      {
        url:'http://localhost:4000/'
      }
    ]
    },
    apis:['./index.js']
  }
const swaggerSpec =swaggerJSDoc(options)
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec))


/**
 * @swagger
 * /:
 *  get:
 *      summary: To get
 *      description: this api 
 *      responses:
 *          200:
 *               description: this api is used to used to fetch data
 */
app.get('/',(req, res) => {
  
  res.send(`<div style="text-align: center;height:88%;font-size: 25px;padding-top:100px"><h2>WELCOME TO BACKEND</h2></div>`)
 
})
 app.use(cors())


//MULTER
const storage1 = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null,'./Donors')
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    },
  })
  const upload = multer({ storage: storage1 })

app.post('/image', upload.single('file'), function (req, res) {
  res.json({})
})

const storage2 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,'./Results')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})
const upload2 = multer({ storage: storage2 })

app.post('/image2', upload2.single('file'), function (req, res) {
res.json({})
})


const storage3 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,'./Hospitals')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})
const upload3 = multer({ storage: storage3 })

app.post('/image3', upload3.single('file'), function (req, res) {
res.json({})
})


const storage4 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,'./Medicalreports')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})
const upload4 = multer({ storage: storage4 })

app.post('/image4', upload4.single('file'), function (req, res) {
res.json({})
})

const storage5 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,'./HLAreports')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})
const upload5 = multer({ storage: storage5 })

app.post('/image5', upload5.single('file'), function (req, res) {
res.json({})
})

//  MORGAN
var access=rfs.createStream('access.log',{
    interval: '1h' ,
    path:path.join(__dirname,'log')
})
app.use(morgan('tiny',{stream:access}))


mongoose.connect('mongodb://0.0.0.0:27017/BMD', { useNewUrlParser: true});

/**
 * @swagger
 *  components:
 *      schema:
 *          reg:
 *             type: object
 *             properties:
 *                 user:
 *                     type: string
 *                 email:
 *                     type: string
 *                 pass:
 *                     type: string
 *                 cpass:
 *                      type: string
                 
 */

/**
 * @swagger
 * /read:
 *  get:
 *      summary: To get register data
 *      description: this api 
 *      responses:
 *          200:
 *              description: this api is used to used to fetch data
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/reg'

*/

  app.get('/read', async(req, res) => {

    Registers.find({},(err,results) => {
        if (err) {
            res.status(500).send(err);
          } 
          res.send(results)
    }
    )
  });

  /**
 * @swagger
 *  components1:
 *      schema1:
 *          reg1:
 *              type:object
 *              properties:
 *                  user:
 *                      type: string
 *                  pass:
 *                      type: string
 */

/**
* @swagger
* /read2:
*  get:
*      summary: To get login data
*      description: this api 
*      responses:
*          200:
*              description: this api is used to used to fetch data
*              content:
*                  application/json:
*                      schema: 
*                          type: array
*                          items:
*                              $ref: '#components1/schema1/reg1'
*/

  app.get('/read2',async(req, res) => {

    Logins.find({},(err,results) => {
        if (err) {
            res.status(500).send(err);
          } 
          res.send(results)
    }
    )
  });
   /**
 * @swagger
 *  components2:
 *      schema2:
 *           reg2:
 *              type:object
 *              properties:
 *                 userid:
 *                     type: string
 *                 bg:
 *                   type: string
 *                 gender:
 *                     type: string
 *                 dob:
 *                   type: date
 *                 file:
 *                    type: file 
 *                 allergy:
 *                      type: string   
 */

/**
 * @swagger
 * /read3:
 *  get:
 *      summary: To get donors data
 *      description: this api 
 *      responses:
 *          200:
 *              description: this api is used to used to fetch data
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: array
 *                          items:
 *                              $ref: '#components2/schema2/reg2'

*/

  app.get('/read3', async(req, res) => {
    Donors.find({},(err,results) => {
        if (err) {
            res.status(500).send(err);
          }
          res.send(results)
    }
    )
  });

   /**
 * @swagger
 *  components3:
 *      schema3:
 *           reg3:
 *              type:object
 *              properties:
 *                 userid1:
 *                     type: string
 *                 hospitalname:
 *                   type: string
 *                 idproof:
 *                    type: file  
 */

/**
 * @swagger
 * /read4:
 *  get:
 *      summary: To get hospitals data
 *      description: this api 
 *      responses:
 *          200:
 *              description: this api is used to used to fetch data
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: array
 *                          items:
 *                              $ref: '#components3/schema3/reg3'

*/

  app.get('/read4', async(req, res) => {
    Hospitals.find({},(err,results) => {
        if (err) {
            res.status(500).send(err);
          } 
          res.send(results)
    }
    )
  });

  /**
 * @swagger
 *  components4:
 *      schema4:
 *           reg4:
 *              type:object
 *              properties:
 *                 user:
 *                     type: string
 *                 bg:
 *                   type: string
 *                 gender:
 *                    type: file 
 *                 SH:
 *                  type:string
 *                 yod:
 *                   type:integer
 *                 file1:
 *                     type:file
 *                 file2:
 *                     type:file
 *                 hlav:
 *                    type:float 
 */

/**
 * @swagger
 * /read5:
 *  get:
 *      summary: To get patients data
 *      description: this api 
 *      responses:
 *          200:
 *              description: this api is used to used to fetch data
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: array
 *                          items:
 *                              $ref: '#components4/schema4/reg4'

*/

  app.get('/read5', async(req, res) => {
    Patients.find({},(err,results) => {
        if (err) {
            res.status(500).send(err);
          } 
          res.send(results)
    }
    )
  });
  
  /**
 * @swagger
 *  components5:
 *      schema5:
 *           reg5:
 *              type:object
 *              properties:
 *                 name:
 *                     type: string
 *                 contact:
 *                   type: string
 *                 email:
 *                    type: string
 *                 address:
 *                  type:string
 *                 city:
 *                   type:string
 *                 pincode:
 *                     type:string
 *                 state:
 *                     type:file

 */

/**
 * @swagger
 * /read6:
 *  get:
 *      summary: To get orders data
 *      description: this api 
 *      responses:
 *          200:
 *              description: this api is used to used to fetch data
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: array
 *                          items:
 *                              $ref: '#components5/schema5/reg5'

*/

  app.get('/read6', async(req, res) => {
    Orders.find({},(err,results) => {
        if (err) {
            res.status(500).send(err);
          } 
          res.send(results)
    }
    )
  });
  
  /**
 * @swagger
 *  components:
 *      schema:
 *           reg6:
 *              type:object
 *              properties:
 *                 user2:
 *                     type: string
 *                 phn:
 *                   type: string
 *                 certificate:
 *                     type:file

 */

/**
 * @swagger
 * /read7:
 *  get:
 *      summary: To get reports data
 *      description: this api 
 *      responses:
 *          200:
 *              description: this api is used to used to fetch data
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: array
 *                          items:
 *                              $ref: '#components/schema/reg6'

*/
 app.get('/read7', async(req, res) => {
    Uploads.find({},(err,results) => {
        if (err) {
            res.status(500).send(err);
          } 
          res.send(results)
    }
    )
  });

/**
* @swagger
* /read:
*  post:
*      summary: create a new Register
*      description: create new Register with given Register details and adds to the database
*      requestBody:
*          required: true
*          content:
*           application/json:
*                  schema:
*                      $ref: '#components/schema/reg'
*      responses:
*          200:
*              description: Success
*              content:
*                  application/json:
*                      schema:
*                          type: array
*                          items:
*                              $ref: '#components/schema/reg'
*
*/

  app.post('/read', async(req, res) => {
    const user = req.body.user
    const email = req.body.email
    const pass = req.body.pass
    const cpass = req.body.cpass

    const formData  =  new Registers(
        {
            user: user,
            email:email,
            pass:pass,
            cpass:cpass
        }
    )

    try{   
        await formData.save();
        res.send("inserted data..")

    } catch(err){
        console.log(err)
    }
  });

  /**
* @swagger
* /read7:
*  post:
*      summary: create a new results
*      description: create new results and adds to the database
*      requestBody:
*          required: true
*          content:
*           application/json:
*                  schema:
*                      $ref: '#components/schema/reg6'
*      responses:
*          200:
*              description: Success
*              content:
*                  application/json:
*                      schema:
*                          type: array
*                          items:
*                              $ref: '#components/schema/reg6'
*
*/


  app.post('/read7', async(req, res) => {

    const user2 = req.body.user2
    const phn = req.body.phn
    const certificate = req.body.certificate

    const formData1  =  new Uploads(
        {
            user2: user2,
            phn:phn,
            certificate:certificate
        }
    )
    try{
        await formData1.save();
        res.send("inserted data..")

    } catch(err){
        console.log(err)
    }
  });

 /**
* @swagger
* /read5:
*  post:
*      summary: create a new Patient
*      description: create new Patient with given Patient details and adds to the database
*      requestBody:
*          required: true
*          content:
*           application/json:
*                  schema:
*                      $ref: '#components4/schema4/reg4'
*      responses:
*          200:
*              description: Success
*              content:
*                  application/json:
*                      schema:
*                          type: array
*                          items:
*                              $ref: '#components4/schema4/reg4'
*
*/
  
  app.post('/patients', async(req, res) => {

    const user = req.body.user
    const bg = req.body.bg
    const gender = req.body.gender
    const SH=req.body.SH
    const yod=req.body.yod
    const file1=req.body.file1
    const file2=req.body.file2
    const hlav=req.body.hlav

    const formData2  =  new Patients(
        {
            user: user,
            bg:bg,
 
            gender:gender,
            SH:SH,
            yod:yod,
            file1:file1,
            file2:file2,
            hlav:hlav
        }
    )
    try{
        await formData2.save();
        res.send("inserted data..")

    } catch(err){
        console.log(err)
    }
  });

 /**
* @swagger
* /read4:
*  post:
*      summary: create a new Hospital
*      description: create new hospital with given hospital details and adds to the database
*      requestBody:
*          required: true
*          content:
*           application/json:
*                  schema:
*                      $ref: '#components3/schema3/reg3'
*      responses:
*          200:
*              description: Success
*              content:
*                  application/json:
*                      schema:
*                          type: array
*                          items:
*                              $ref: '#components3/schema3/reg3'
*
*/

  app.post('/hospitals', async(req, res) => {

    const userid1 = req.body.userid1
    const hospitalname = req.body.hospitalname
    const idproof = req.body.idproof


    console.log(userid1)
    
    const formData3  =  new Hospitals(
        {
            userid1: userid1,
            hospitalname:hospitalname,
            idproof:idproof
        }
    )
    try{
     
        await formData3.save();
        res.send("inserted data..")

    } catch(err){
        console.log(err)
    }
  });


  app.post('/read2', async(req, res) => {

    const user = req.body.user
    const pass = req.body.pass

    const formData  =  new Logins(
        {
            user: user,
            pass:pass
        }
    )

    try {
      const { user, pass } = req.body;
      const log = await Registers.findOne({ user });
      // console.log(log)
      if (!log) {
        return res.status(401).send('Invalid email or password');
      }
      const isMatch = await bcrypt.compare(pass, log.pass);
      if (!isMatch) {
        return res.status(401).send('Invalid email or password');
      }
      res.send('Login successful');
      await formData.save();
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  
  });

 /**
* @swagger
* /read6:
*  post:
*      summary: create a new Order
*      description: create new Order with given Order details and adds to the database
*      requestBody:
*          required: true
*          content:
*           application/json:
*                  schema:
*                      $ref: '#components5/schema5/reg5'
*      responses:
*          200:
*              description: Success
*              content:
*                  application/json:
*                      schema:
*                          type: array
*                          items:
*                              $ref: '#components5/schema5/reg5'
*
*/

  app.post('/orders', async(req, res) => {

    const name = req.body.name
    const contact = req.body.contact
    const email = req.body.email
    const address = req.body.address
    const city = req.body.city
    const pincode = req.body.pincode
    const state = req.body.state

    const formData5  =  new Orders(
        {
            name: name,
            contact:contact,
            email:email,
            address:address,
            city:city,
            pincode:pincode,
            state:state
        }
    )
try{
 
    await formData5.save();
    res.send("inserted data..")

} catch(err){
    console.log(err)
}
});

 /**
* @swagger
* /read3:
*  post:
*      summary: create a new donor
*      description: create new donor with given donor details and adds to the database
*      requestBody:
*          required: true
*          content:
*           application/json:
*                  schema:
*                      $ref: '#components2/schema2/reg2'
*      responses:
*          200:
*              description: Success
*              content:
*                  application/json:
*                      schema:
*                          type: array
*                          items:
*                              $ref: '#components2/schema2/reg2'
*
*/

app.post('/donors', async(req, res) => {

    const userid = req.body.userid
    const bg = req.body.bg
    const gender = req.body.gender
    const dob = req.body.dob
    const file = req.body.file
    const allergy = req.body.allergy


    console.log(userid,bg)
    const formData6 =  new Donors(
        {
            userid: userid,
            bg:bg,
            gender:gender,
            dob:dob,
            file:file,
            allergy:allergy
        }
    )
    try{
     
        await formData6.save();
        res.send("inserted data..")

    } catch(err){
        console.log(err)
    }
  });


app.delete("/delete/:id",async(req,res)=>{
    const id = req.params.id;
     Registers.findByIdAndRemove(id).exec();
     Uploads.findByIdAndRemove(id).exec();
     Donors.findByIdAndRemove(id).exec();
     Hospitals.findByIdAndRemove(id).exec();
     Orders.findByIdAndRemove(id).exec();
     Patients.findByIdAndRemove(id).exec();
})



const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});