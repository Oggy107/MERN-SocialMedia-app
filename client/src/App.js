import React from 'react';

import './App.css';
import 'semantic-ui-css/semantic.min.css';
import {Button} from 'semantic-ui-react'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Button>hello</Button>} />
                <Route path="/login" element={<h1>login page</h1>} />
                <Route path="/register" element={<h2>register page</h2>} />
            </Routes>
        </Router>
    );
}

export default App;