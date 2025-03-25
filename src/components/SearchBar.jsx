import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import useAppStore from "../store/app";

const SearchBar = () => {
   
    const inputRef = useRef(null);
    const navigate = useNavigate();
    const isMovie = useAppStore(state => state.isMovie);
    

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!inputRef.current.value){
            inputRef.current.focus();
        }else{
            navigate(`list/${inputRef.current.value}`)
        }

    }

    return(
        <form className="flex justify-center" onSubmit={handleSubmit}>
            <input className="border border-black w-1/2 p-2 -mr-1 focus:outline-none focus:border-red-700 focus:border-2" type="text" ref={inputRef} placeholder={isMovie? "Enter Movie Title...": "Enter TV Show Title..."}/>
            <button type="submit" className="text-white font-semibold bg-red-700 px-3 py-2 rounded hover:bg-red-600 active:bg-red-800 transition disabled:opacity-30">
                Search
            </button>
        </form>
    );

}


export default SearchBar;