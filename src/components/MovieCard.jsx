import SearchBar from "./SearchBar";

function MovieCard({poster_path, title, date}){
    const imageBaseUrl = "https://image.tmdb.org/t/p/w200"
    return(
        <>
        <SearchBar />
        <div className="flex flex-col gap-1 w-[200px] hover:scale-105 transition  rounded-xl border cursor-pointer ">
            <img className="rounded-xl" src={imageBaseUrl+poster_path} alt={title} />
            <h1 className="truncate text-xl font-semibold ml-1">{title}</h1>
            <p className="m-1 text-gray-500">{date}</p>
        </div>
        </>
       
    )
}

export default MovieCard;