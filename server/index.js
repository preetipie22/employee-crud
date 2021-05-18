const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');
const db = mysql.createPool({
    host:'localhost',
user: 'root',
password: 'password',
database: 'classicmodels'
});

app.use(cors()); 
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/api/get", (req, res) => {
   const sqlSelect = "SELECT * FROM employee";
   db.query(sqlSelect, (err, result) => {
    if(err){
        console.log(err);
    }
    console.log(result);
    res.send(result);
});
}); 


app.put("/api/update", (req, res) => {
    const firstName =  req.body.firstName;
    const lastName = req.body.lastName;
    const emailId = req.body.emailId;
    const mobileNo = req.body.mobileNo;
    console.log('emailId: ', emailId);
    console.log('firstName: ', firstName);
     const sqlUpdate = ("UPDATE employee set firstName = ?, lastName = ?, mobileNo = ? where emailId = ?");
     db.query(sqlUpdate, [firstName, lastName, mobileNo, emailId], (err, result) => {
         if(err){
             console.log(err);
         }

         console.log(result);
         res.send(result);
         
     });
 });

 app.post("/api/insert", (req, res) => {
   const firstName =  req.body.firstName;
   const lastName = req.body.lastName;
   const emailId = req.body.emailId;
   const mobileNo = req.body.mobileNo;
    const sqlInsert = ("INSERT INTO employee (firstName, lastName, emailId, mobileNo) VALUES(?,?,?,?)");
    db.query(sqlInsert, [firstName, lastName, emailId, mobileNo], (err, result) => {
        if(err){
            console.log(err);
        }
        
        res.send(result);
        
    });
});

app.delete('/api/delete/:emailId',(req,res)=>{
    const emailId = req.params.emailId;
   const sqlDelete = "DELETE FROM employee WHERE emailId = ?";
   db.query(sqlDelete,emailId,(err,result)=>{
       if(err){
           console.log(err);
       }
   });
})
app.listen(3001, () => {
    console.log("running on 3001");
});
