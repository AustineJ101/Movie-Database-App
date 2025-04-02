import { useNavigate } from "react-router-dom";

function MovieCard({poster_path, title, date, id}){    
    const imageBaseUrl = "https://image.tmdb.org/t/p/w200";
    const fallbackImage = "https://img.freepik.com/free-photo/blue-smooth-textured-paper-background_53876-103923.jpg?semt=ais_hybrid" 

    const posterImg = poster_path? `${imageBaseUrl + poster_path}` : fallbackImage; // Handle cases where poster_path is null

    const navigate = useNavigate();

    return(
        <div onClick={() => navigate(`/details/${id}`)} className="flex flex-col gap-1 min-w-[100px] md:min-w-[150px] xl:min-w-[170px] 2xl:min-w-[200px]  hover:scale-105 transition  rounded-xl border cursor-pointer ">
            <img className="rounded-xl flex-1" src={posterImg} alt={title} />
            <h1 className="truncate text-sm md:text-lg xl:text-xl 2xl:text-2xl font-semibold ml-1">{title}</h1>
            <p className="m-1 text-sm md:text-lg xl:text-xl 2xl:text-2xl text-gray-500">{date}</p>
        </div>

       
    )
}

export default MovieCard;