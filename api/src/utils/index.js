//Se usa desde el Front

/* 
function paginate(array, page) {
  // page = 3 // page = 5
  if (array) {
      const limit = 15
    if (!page) {
      page = 1;
    }
    const startIndex = (page - 1) * limit; //16 // 32
    const endIndex = page * limit; //24 // 40
    const pagination = {};
    const result = {};
    pagination.actual = page; //3 // 5
    if (startIndex > 0) {
      pagination.previous = page - 1; //2 //4
    }
    if (endIndex < array.lenght) {
      //Si el indice de pokemons es mayor al arreglo ya no hay mas pokemons para mostrar
      pagination.next = page + 1; //4 // 6
    }
    pagination.count = Math.ceil(array.lenght / limit);
    result.pagination = pagination;
    result.result = array.slice(startIndex, endIndex); //Voy a mostrar los pokemons desde el 16 hasta el 24 // 32 al 40
    return result.result;
  } else {
    console.log("No cargo el array");
  }
}

module.exports = { paginate };
 */