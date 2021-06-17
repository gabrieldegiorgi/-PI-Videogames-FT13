import {
  filterByGenre,
  sortAlphabeticallyAz,
  sortByRatingAsc,
} from "../../utils/index.js";
import { sortAlphabeticallyAsc } from "../actions/index.js";
import {
  VIDEOGAMES_LIST_REQUEST,
  VIDEOGAMES_LIST_SUCCESS,
  VIDEOGAMESS_LIST_FAIL,
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
} from "../constants/index.js";

const initialState = {
  allVideogames: { loading: false, data: [] }, //Este estado es de referencia
  videogames: { loading: false, data: [] },
  videogameDetails: { loading: false, data: {} },
  videogameCreated: { loading: false, data: {} },
  videogamesSearch: { loading: false, data: [] },
};

export const videogamesReducer = (state = initialState, action) => {
  switch (action.type) {
    //LIST GAMES
    case VIDEOGAMES_LIST_REQUEST:
      return {
        ...state,
        videogames: { loading: true },
        allVideogames: { loading: true },
      };
    case VIDEOGAMES_LIST_SUCCESS:
      return {
        ...state,
        videogames: { loading: false, data: action.payload },
        allVideogames: { loading: false, data: action.payload },
      };
    case VIDEOGAMESS_LIST_FAIL:
      return {
        ...state,
        videogames: { loading: false, error: action.payload },
        allVideogames: { loading: false, error: action.payload },
      };

    // CREATED GAME

    case VIDEOGAME_CREATED_REQUEST:
      return { ...state, videogames: { loading: true } };
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
          data: state.videogames.data.sort(sortByRatingAsc),
        },
      };
    }
    case SORT_BY_RATING_DESC: {
      return {
        ...state,
        videogames: {
          loading: false,
          data: state.videogames.data.sort(sortByRatingAsc).reverse(),
        },
      };
    }

    //ORDENAR ALFABETICAMENTE

    case SORT_ALPHABETICALLY_ASC: {
      return {
        ...state,
        videogames: {
          loading: false,
          data: state.videogames.data.sort(sortAlphabeticallyAsc),
        },
      };
    }
    case SORT_ALPHABETICALLY_DESC: {
      return {
        ...state,
        videogames: {
          loading: false,
          data: state.videogames.data.sort(sortAlphabeticallyAsc).reverse(),
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
