const polka = require('polka');

const app=polka({

});

app.get("/ping",(req, res)=>{
 console.log('got a ping');
 res.statusCode = 200;
 res.end();
});

app.listen(80,(err)=>{
 if(err)
 {
  console.error(err);
 }
});