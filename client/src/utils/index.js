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
      //Si el indice de videogames es mayor al arreglo ya no hay mas videogames para mostrar
      pagination.next = page + 1; //4 // 6
    }
    pagination.count = Math.ceil(array.length / limit);
    result.pagination = pagination;
    result.result = array.slice(startIndex, endIndex); //Voy a mostrar los videogames desde el 16 hasta el 24 // 32 al 40

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
export const filterByGenre = (array, videogame) => {
  //console.log("Entro aca")
  if (array.includes(videogame.genres[0].name.toString().toLowerCase())) {
    // console.log("Coincide")
    return true;
  }
  /* console.log("NO coincide") */
  return false;
};

export const sortAlphabetically = (array) => {

  const alphabeticallyFiltered = [...array];
  
  alphabeticallyFiltered.sort((a, b) => (a.name < b.name ? 1 : -1));
  
  return alphabeticallyFiltered;
};

export const orderByRating = (array) => {
  const ratingFiltered = [...array];
/*   console.log(ratingFiltered) */
  ratingFiltered.sort((a, b) => (a.rating < b.rating ? 1 : -1));
  
  return ratingFiltered;

};


export function validate(input) {
  let errors = {};

  if (!input.name) {
    errors.name = "El nombre es obligatorio";
  } else if (!/^[a-zA-Z0-9]+$/.test(input.name)) {
    errors.name = "El nombre es invalido";
  }
  if (!input.description) {
    errors.description = "La descripcion es obligatorio";
  } else if (!/^[a-zA-Z0-9]+$/.test(input.description)) {
    errors.description = "La descripcion es invalida";
  }
  if (!input.date) {
    errors.date = "La fecha es obligatoria";
  } else if (!/^(0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2}$/.test(
      input.date
    )
  ) {
    errors.date = "La fecha es invalida";
  }

  if (!input.rating) {
    errors.rating = "El rating es obligatorio";
  } else if (!/^[0-9]+$/.test(input.rating)) {
    errors.rating = "El rating es invalido";
  }

  return errors;
}


/* 
export const sortAlphabeticallyAz = (a, b) => {
  if (a.name < b.name) return -1;
  if (b.name < a.name) return 1;
  return 0;
};

export const sortByRatingAsc = (a, b) => {
  return a.rating - b.rating;
};
 */