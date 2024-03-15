import { Link } from "react-router-dom";

const Card = ( { Anime } ) => {
    let genres = Anime.genre.slice("").join(", ")
  return (
    <>
    <Link to={`anime/${Anime.id}`}>
      <div className=" max-w-52 mx-auto rounded-3xl shadow-xl overflow-hidden bg-slate-700 hover:bg-slate-500">
        <div
          className="flex items-end justify-end h-64 bg-cover"
        >
            <img className="bg-cover" src={Anime.imgUrl} alt="pict" />
        </div>
        <div className="px-5 py-3">
          <h4 className="text-white uppercase font-bold">{Anime.title}</h4><br />
          <span className="text-white mt-2 font-mono">{genres}</span>
        </div>
      </div>
    </Link>
    </>
  );
};

export default Card;
