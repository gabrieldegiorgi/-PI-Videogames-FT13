import {
  filterByGenre,
  orderByRating,
  sortAlphabetically,
  sortAlphabeticallyAz,
  sortByRatingAsc,
} from "../../utils/index.js";
import { sortAlphabeticallyAsc } from "../actions/index.js";
import {
  VIDEOGAME_CREATED_REQUEST,
  VIDEOGAME_CREATED_SUCCESS,
  VIDEOGAME_CREATED_FAIL,
  VIDEOGAMES_DETAILS_REQUEST,
  VIDEOGAMES_DETAILS_SUCCESS,
  VIDEOGAMES_DETAILS_FAIL,
  VIDEOGAMES_SEARCH_REQUEST,
  VIDEOGAMES_SEARCH_SUCCESS,
  VIDEOGAMES_SEARCH_FAIL,
  SORT_BY_RATING_ASC,
  SORT_BY_RATING_DESC,
  SORT_ALPHABETICALLY_ASC,
  SORT_ALPHABETICALLY_DESC,
  FILTER_BY_GENRE,
  SET_VIDEOGAMES_REQUEST,
  SET_VIDEOGAMES_SUCCESS,
  SET_VIDEOGAMES_FAIL,
  SET_GENRES_REQUEST,
  SET_GENRES_SUCCESS,
  SET_GENRES_FAIL,
} from "../constants/index.js";

const initialState = {
  allVideogames: { loading: false, data: [] }, //Este estado es de referencia
  videogames: { loading: false, data: [] },
  videogameDetails: { loading: false, data: {} },
  videogameCreated: { loading: false, data: {} },
  videogamesSearch: { loading: false, data: [] },
  genres: { loading: false, data: [] },
};

export const videogamesReducer = (state = initialState, action) => {
  switch (action.type) {
    //LIST GAMES
    case SET_VIDEOGAMES_REQUEST:
      return {
        ...state,
        videogames: { loading: true },
        allVideogames: { loading: true },
      };
    case SET_VIDEOGAMES_SUCCESS:
      console.log("Este es el action.payload", action.payload);
      return {
        ...state,
        videogames: { loading: false, data: action.payload },
        allVideogames: { loading: false, data: action.payload },
      };
    case SET_VIDEOGAMES_FAIL:
      return {
        ...state,
        videogames: { loading: false, error: action.payload },
        allVideogames: { loading: false, error: action.payload },
      };

    //GENRES

    case SET_GENRES_REQUEST:
      return {
        ...state,
        genres: { loading: true },
      };
    case SET_GENRES_SUCCESS:
      console.log("Este es el action.payload", action.payload);
      return {
        ...state,
        genres: { loading: false, data: action.payload },
      };
    case SET_GENRES_FAIL:
      return {
        ...state,
        genres: { loading: false, error: action.payload },
      };

    // CREATED GAME

    case VIDEOGAME_CREATED_REQUEST:
      return { ...state, videogameCreated: { loading: true } };
    case VIDEOGAME_CREATED_SUCCESS:
      return {
        ...state,
        videogameCreated: { loading: false, data: action.payload },
      };
    case VIDEOGAME_CREATED_FAIL:
      return {
        ...state,
        videogameCreated: { loading: false, error: action.payload },
      };

    //DETAILS

    case VIDEOGAMES_DETAILS_REQUEST:
      return { ...state, videogameDetails: { loading: true } };
    case VIDEOGAMES_DETAILS_SUCCESS:
      return {
        ...state,
        videogameDetails: { loading: false, data: action.payload },
      };
    case VIDEOGAMES_DETAILS_FAIL:
      return {
        ...state,
        videogameDetails: { loading: false, error: action.payload },
      };

    //SEARCH

    case VIDEOGAMES_SEARCH_REQUEST:
      return { ...state, videogames: { loading: true } };
    case VIDEOGAMES_SEARCH_SUCCESS:
      /*  console.log(action.payload) */
      return {
        ...state,
        videogames: { loading: false, data: action.payload },
      };
    case VIDEOGAMES_SEARCH_FAIL:
      return {
        ...state,
        videogames: { loading: false, error: action.payload },
      };

    default:
      return state;

    //ORDENAR POR RAITING

    case SORT_BY_RATING_ASC: {
      return {
        ...state,
        videogames: {
          loading: false,
          data: orderByRating(state.videogames.data),
        },
      };
    }
    case SORT_BY_RATING_DESC: {
      return {
        ...state,
        videogames: {
          loading: false,
          data: orderByRating(state.videogames.data).reverse(),
        },
      };
    }

    //ORDENAR ALFABETICAMENTE

    case SORT_ALPHABETICALLY_ASC: {
      return {
        ...state,
        videogames: {
          loading: false,
          data: sortAlphabetically(state.videogames.data),
        },
      };
    }
    case SORT_ALPHABETICALLY_DESC: {
      return {
        ...state,
        videogames: {
          loading: false,
          data: sortAlphabetically(state.videogames.data).reverse(),
        },
      };
    }

    //FILTER BY GENRE

    case FILTER_BY_GENRE: {
      //POR CADA JUEGO QUE HAY EN EL ESTADO DE VIDEOGAMES, VOY A PREGUNTAR SICOINCIDE CON EL ARREGLO QUE ME LLEGA DE PAYLOAD (QUE ES EL DROPDOWN)
      //TENEMOS QUE DEVOLVER AQUEL QUE CUYO GENERO COINCIDE CON EL ACTION.PAYLOAD

      return {
        ...state,
        videogames: {
          loading: false,
          data: state.allVideogames.data.filter((v) =>
            filterByGenre(action.payload, v)
          ),
        },
      }; //
    }
  }
};
