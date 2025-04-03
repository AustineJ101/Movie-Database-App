import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAppStore from "../store/app";
import YouTube from "react-youtube";
import CastCard from "../components/CastCard";
const  API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function MovieDetails(){
    const {id} = useParams();
    const navigate = useNavigate();
    const isMovie = useAppStore(state => state.isMovie);
    const imageBaseUrl = "https://image.tmdb.org/t/p/original";
    const fallbackImage = "https://img.freepik.com/free-photo/blue-smooth-textured-paper-background_53876-103923.jpg?semt=ais_hybrid" //In case the backdrop_path is null
    const trailerUrl = `https://api.themoviedb.org/3/${isMovie? "movie" : "tv"}/${id}/videos?api_key=${API_KEY}`;
    const castUrl = `https://api.themoviedb.org/3/${isMovie? "movie" : "tv"}/${id}/credits?api_key=${API_KEY}`

    const getTrailerKey = async () =>{
        const response = await fetch(trailerUrl);
        if(!response.ok) throw new Error("Failed to fetch trailer");
        const data = await response.json();

        const trailer = data.results.find(video => video.type  === "Trailer" && video.site === "YouTube");

        return trailer;
        
    }

    const {data: trailer} = useQuery({
        queryKey: [id, "trailer"],
        queryFn: getTrailerKey
    });

    const getCast = async () => {
        const response = await fetch(castUrl);
        if(!response.ok) throw new Error("Failed to fetch cast");
        const data = await response.json();

        return data;
    }

    const {data: cast, isLoading: castLoading, error: castError} = useQuery({
        queryKey: [id, "cast"],
        queryFn: getCast
    })

    const fetchDetails = async ({queryKey}) => {
        const [cacheKey, id] = queryKey;
        const url = `https://api.themoviedb.org/3/${cacheKey}/${id}?api_key=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        
       return data;
    }

    const cacheKey = isMovie? "movie" : "tv";
   

    const {data, isLoading, error} = useQuery({
        queryKey: [cacheKey, id],
        queryFn: fetchDetails
    })

    const imageUrl = data?.backdrop_path? `${imageBaseUrl + data.backdrop_path}` : fallbackImage;

    if(isLoading){
        return <div className="w-10 h-10 rounded-full border-2 border-red-100 border-r-red-600 animate-spin mx-auto mt-64"></div>
    }

    if(error){
        return <p>{error.message}</p>
    }

    return(
        <div>
            {/* Banner Start */}
            <div className="h-[300px] md:h-[500px] bg-cover bg-center" 
            style={{backgroundImage: `url(${imageUrl})`}}
            >

                <header className="flex justify-between border-b p-2 fixed top-0 left-0 w-full bg-black z-50">
                    <h1 className="text-base md:text-xl xl:text-2xl font-bold text-red-600">MovieDb</h1>

                    <button onClick={() => navigate("/")} className="inactive">Back Home</button>
                </header>
               
            </div>
            {/* Banner End */}


            <div className="p-2 flex items-center pt-4 justify-between border-b">
                <h1 className="text-lg md:text-2xl lg:text-3xl font-bold text-red-600" >{isMovie? data?.title : data?.name} {!isMovie? <span className="block sm:inline">({(data?.seasons.length) > 1 ? data?.seasons.length + " Seasons" :data?.seasons.length +  " Season"})</span> : ""}</h1>

                <div className="text-base md:text-xl xl:text-2xl text-red-600 font-semibold">
                    Rating: <span className="bg-red-600 text-sm md:text-lg text-white p-2  rounded-full cursor-pointer hover:bg-red-700 transition">{data?.vote_average.toFixed(1)}</span>
                </div>
            </div>

        {/* Genre */}
            <div className="m-2 text-gray-400 cursor-pointer ">
                {data?.genres.map(genre => (
                    <span className="hover:text-red-600 transition text-sm md:text-base"> {genre.name} |</span>
                ))}
            </div>

        {/* Overview  and Trailer*/}
            <div className="m-2 grid grid-cols-1 lg:grid-cols-2 gap-4  ">
                
                <div>
                    <h1 className="text-base md:text-xl lg:text-2xl text-red-600 font-semibold underline mb-2">Plot Summary</h1>
                    <div className="text-sm md:text-base lg:text-xl ">
                        {data?.overview}
                    </div>
                    
                </div>
                   
               
                <div className="border">
                   
                    {trailer?.key ? (<YouTube videoId={trailer?.key} opts={{width: "100%", height: "400px"}}></YouTube>) :
                    (<p className="text-lg text-center mt-8 text-red-500">Trailer not available!!</p>)}
                    
                    
                </div>
            </div>

            
        
        {/* Cast */}

              <div>
                <h1 className="text-base md:text-xl  lg:text-2xl text-red-600 font-semibold underline mb-2 ml-2">Cast</h1>
                {castLoading && <p>Loading cast ...</p>}
                
                <div className="flex gap-2 overflow-x-auto p-4">
                {cast?.cast.map(character => (
                    <CastCard 
                        profile_path={character.profile_path}
                        name={character.name}
                        character={character.character}
                    />
                ))}
                </div>
                    
              
              </div>
           
        </div>
    )
}
export default MovieDetails;