import React, { Component } from 'react';

import './Users.scss';

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
                console.log(users);
            });
    }

    renderUsers() {
        return this.state.users.map(user => {
            return (
                <tr key={user.id}>
                    <td>{ user.id }</td>
                    <td>{ user.name }</td>
                    <td>{ user.email }</td>
                </tr>
            );
        })
    }

    render(){
        return(
            <table className="table">
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
        )
    }
}

export default Users;
