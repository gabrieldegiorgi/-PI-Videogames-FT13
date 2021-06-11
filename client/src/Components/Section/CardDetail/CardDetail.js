import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogameDetails } from "../../../Redux/actions";
import { useParams } from "react-router-dom";

function CardDetail() {
  const dispatch = useDispatch();
  const videogame = useSelector(
    (state) => state.videogamesReducer.videogameDetails.data
  );
  var data = {};

  if (videogame) {
    data = videogame;
  }
  const { id } = useParams();
  console.log("Aguante la falopa", id);

  useEffect(() => {
    dispatch(getVideogameDetails(id));
  }, []);
  console.log("Esta es la data POSTA", videogame);
  return (
    <div>
      {data && (
        <div>
          <img className="videogameImg" src={data.background_image}></img>
          <span>{data.name}</span>
          {<span>{data.genres && data.genres.map((g) => g.name)}</span>}

          <span>{data.description}</span>
          <span>
            {data.platforms && data.platforms.map((p) => p.platform.name)}
          </span>
          <span>{data.updated}</span>
          {<span>{data.ratings && data.ratings.map((r) => r.title)}</span>}
        </div>
      )}
    </div>
  );
}

export default CardDetail;
