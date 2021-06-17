export const paginate = (array, page) => {
  // page = 3 // page = 5
  if (array) {
    const limit = 15;
    if (!page) {
      page = 1;
    }
    const startIndex = (page - 1) * limit; //16 // 32
    const endIndex = page * limit; //24 // 40
    const pagination = {};
    const result = {};
    pagination.actual = page; //3 // 5

    if (startIndex > 0) {
      pagination.prev = page - 1; //2 //4
    }
    if (endIndex < array.length) {
      //Si el indice de pokemons es mayor al arreglo ya no hay mas pokemons para mostrar
      pagination.next = page + 1; //4 // 6
    }
    pagination.count = Math.ceil(array.length / limit);
    result.pagination = pagination;
    result.result = array.slice(startIndex, endIndex); //Voy a mostrar los pokemons desde el 16 hasta el 24 // 32 al 40

    /* pagination = {
    count: arreglo / limit ---> 3
    next: 1
    prev: 

    } */

    /* result = {
    pagination: {
      count: arreglo / limit ---> 3
    }
    result: {
      El arrelgo cortado
    }

    } */
    return result;
  } else {
    console.log("No cargo el array");
  }
};

export const sortAlphabeticallyAz = (a, b) => {
  if (a.name < b.name) return -1;
  if (b.name < a.name) return 1;
  return 0;
};

export const sortByRatingAsc = (a, b) => {
  return a.rating - b.rating;
};

export const filterByGenre = (array, videogame) => {
  //console.log("Entro aca")
  if (array.includes(videogame.genres[0].name.toString().toLowerCase())) {
   // console.log("Coincide")
    return true;
  }
  /* console.log("NO coincide") */
  return false;
};
