import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import swal from 'sweetalert'
export default class CreateProduct extends Component {

    state = { //definimos nuestros estados
        nombre: '',
        descripcion: '',
        stock: '',
        date: new Date(),
        userSelected: '',
        users: [],
        editing: false,
        _id: '',
        validaciones: {
            nombre: '',
            descripcion: '',
            stock: '',
   

        }

    }

    async componentDidMount() {
        const res = await axios.get('http://localhost:4000/api/categorias'); //peticion get para traer las categorias 
        if (res.data.length > 0) {
            this.setState({
                users: res.data.map(user => user.username),
                userSelected: res.data[0].username
            })
        }
        if (this.props.match.params.id) {
            const res = await axios.get('http://localhost:4000/api/products/' + this.props.match.params.id); //le pasamos por props el id del producto para poder editarlo
            console.log(res.data)
            this.setState({ //cambiamos el estado
                nombre: res.data.nombre,
                descripcion: res.data.descripcion,
                date: new Date(res.data.date),
                stock: res.data.stock,
                userSelected: res.data.categoria,
                _id: res.data._id,
                editing: true, 
                   validaciones: {
                    nombre: res.data.nombre,
                    descrcipcion: res.data.descripcion,
                    stock:  res.data.stock
      
    
                }
            });
            

        }
    }

    onSubmit = async (e) => {
        e.preventDefault();
        
        if (this.state.editing) { //guardamos por el evento los datos ingresados en el formulario
            const updatedNote = {
                nombre: this.state.nombre,
                descripcion: this.state.descripcion,
                stock: this.state.stock,
                categoria: this.state.userSelected,
                date: this.state.date
            };
            swal({
                text: "Se ha guardado correctamente!",
                icon: "success",timer:"10000"
            })
            await axios.put('http://localhost:4000/api/products/' + this.state._id, updatedNote); //modificamos los datos
        } else {
            const newNote = {
                nombre: this.state.nombre,
                descripcion: this.state.descripcion,
                stock: this.state.stock,
                categoria: this.state.userSelected,
                date: this.state.date
            };
      
            axios.post('http://localhost:4000/api/products', newNote);
        }
        swal({
            text: "Se ha guardado correctamente!",
            icon: "success",timer:"10000"
        })
     
        window.location.href = '/products';
    
         //al crear un producto, nos lleva a esta ubicacion que es donde están todos los productos en modo admin.

    }

    onInputChange = (e) => { //datos para cambiar
    
        e.preventDefault();
    
    
        this.setState({
         
            [e.target.name]: e.target.value
        })

    }


    onChangeDate = date => {
        this.setState({ date });
    }

    render() {
        
        return (
            <>
            <div className="col-md-6 offset-md-3 mt-5">
                <div className="card card-body">
                    <h4>Información del producto</h4>
                    <form onSubmit={this.onSubmit}>
                        {/* Mapeamos todo ahora*/}
                        <div className="form-group">
                        <p>Categoría</p>
                            <select
                                className="form-control"
                                value={this.state.userSelected}
                                onChange={this.onInputChange}
                                
                                name="userSelected"
                                required>
                                {
                                    this.state.users.map(user => (
                                        <option key={user} value={user}>
                                            {user}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>

                        {/* Nombre del producto */}
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                onChange={this.onInputChange}
                                name="nombre"
                                value={this.state.nombre}
                                required />
                        </div>
                        {/* Descripción del producto */}
                        <div className="form-group">
                            <textarea
                                type="text"
                                className="form-control"
                                placeholder="Descripción"
                                name="descripcion"
                                onChange={this.onInputChange}
                                value={this.state.descripcion}
                                required>
                            </textarea>
                        </div>
                        {/* stock*/}
                        <div className="form-group">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Stock"
                                name="stock"
                                onChange={this.onInputChange}
                                value={this.state.stock}
                                required>
                            </input>
                        </div>
                        {/*  Date */}
                        <div className="form-group">
                            <p>Fecha de ingreso</p>
                            <DatePicker className="form-control" selected={this.state.date} onChange={this.onChangeDate} />
                        </div>
                        <button className="btn btn-primary">
                            Guardar 
                        </button>
                    </form>
                </div>
            </div>

            </>
        )
        
    }
}
