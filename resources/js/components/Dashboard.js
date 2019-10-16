import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './Header/Header';

function Dashboard() {
    return (
        <BrowserRouter>
            <Header/>
        </BrowserRouter>
    );
}

export default Dashboard;

if (document.getElementById('reactApp')) {
    ReactDOM.render(<Dashboard />, document.getElementById('reactApp'));
}
