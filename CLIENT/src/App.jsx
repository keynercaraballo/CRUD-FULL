import { useState } from 'react'
import Axios from 'axios'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState(0);
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [anios, setAnios] = useState(0);
  const [id, setId] = useState(0);

  //editar
  const [editar, setEditar] = useState(false);


//creamos constante para listado de empleados lo cual es un array 
  const [empleadosList, setEmpleadosList] = useState([]);

  const add = () => {
    //utilizamos para realizar la peticion 
    Axios.post('http://localhost:3001/create',{
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios:anios 
    }).then(() =>{
      getEmpleados();
      alert("Empleado Registrado!!!")
      limpiarCampos();
    
    })
  }
  

  const update = () => {
    //utilizamos para realizar la peticion 
    Axios.put('http://localhost:3001/update',{
      id:id,
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios:anios 
    }).then(() =>{
      getEmpleados();
      limpiarCampos();
      
    })
  }

  const editarEmpleado = (val) =>{
    setEditar(true)
    //recuperando los datos
    setNombre(val.nombre);
    setEdad(val.edad);
    setPais(val.pais);
    setCargo(val.cargo);
    setAnios(val.anios);
    setId(val.id);
  }

  const getEmpleados = () => {
    //utilizamos para realizar la peticion 
    Axios.get('http://localhost:3001/empleados').then((response) =>{
      setEmpleadosList(response.data);
    });
  }

  const limpiarCampos = () =>{
    setAnios()
    setNombre("")
    setEdad()
    setCargo("")
    setPais("")
    setId();
    setEditar(false);
  }
   
  getEmpleados();


  return (
    <>
      <div className='container'>
       <div className='App'>
          <div className="card text-center">
            <div className="card-header">
              Gestion Empleados
            </div>
            <div className="card-body">
              <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Nombre</span>
                <input type="text" className="form-control" id="exampleFormControlInput1" 
                onChange={(event) => {
                  setNombre(event.target.value);
                  }}  value={nombre}
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Edad</span>
                <input type="number" className="form-control" id="exampleFormControlInput1"
                  onChange={(event) => {
                  setEdad(event.target.value);
                  }} value={edad} />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Pais</span>
                <input type="text" className="form-control" id="exampleFormControlInput1"
                  onChange={(event) => {
                    setPais(event.target.value);
                    }}  value={pais}/>
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Cargo</span>
                <input type="text" className="form-control" id="exampleFormControlInput1"
                  onChange={(event) => {
                    setCargo(event.target.value);
                    }} value={cargo} />
              </div>
                   
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Años de Expericiencia</span>
                <input type="number" className="form-control" id="exampleFormControlInput1"
                  onChange={(event) => {
                    setAnios(event.target.value);
                    }} value={anios} />
              </div>
           
            </div>
          
            <div className="card-footer text-muted">
              {
                editar==true?
                <div>
                    <button onClick={update} className='btn btn-warning m-2'>Actualizar</button><button onClick={limpiarCampos} className='btn btn-info m-2'>Cancelar</button>
                </div>
                
                :<button onClick={add} className='btn btn-primary'>Register</button>

              }
              
            </div>
          </div>
     
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Edad</th>
              <th scope="col">Pais</th>
              <th scope="col">Cargo</th>
              <th scope="col">Años Experiencia</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              empleadosList.map((val,key) =>{
                return <tr>
                  <th scope="row">{val.id}</th>
                  <td>{val.nombre}</td>
                  <td>{val.edad}</td>
                  <td>{val.pais}</td>
                  <td>{val.cargo}</td>
                  <td>{val.anios}</td>
                  <td>
                  <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-info"
                    onClick={() =>{
                      editarEmpleado(val);
                    }}
                    >Editar</button>
                    <button type="button" className="btn btn-danger">eliminar</button>
                    
                  </div>
                  </td>
            </tr>  

              })
            }
            
          </tbody>
        </table>

      </div>

      
        
    
    </>
  )
}

export default App
