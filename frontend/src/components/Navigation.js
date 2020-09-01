import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Logo from "./images/mercado.png";

export default class Navigation extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        {
                            <img
                                src={Logo}
                                className="img-logo"
                            />
                        }
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item ">
                                <Link to="/" className="nav-link">Modo usuario</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/products" className="nav-link">Modo administrador</Link>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}
