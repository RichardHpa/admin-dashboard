import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Button.scss';

class Button extends Component {
    constructor(props){
        super(props);

    }

    render(){
        return(
            <Link className={`btn btn-primary ${this.props.classes}`} to={this.props.to? this.props.to: '#' }>
                {this.props.text}
            </Link>
        )
    }
}

export default Button;
