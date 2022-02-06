import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import CreatePost from './Pages/CreatePost';

import Menu from './components/Menu';
import NotFound from './components/NotFound';

import { UserProvider } from './context/user';

import AuthRoute from './utils/AuthRoute';
import NoAuthRoute from './utils/NoAuthRoute';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

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
        <UserProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/create%20post" element={
                            <AuthRoute>
                                <CreatePost />
                            </AuthRoute>
                        } />
                        <Route path="/login" element={
                            <NoAuthRoute>
                                <Login />
                            </NoAuthRoute>
                        } />
                        <Route path="/register" element={
                            <NoAuthRoute>
                                <Register />
                            </NoAuthRoute>
                        } />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </Router>
        </UserProvider>
    );
}

export default App;