var express     = require("express"),
    app         = express(),
    bodyParser  = require('body-parser');
var Message = require('./module');
var mongoose = require('mongoose');            

mongoose.connect('mongodb://localhost/test')     //连接本地数据库blog 

var db = mongoose.connection;

// 连接成功
db.on('open', function(){
    console.log('MongoDB Connection Successed');
});
// 连接失败
db.on('error', function(){
    console.log('MongoDB Connection Error');
});

app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.post('/send',function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    Message.create({name:req.body.name,text:req.body.text}, function (err, data) {
        if (err) throw err;
        console.log('注册成功');
        //res.redirect('/userList');      // 重定向到所用用户列表
    })
})
app.get('/connect', function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.writeHead(200, {
      'Connection': 'keep-alive',
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache'
    });
   
    let s=[]
    setInterval(function(){
      Message.find({},function (err, data) {
          if (err) throw  err;
          if(data.length==s.length){return}
          else{
            s=data
            res.write('data: ' + JSON.stringify({ msg : s }) + '\n\n');
          }
      });
      
    }, 500);
});

/*
app.post('/message', function(req, res) {
  testdata = req.body;
});
*/

var port = 3000;
app.listen(port, function() {
  console.log("Running at Port " + port);
});