import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import useAppStore from "../store/app";
import { useQuery } from "@tanstack/react-query";
const API_KEY = "bd1a21503c373ee9f7e8e702f2372631";
function Home(){

    const isMovie = useAppStore(state => state.isMovie);
    const activateMovie = useAppStore(state => state.activateMovie);
    const activateTv = useAppStore(state => state.activateTv);
  
    const fetchTrending = async () =>{
        const url = `https://api.themoviedb.org/3/trending/${isMovie ? "movie" : "tv"}/day?api_key=${API_KEY}`
        const response = await fetch(url);
        if(!response.ok) throw new Error("Failed to fetch trending");
        const data = await response.json();

        return data;
    }

    const fetchNowPlaying = async () => {
        const url = `https://api.themoviedb.org/3/${isMovie? "movie/now_playing": "tv/on_the_air"}?api_key=${API_KEY}`;
        const response = await fetch(url);
        if(!response.ok) throw new Error("Failed to fetch now playing");
        const data = await response.json();

        return data
    }
    
    const fetchTopRated = async () => {
        const url = `https://api.themoviedb.org/3/${isMovie? "movie" : "tv"}/top_rated?api_key=${API_KEY}`;
        const response = await fetch(url);
        if(!response.ok) throw new Error("Failed to fetch top rated");
        const data =  await response.json();

        return data;
        
    }
    const trendingCacheKey = isMovie? ["trending", "movie"] : ["trending", "tv"];
    const nowPlayingCacheKey = isMovie? ["now playing", "movie"] : ["now playing", "tv"];
    const topRatedCacheKey = isMovie? ["top rated", "movie"] : ["top rated", "tv"]

    const {data: trending, isLoading: trendingLoading, error: trendingError} = useQuery({
        queryKey: [...trendingCacheKey],
        queryFn: () => fetchTrending(),
    })

    const {data:nowPlaying, isLoading: nowPlayingLoading, error: nowPlayingError} = useQuery({
        queryKey: [...nowPlayingCacheKey],
        queryFn: () => fetchNowPlaying(),
    })

    const {data: topRated, isLoading: topRatedLoading, error: topRatedError} = useQuery({
        queryKey: [...topRatedCacheKey],
        queryFn: () => fetchTopRated()
    })

    

    return(
        <div className="px-4">
            {/* Hero Section Start */}
            <div className="h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px] 2xl:h-[500px]">
                <header className="flex justify-between items-center border-b p-3 fixed top-0 left-0 w-full bg-black z-50">
                    <h1 className="text-base md:text-xl xl:text-2xl 2xl-text-3xl font-bold text-red-600">MovieDb</h1>
    
                    <div className="flex gap-4">
                        <button 
                        className={isMovie? "active" : "inactive"}
                        onClick={activateMovie}
                        >
                            Movies
                        </button>
                        <button
                        className={isMovie? "inactive" : "active"}
                        onClick={activateTv}
                        >
                            Tv Shows
                        </button>
                    </div>
                </header>

                <div className="flex flex-col justify-center h-full">
            
                    <h1 className="text-center font-semibold text-lg md:text-xl xl:text-3xl 2xl:text-4xl mb-4">Find More About Your Favorite {isMovie? "Movies": "TV Shows"}</h1>
                    <SearchBar />

                </div>
               
            </div>
            {/* Hero Section End */}

            {/* Trending Section Start */}
            <div className="mb-2">
                <h1 className="text-lg md:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-red-600">Trending🔥</h1>
                {trendingLoading && <div className="w-10 h-10 border-2 border-r-red-600 rounded-full animate-spin"></div>}
                {trendingError && <p>{trendingError.message}</p>}
                <div className="flex overflow-x-auto gap-4 py-2">
                   {trending?.results.map(result => (
                    <MovieCard 
                        key={result.id}
                        id={result.id}
                        poster_path={result.poster_path}
                        title={isMovie? result.title : result.name}
                        date={isMovie? result.release_date : result.first_air_date}
                    
                    />
                   ))}
                </div>


            </div>
            {/* Trending Section End */}

            {/* Now Playing Section Start */}
            <div className="mb-2">
                <h1 className="text-lg md:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-red-600">Now Playing🎥</h1>
                {nowPlayingLoading && <div className="w-10 h-10 border-2 border-r-red-600 rounded-full animate-spin"></div>}
                {nowPlayingError && <p>{nowPlayingError.message}</p>}
                <div className="flex overflow-x-auto gap-4 py-2">
                   {nowPlaying?.results.map(result => (
                    <MovieCard 
                        key={result.id}
                        id={result.id}
                        poster_path={result.poster_path}
                        title={isMovie? result.title : result.name}
                        date={isMovie? result.release_date : result.first_air_date}
                    
                    />
                   ))}
                </div>

            </div>
            {/* Now Playing Section End */}

            {/* Top Rated Section Start */}
            <div className="mb-2">
                <h1 className="text-lg md:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-red-600">Top Rated 🚀</h1>
                {topRatedLoading && <div className="w-10 h-10 border-2 border-r-red-600 rounded-full animate-spin"></div>}
                {topRatedError && <p>{topRatedError.message}</p>}
                <div className="flex overflow-x-auto gap-4 py-4">
                   {topRated?.results.map(result => (
                    <MovieCard 
                        key={result.id}
                        id={result.id}
                        poster_path={result.poster_path}
                        title={isMovie? result.title : result.name}
                        date={isMovie? result.release_date : result.first_air_date}
                    
                    />
                   ))}
                </div>

            </div>

        </div>
    )
}
export default Home;