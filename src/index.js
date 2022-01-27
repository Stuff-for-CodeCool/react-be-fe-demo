import React, { StrictMode } from "react";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import { render } from "react-dom";

import "./index.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Welcome from "./components/Welcome";
import Users from "./components/Users";
import User from "./components/User";
import Posts from "./components/Posts";
import Post from "./components/Post";

const App = () => {
    return (
        <>
            <Header />
            <main className="container my-3">
                <Routes>
                    <Route path="/" element={<Welcome />}></Route>
                    <Route path="/users" element={<Users />}></Route>
                    <Route path="/users/:id" element={<User />}></Route>
                    <Route path="/posts" element={<Posts />}></Route>
                    <Route path="/posts/:id" element={<Post />}></Route>
                </Routes>
            </main>
            <Footer />
        </>
    );
};

render(
    <BrowserRouter>
        <StrictMode>
            <App></App>
        </StrictMode>
    </BrowserRouter>,
    document.getElementById("root")
);
