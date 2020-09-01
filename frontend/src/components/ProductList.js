import React, { Component } from 'react'
import axios from 'axios'
import { format } from 'timeago.js'
import { Link } from 'react-router-dom'
import Maquillaje from "./images/maquillaje.png";
import Logo from "./images/LINIO-LOGO.png";
import Hogar from "./images/hogar.png";
import Juguete from "./images/juguetes.png";
import Muebles from "./images/mueble.png";
import Zapatos from "./images/zapatos.png";
import Swal from 'sweetalert'
export default class Home extends Component {

    state = {
        products: [],
        search: ""
    }

    async componentDidMount() {

        this.getNotes();
    }
    onChange = e => {
        this.setState({ search: e.target.value })
    }
    getNotes = async () => {
        const res = await axios.get('http://localhost:4000/api/products')
        this.setState({
            products: res.data
        });
    }


    deleteNote = async (productId) => {
   
            Swal({
                title: "Producto eliminado!",
                icon: "warning"
         
            })
     
        await axios.delete('http://localhost:4000/api/products/' + productId);
        this.getNotes();

    }
    searchSpace = (event) => {
        let keyword = event.target.value;
        this.setState({ search: keyword })
    }

    render() {
        const items = this.state.products.filter((product) => {
            if (this.state.search == null)
                return product
            else if (product._id.includes(this.state.search.toLowerCase())) {
                return product
            }
        }).map(product => {
            return (
                <div>

                    <div className="col-md-12 p-2" key={product._id}>
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
                                <p><strong>{product.categoria}</strong>

                                </p>
                                <p>
                                    <strong>Descripción</strong> : {product.descripcion}
                                </p>



                                <p>
                                    <strong>Productos en stock: </strong>
                                    {product.stock} </p>

                                <p><strong>Referencia :</strong> {product._id} </p>
                                <p><strong>Fecha de ingreso:</strong>{product.date}</p>
                                <p><strong>Creación del producto :</strong>   {format(product.createdAt)} </p>
                                <p><strong>Ultima actualización :</strong>   {format(product.updatedAt)} </p>
                            </div>
                            <div className="card-footer">
                                <Link to={"/edit/" + product._id} className="btn btn-secondary">

                                    Editar
                                    </Link> <button className="btn btn-danger" onClick={() => this.deleteNote(product._id)}>
                                    Eliminar
                                    </button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
        return (

            <>


                <div class="">
                    <div className=" mt-5 mb-5 d-flex justify-content-between">
                        <input className="search" type="text" placeholder="Buscar por referencia (ID)" onChange={(e) => this.searchSpace(e)} />
                        <Link to="/create"><button type="button" class="btn btn-danger">Crear Producto</button></Link>

                    </div>
                    <div className="row mt-5">{items}</div>

                </div>

            </>

        )
    }
}
