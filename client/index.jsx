import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";


function FrontPage() {
    return <div>
        <h1>Movie database</h1>
        <ul>
            <li><Link to={"/movies"}>List movies</Link></li>
            <li><Link to={"/movies/new"}>Add movie</Link></li>
        </ul>
    </div>;
}

function ListMovies() {
    return (
        <div>
            <h1>Movies in the database</h1>
        </div>
    );
}

function AddNewMovie() {
    return (
        <form>
            <h1>Add new movie</h1>
        </form>
    )
}

function Application() {
    return <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<FrontPage />}/>
            <Route path={"/movies"} element={<ListMovies />}/>
            <Route path={"/movies/new"} element={<AddNewMovie />}/>
        </Routes>
    </BrowserRouter>
}

const container = document.getElementById("app")
const root = createRoot(container);
root.render(<Application/>)