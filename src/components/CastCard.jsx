function CastCard({profile_path, name, character}){    
    const imageBaseUrl = "https://image.tmdb.org/t/p/w200";
    const fallbackImage = "https://img.freepik.com/free-photo/blue-smooth-textured-paper-background_53876-103923.jpg?semt=ais_hybrid" 

    const profileImg = profile_path? `${imageBaseUrl + profile_path}` : fallbackImage;

    return(
        <div className="flex flex-col gap-1 gap-1 min-w-[100px] md:min-w-[150px] xl:min-w-[170px]  hover:scale-105 transition  rounded-xl border cursor-pointer ">
            <img className="rounded-xl flex-1" src={profileImg} alt={character} />
            <h1 className="truncate text-sm md:text-lg xl:text-xl font-semibold ml-1">{name}</h1>
            <p className="truncate m-1 text-gray-500 text-sm md:text-lg xl:text-xl">{character}</p>
        </div>

       
    )
}

export default CastCard;