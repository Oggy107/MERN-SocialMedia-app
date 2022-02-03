import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';

import Menu from './components/Menu';
import NotFound from './components/NotFound';

import './App.css';
import 'semantic-ui-css/semantic.min.css';

const Layout = () => {
    return (
        <Container>
            <Menu />
            <Outlet />
        </Container>
    );
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index path="/home" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;