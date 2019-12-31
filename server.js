'use strict';

var express = require('express');
var cors = require('cors');

var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

// require and use "multer"...

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.post('/api/fileanalyse', upload.single('upfile'), function (req, res, next) {
  const { file }=req;
 
  /*
  file:
   { fieldname: 'upfile',
     originalname: 'dig-2.png',
     encoding: '7bit',
     mimetype: 'image/png',
     destination: 'uploads/',
     filename: 'd9c76f38f18a5a09008b819dac201f36',
     path: 'uploads/d9c76f38f18a5a09008b819dac201f36',
     size: 48187 },     
     */
  
   //{"name":"CSS-Tricks_Newsletter_Subscribers.vcf","type":"text/x-vcard","size":265}
  res.json({
            name:file.originalname,
            type:file.mimetype,
            size:file.size
           })
})


app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});


