import React from "react";
import { Await, defer, useLoaderData, useOutletContext ,} from "react-router-dom";
import { getMovies, } from "../api";
import Movies from "../components/Movies";
import HeroSection from "../components/HeroIntro";

export function loader({request}){
    const url = request.url
    const type = url.includes('/movie') ? 'movie' : 'tv';
    return defer({movies:getMovies(type,"popular"),type:type})
}

export default function Home(){
    const dataPromise = useLoaderData()

    
    return (
        <HeroSection />
    )
}