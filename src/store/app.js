import { create } from "zustand";
import { persist } from "zustand/middleware";

const  API_KEY = import.meta.env.VITE_TMDB_API_KEY;


const useAppStore = create(
    persist(
        (set) => ({
            isMovie: true,
            isTv: false,
            url:`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`,
        
            activateMovie: () => set({isMovie: true, isTv: false, url: `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`}),
            activateTv: () => set({isMovie: false, isTv: true, url: `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=`})
        
        }), 
        {
            name: "app-store"
        }
    )
)
    

export default useAppStore;