import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import CreatePost from './Pages/CreatePost';
import SinglePost from './Pages/SinglePost';

import Menu from './components/Menu';
import NotFound from './components/NotFound';

import { UserProvider } from './context/user';

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
                        <Route path="/home/posts/:postId" element={<SinglePost />} />
                        <Route path={encodeURIComponent("create post")} element={<CreatePost />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </Router>
        </UserProvider>
    );
}

export default App;