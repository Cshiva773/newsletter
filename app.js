const bodyParser = require('body-parser');
const express=require('express');
const mailchimp = require('@mailchimp/mailchimp_marketing');
const app=express();
const port=3000
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
mailchimp.setConfig({
    apiKey: "8f064cbacdb58443943d06aaf05ad75a-us21",
    server: "us21"
});
app.get("/",(req,res)=>{
    res.sendFile(__dirname+'/signup.html')    
})
app.post("/saveData", function(req, res){
    console.log(req.body.firstName);
    console.log(req.body.lastName);
    console.log(req.body.email);
   
    const listId = "843acad2e7";
    const subscribingUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    };
   
    async function run() {
        try {
            const response = await mailchimp.lists.addListMember(listId, {
              email_address: subscribingUser.email,
              status: "subscribed",
              merge_fields: {
                FNAME: subscribingUser.firstName,
                LNAME: subscribingUser.lastName
              }
            });
   
            console.log(
              `Successfully added contact as an audience member. The contact's id is ${response.id}.`
            );
   
            res.sendFile(__dirname + '/success.html');
        } catch (e) {
            res.sendFile(__dirname + '/failure.html');
            
        }
    }
   
    run();
  })
  
   
app.listen(port,()=>{
    console.log("this port is running")
})

//api-key:8f064cbacdb58443943d06aaf05ad75a-us21
//audience id:843acad2e7