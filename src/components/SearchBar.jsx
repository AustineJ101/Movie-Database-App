import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAppStore from "../store/app";

const fetchMovies = async (url, keyword) => {
    const response = await fetch(url+keyword);
    if(!response.ok) throw new Error("Failed to fetcch Movies")
    const data = await response.json();

    console.log(data);
    return data;
}

const SearchBar = () => {
   
    const inputRef = useRef(null);
    const [query, setQuery] = useState("");
    
    const isMovie = useAppStore(state => state.isMovie);
    const url = useAppStore(state => state.url);

     const cacheKey = isMovie ? "movies" : "Tv Shows";

    const{data, isLoading} = useQuery({
        queryKey: [cacheKey, query],
        queryFn: () => fetchMovies(url, query),
        enabled: !!query //This prevents automatic fetch onMount when keyword is empty. I want this to happen only after the search btn has been clicked and query has been updated with a value 
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!inputRef.current.value){
            inputRef.current.focus();
        }else{
            setQuery(inputRef.current.value);
        
        }
    }
    return(
        <form className="flex justify-center" onSubmit={handleSubmit}>
            <input className="border p-2 -mr-1 focus:outline-none focus:border-red-700" type="text" ref={inputRef} placeholder={isMovie? "Search Movie...": "Search Tv Show..."}/>
            <button type="submit" className="text-white font-semibold bg-red-700 px-3 py-2 rounded hover:bg-red-600 active:bg-red-800 transition disabled:opacity-30" disabled={isLoading}>
                {isLoading ? "Searching..." : "Search"}
            </button>
        </form>
    );

}


export default SearchBar;