'use strict';

// Función que concatena el string "0" a un valor si este es menor que 10.
const formatNum = (num) => (num < 10 ? '0' + num : num);

// Exportamos la función.
export { formatNum };
