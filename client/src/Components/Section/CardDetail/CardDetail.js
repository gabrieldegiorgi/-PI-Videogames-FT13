import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogameDetails } from "../../../Redux/actions";
import { useParams } from "react-router-dom";
import "./CardDetail.css";

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

  useEffect(() => {
    dispatch(getVideogameDetails(id));
  }, []);

  console.log("Esta es la data POSTA", videogame);
  return (
    <div className="card-detail">
      {data && (
        <div>
          <div>
            <img className="card-detail-img" src={data.background_image}></img>
          </div>
          <div className="card-detail-name">
            <span>{data.name}</span>
          </div>
          <div className="card-detail-genre">
            {<span>{data.genres && data.genres.map((g) => g.name)}</span>}
          </div>

          <span>{data.description}</span>
          <div>
            <span className="card-detail-platforms">
              <h3>Plataformas:</h3>
              {data.platforms &&
                data.platforms.map((p) => (
                  <span className="card-detail-platform">
                    {" "}
                    {p.platform.name}
                  </span>
                ))}
            </span>
          </div>
          <span>
            <h3>Lanzamiento:</h3>
            {data.updated}
          </span>
          {
            <span>
              <h3>Opiniones:</h3>
              {data.ratings && data.ratings.map((r) => r.title)}
            </span>
          }
        </div>
      )}
    </div>
  );
}

export default CardDetail;
