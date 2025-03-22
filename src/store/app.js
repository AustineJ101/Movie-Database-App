import { create } from "zustand";

const  API_KEY = "bd1a21503c373ee9f7e8e702f2372631";

const useAppStore = create((set) => ({
    isMovie: true,
    isTv: false,
    url:`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`,

    activateMovie: () => set({isMovie: true, isTv: false, url: `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`}),
    activateTv: () => set({isMovie: false, isTv: true, url: `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=`})

}))

export default useAppStore;