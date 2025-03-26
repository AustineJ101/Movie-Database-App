import { useNavigate, useParams } from "react-router-dom";
import useAppStore from "../store/app";
import { useInfiniteQuery } from "@tanstack/react-query";
import MovieCard from "../components/MovieCard";
const  API_KEY = "bd1a21503c373ee9f7e8e702f2372631";



const fetchMovies = async ({pageParam = 1, queryKey}) => {
    const [cacheKey, query] = queryKey;
    const response = await fetch(`https://api.themoviedb.org/3/search/${cacheKey}?api_key=${API_KEY}&query=${query}&page=${pageParam}`); 
    if(!response.ok) throw new Error("Failed to fetch")
    const data = await response.json();
    
    console.log(data);
    return data;
}

function MovieList() {
    const { query } = useParams();

    const isMovie = useAppStore(state => state.isMovie);

    const navigate = useNavigate();

     const cacheKey = isMovie ? "movie" : "tv";


    const{data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage, error} = useInfiniteQuery({
        queryKey: [cacheKey, query],
        queryFn: fetchMovies,
        getNextPageParam: (lastPage) => {
            if (lastPage.page < lastPage.total_pages) {
                return lastPage.page + 1;
            }
            return undefined;
        }
    })

    return(
        <div>
            
            <header className="flex justify-between border-b p-2 fixed top-0 left-0 w-full bg-black/20">
                <h1 className="text-xl font-bold text-red-600">MovieDb</h1>

                <button onClick={() => navigate("/")} className="inactive">Back Home</button>
            </header>
            
            <div className="mt-16 p-4">
                
                { isLoading &&<p>Searching for{query}...</p>}
                {error && <p>Error fetching the {isMovie? "movie" : "tv show"}</p>}
                {data?.pages[0].results.length == 0  && <p className="text-2xl">No {isMovie? "Movie" : "TV Show"} found matching <span className="font-semibold text-center">"{query}🥲"</span></p>}
                {data?.pages[0].results.length > 0 && <h1 className="text-2xl mb-4">Showing results for  <span className="font-semibold">"{query}"</span> ({data?.pages[0].total_results > 1? "matches" : "1 match"} found)</h1>}
               

                {data?.pages.map((page, index) => (
                    <div key={index} className="my-4">                
                        
                        <div className="flex flex-wrap gap-4 ">
                            {page.results.map(result => (
                                
                                <MovieCard 
                                    key={result.id}
                                    poster_path={result.poster_path}
                                    title={isMovie? result.title : result.name}
                                    date={isMovie? result.release_date : result.first_air_date}
                            
                                />
                            
                                
                            ))}
                        </div>

                       
                      
                    </div>
                    
                    ))}
                
                    {
                        hasNextPage &&
                        <button className="text-white bg-red-600 py-2 px-4 rounded-lg my-4 hover:bg-red-700 transition disabled:opacity-50"
                        onClick={fetchNextPage}
                        disabled={isFetchingNextPage}
                         >
                            {isFetchingNextPage? "Loading..." : "Load More"}
                        </button>
                    }
                        
                

            </div>
           

        </div>
    )

    
    
}

export default MovieList;