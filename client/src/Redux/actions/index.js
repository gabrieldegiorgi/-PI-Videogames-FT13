import axios from "axios";
import dotenv from "dotenv";
impS_LIST_FAIL,
  VIDEOGAME_CREATED_REQUEST,
  VIDEOGAME_CREATED_SUCCESS,
  VIDEOGAME_CREATED_FAIL,
  VIDEOGAMES_DEort {
  VIDEOGAMES_LIST_REQUEST,
  VIDEOGAMES_LIST_SUCCESS,
  VIDEOGAMESTAILS_REQUEST,
  VIDEOGAMES_DETAILS_SUCCESS,
  VIDEOGAMES_DETAILS_FAIL,
  VIDEOGAMES_SEARCH_REQUEST,
  VIDEOGAMES_SEARCH_SUCCESS,
  VIDEOGAMES_SEARCH_FAIL
} from "../constants/index.js";

dotenv.config();

const { REACT_APP_GET_GAMES } = process.env;

export const getVideogames = () => async (dispatch) => {
  dispatch({
    type: VIDEOGAMES_LIST_REQUEST,
  });
  try {
    const { data } = await axios.get(`${REACT_APP_GET_GAMES}`);
    console.log(data);
    dispatch({ type: VIDEOGAMES_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: VIDEOGAMESS_LIST_FAIL, payload: error.message });
  }
};

export const createVideogame = () => async (dispatch) => {
  dispatch({
    type: VIDEOGAME_CREATED_REQUEST,
  });
  try {
    const { data } = await axios.post(
      `${REACT_APP_BASE_URL}`
    );
    dispatch({ type: VIDEOGAME_CREATED_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: VIDEOGAME_CREATED_FAIL, payload: error.message });
  }
};

export const getVideogameDetails = (videogameId) => async (dispatch) => {
  dispatch({ type: VIDEOGAMES_DETAILS_REQUEST });
  try {
    const { data } = await axios.get(
      `${REACT_APP_BASE_URL}${videogameId}`
    );
    console.log(data);
    dispatch({ type: VIDEOGAMES_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: VIDEOGAMES_DETAILS_FAIL, payload: error.message });
  }
};

export const videogameSearch = (videogameName) => async (dispatch) => {
  dispatch({ type: VIDEOGAMES_SEARCH_REQUEST });
  console.log(videogameName);
  try {
    const { data } = await axios.get(
      `${REACT_APP_BASE_URL}/?name=${pokemonName}`
    );
    console.log(data, "ok");

    dispatch({ type: VIDEOGAMES_SEARCH_SUCCESS, payload: data });
  } catch (error) {
    console.log("no se encontro");
    dispatch({ type: VIDEOGAMES_SEARCH_FAIL, payload: error.message });
  }
};
