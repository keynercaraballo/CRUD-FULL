const express = require('express');
const app = express();
const mysql = require('mysql');

//create conections
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'test'
});

app.post("/create", (req,res)=>{
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;

    db.query('insert into empleados(nombre,edad, pais, cargo, anios) VALUES (?,?,?,?,?)', [nombre,edad,pais,cargo,anios],(err,result) =>{
        if(err){
            console.log(err);
        }else{
            res.send("empleado agregado correctamente!")
        }

    });

})


app.listen(3001, () =>{
    console.log('Server incializado...');
}
)