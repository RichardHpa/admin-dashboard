import React, { Component } from 'react';

import './Header.scss';

class Header extends Component {
    constructor(props){
        super(props);

    }

    render(){
        return(
            <nav className="navbar navbar-dark sticky-top bg-dark navbar-expand-lg pt-2">
                <a className='navbar-brand col-sm-3 col-md-2 mr-0' href='/'>Hey, { window.name }</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <form className="form-inline mr-auto ml-2">
                        <input id="searchBar" className="form-control mr-sm-2 p-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-theme-color my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
                <div>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/logout">Logout</a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Header;
