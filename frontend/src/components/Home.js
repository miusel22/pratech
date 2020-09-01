import React, { Component } from 'react'
import axios from 'axios'
import { format } from 'timeago.js'
import { Link } from 'react-router-dom'
import Maquillaje from "./images/maquillaje.png";
import Hogar from "./images/hogar.png";
import Juguete from "./images/juguetes.png";
import Muebles from "./images/mueble.png";
import Zapatos from "./images/zapatos.png";

export default class Home extends Component {

    state = { //definimos nuestro estado
        products: [],
        search: ""
    }

    async componentDidMount() {
        this.getNotes();
    }
    onChange = e => {
        this.setState({ search: e.target.value }) //se cambia el estado
    }
    getNotes = async () => {
        const res = await axios.get('http://localhost:4000/api/products') //Petición a la api para que nos traiga los datos
        this.setState({
            products: res.data //cambiamos el estado con la promesa
        });
    }

    deleteNote = async (productId) => { //petición para eliminar el producto 
        await axios.delete('http://localhost:4000/api/products/' + productId);
        this.getNotes();
    }
    searchSpace = (event) => {   //evento que nos permitirá realizar la busqueda
        let keyword = event.target.value;
        this.setState({ search: keyword })
    }

    render() {


        const items = this.state.products.filter((product) => {  // guardamos en una constante los productos 
            if (this.state.search == null) //validación que nos permite renderizar todos nuestros productos sin bucaros 
                return product
            else if (product._id.toLowerCase().includes(this.state.search.toLowerCase()) || product.nombre.toLowerCase().includes(this.state.search.toLowerCase()) || product.categoria.toLowerCase().includes(this.state.search.toLowerCase())) { //validación que nos permite buscar el producto y que aparezca solo segun la busqueda
                return product
            }
        }).map(product => { //mapeamos todos nuestros productos
            return (
                <div>

                    <div className="col-md-12 p-2 " key={product._id}>
                        <div className="card">
                            {product.categoria == "Maquillaje" ? ( //condición que nos ayuda a validar que se pinte el logo segun su categoría
                                <div className="d-flex justify-content-center">
                                    <img
                                        src={Maquillaje}
                                        className="img-responsive"
                                    />

                                </div>

                            ) : (
                                    ""
                                )}
                            {product.categoria == "Juguetería" ? ( //condición que nos ayuda a validar que se pinte el logo segun su categoría

                                <div className="d-flex justify-content-center"><img
                                    src={Juguete}
                                    className="img-responsive"
                                />
                                </div>
                            ) : (
                                    ""
                                )}
                            {product.categoria == "Muebles" ? ( //condición que nos ayuda a validar que se pinte el logo segun su categoría
                                <div className="d-flex justify-content-center"><img
                                    src={Muebles}
                                    className="img-responsive"
                                />
                                </div>
                            ) : (
                                    ""
                                )}
                            {product.categoria == "Hogar" ? ( //condición que nos ayuda a validar que se pinte el logo segun su categoría
                                <div className="d-flex justify-content-center"><img
                                    src={Hogar}
                                    className="img-responsive"
                                />
                                </div>
                            ) : (
                                    ""
                                )}
                            {product.categoria == "Calzado" ? ( //condición que nos ayuda a validar que se pinte el logo segun su categoría
                                <div className="d-flex justify-content-center"> <img
                                    src={Zapatos}
                                    className="img-responsive"
                                />
                                </div>
                            ) : (
                                    ""
                                )}
                            <div className="card-header d-flex justify-content-between">
                                <h5>{product.nombre}</h5>

                            </div>
                            <div className="card-body">
                                <p>
                                    <strong>{product.categoria}</strong>
                                </p>
                                <p>
                                    <strong>Descripción :</strong>  {product.descripcion}
                                </p>



                                <p>
                                    <strong>Productos en stock:</strong>  {product.stock}
                                </p>

                                <p><strong>Referencia :</strong> {product._id} </p>
                            </div>
                            <div className="card-footer">

                            </div>
                        </div>
                    </div>
                </div>
            )
        })
        return (

            <>


                <div class="">
                    <div className="text-center mt-5 mb-5">
                        <input className="search" type="text" placeholder="¿Qué buscas?" onChange={(e) => this.searchSpace(e)} />
                    </div>
                    <div className="row mt-5">{items}</div> {
                        /* llamamos la variable donde están nuestros productos*/}

                </div>

            </>

        )
    }
}
