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
} from "../constants/index.js";

const initialState = {
  videogames: { loading: false, videogames: [] },
};

export const videogamesReducer = (state = initialState, action) => {
  switch (action.type) {
    case VIDEOGAMES_LIST_REQUEST:
      return {
        ...state,
        videogames: { loading: true },
      };
    case VIDEOGAMES_LIST_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        videogames: { loading: false, videogames: action.payload },
      };
    case VIDEOGAMESS_LIST_FAIL:
      return {
        ...state,
        videogames: { loading: false, error: action.payload },
      };
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
        pokemonDetails: { loading: false, error: action.payload },
      };
    case VIDEOGAMES_SEARCH_REQUEST:
      return { ...state, videogames: { loading: true } };
    case VIDEOGAMES_SEARCH_SUCCESS:
      return {
        ...state,
        videogamesSearch: {
          loading: false,
          videogamesSearch: [action.payload],
        }, //Lo envuelvo entre [] porque para mapearlo tengo que mandarle un arreglo en vez de un {}
      };
    case VIDEOGAMES_SEARCH_FAIL:
      return {
        ...state,
        videogames: { loading: false, error: action.payload },
      };

    default:
      return state;
  }
};
