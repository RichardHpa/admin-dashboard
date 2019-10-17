import React, { Component } from 'react';

import './Users.scss';
import Button from '../Button/Button';

class Users extends Component {
    constructor(props){
        super(props);

        this.state = {
            users: []
        }
    }

    componentDidMount() {
        fetch('/api/users')
            .then(response => {
                return response.json();
            })
            .then(users => {
                this.setState({ users });
            });
    }

    renderUsers() {
        return this.state.users.map(user => {
            return (
                <tr key={user.id}>
                    <td>{ user.id }</td>
                    <td>{ user.name }</td>
                    <td>{ user.email }</td>
                    <td></td>
                    <td>
                        <Button text="Edit User" classes="btn-sm btn-info mr-2" to="https://laravel.com/docs/6.x"/>
                        <Button text="Delete User" classes="btn-sm btn-danger"/>
                    </td>
                </tr>
            );
        })
    }

    render(){
        return(
            <div>
            <Button text="Add New User" to="./users/create"/>
                <table className="table mt-2">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        { this.renderUsers() }
                    </tbody>
                </table>
            </div>

        )
    }
}

export default Users;
