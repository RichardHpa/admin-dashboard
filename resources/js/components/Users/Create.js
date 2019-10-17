import React, { Component } from 'react';

import './Users.scss';
import Button from '../Button/Button';
import {Form, Input} from '../Form/Form';

class CreateUser extends Component {
    constructor(props){
        super(props);

        this.handleSendForm = this.handleSendForm.bind(this);
    }

    handleSendForm(formOutcome){
        console.log('here');
        console.log(formOutcome);
    }

    render(){
        return(
            <div className="row">
                <div className="col-8">
                    <Form
                        btnText="Add New User"
                        method="post"
                        sendForm={this.handleSendForm}
                    >
                        <Input
                            label="Name"
                            name="name"
                            validation="required"
                        />
                        <Input
                            label="Email"
                            type="email"
                            name="email"
                            validation="required"
                        />
                        <Input
                            label="Password"
                            type="password"
                            name="password"
                            validation="required,min:4"
                        />
                        <Input
                            label="Confirm Password"
                            type="password"
                            name="confirmPassword"
                            validation="required,match:password"
                        />
                    </Form>
                </div>
            </div>

        )
    }
}

export default CreateUser;
