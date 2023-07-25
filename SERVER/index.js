const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json())

//create conections
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'empresa'
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

app.get("/empleados", (req,res)=>{
    
    db.query('SELECT * FROM empleados',(err,result) =>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }

    });

});

app.put("/update", (req,res)=>{
    const id = req.body.id;
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;


    db.query('UPDATE empleados nombre=?,edad=?, pais=?, cargo=?, anios=? WHERE id=?', [nombre,edad,pais,cargo,anios,id],(err,result) =>{
        if(err){
            console.log(err);
        }else{
            res.send("empleado actualizado!")
        }

    });

})






app.listen(3001, () =>{
    console.log('Server incializado...');
}
)

