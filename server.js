const express=require('express');
const bodyParser=require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extened:true}));
const MongoClient=require("mongodb").MongoClient;
const ObjectID=require('mongodb').ObjectID;
var db;
var path    = require("path");
var purchase="page1";



app.get('/terms',function(req,res){
  res.sendFile(path.join(__dirname+'/passwallet/Terms.html'));
});
app.get('/privacy',function(req,res){
  res.sendFile(path.join(__dirname+'/passwallet/Privacy.html'));
});
app.get('/about',function(req,res){
  res.sendFile(path.join(__dirname+'/passwallet/About.html'));
});


//#################change purchase
app.post('/passwallet_page',function(req,res){
    purchase=req.body.page;
    res.send(purchase);
})

app.use(express.static("passwallet"));
app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.get('/style.css', function(req, res) {
  res.sendFile(__dirname + "/passwallet/" + "style.css");
});
app.get('/passwallet_page1',function(req,res){
  res.sendFile(path.join(__dirname+'/passwallet/page1.html'));
});
app.get('/passwallet_page2',function(req,res){
  res.sendFile(path.join(__dirname+'/passwallet/page2.html'));
});

app.get('/purchase_passwallet',function(req,res){
  res.sendFile(path.join(__dirname+'/passwallet/'+purchase+'.html'));
});


//####################################inapp####################################
app.get('/purchase_passwallet',function(req,res){
    db.collection('passwallet_inapp').find().toArray(function(err,docs){
        if (err){
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs)
    })
})
app.put('/passwallet_inapp/:inappid',function(req,res){
    const id=req.params.inappid;
    db.collection("passwallet_inapp").update({_id:ObjectID(id)}, {inapp:req.body.inapp});
    res.send(req.body.inapp);
});
app.post('/passwallet_inapp',function(req,res){
        var txt={ inapp:req.body.inapp,     
        };
    db.collection('passwallet_inapp').insert(txt,function(err,result){
        if(err){
            console.log(err);
            res.sendStatus(500);
        }
    res.send(txt);
    })
})






MongoClient.connect("mongodb://localhost:27017/passwallet",function(err,database){
    if(err){
        return console.log(err);
    }
    db=database;
    app.listen(3030);
    
})