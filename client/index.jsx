import React, {useEffect, useState} from "react";
import { createRoot } from "react-dom/client";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";


function FrontPage() {
    return (<div>
        <h1>Movie database</h1>
        <ul>
            <li><Link to={"/movies"}>List movies</Link></li>
            <li><Link to={"/movies/new"}>Add movie</Link></li>
        </ul>
    </div>
    );
}


function useLoading(loadingFunction) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [data, setData] = useState();

    async function load() {
        try {
            setLoading(true);
            setData(await loadingFunction());
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
    }, []);
    return { loading, error, data };
}

async function fetchJSON(url) {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Fail to load ${res.status}: ${res.statusText}`);
    }
    return await res.json();
}

function ListMovies() {

    const { loading, error, data } = useLoading(
        async () => fetchJSON("/api/movies")

    );

    if (loading) {
        return <div>Loading...</div>
    }
    if (error) {
        return (<div>
            <h1>Error</h1>
            <div>{error.toString()}</div>
        </div>
        );
    }

    return (
        <div>
            <h1>Movies in the database</h1>
            <ul>
                {data.map((movie) => (
                    <li key={movie.title}>{movie.title}</li>
                ))}
            </ul>
        </div>
    );
}

function AddNewMovie() {
    return (
        <form>
            <h1>Add new movie</h1>
        </form>
    );
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