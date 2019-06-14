
/**************************************************************************************************
funcion:sortAscending
argument:items,fields
Description:below function is implementing the logic for list with assending order
***************************************************************************************************/
import { FilterQuery } from "./config";
export const sortAscending = (items, fields) => {
  if (fields === "price") {
    items.sort(function (a, b) {
      a = parseFloat(a.price.replace(/[^\d]/, ''));
      b = parseFloat(b.price.replace(/[^\d]/, ''));
      return a - b;
    });
  }
  else if (fields === "inStock") {
    items.sort((a, b) => { return a[fields] - b[fields] })
  } else {
    items.sort((a, b) => a[fields] - b[fields]);
  }
  return items;
};

/**************************************************************************************************
funcion:sortDescending
argument:items,fields
Description:below function is implementing the logic for list with desending order
***************************************************************************************************/
export const sortDescending = (items, fields) => {
  if (fields === "price") {
    items.sort(function (a, b) {
      a = parseFloat(a.price.replace(/[^\d]/, ''));
      b = parseFloat(b.price.replace(/[^\d]/, ''));
      return b - a;
    });
  } else if (fields === "inStock") {
    items.sort((a, b) => { return b[fields] - a[fields] })
  } else {
    items.sort((a, b) => b[fields] - a[fields]);
  }
  return items;
};

/**************************************************************************************************
funcion:UserFilterQuery
argument:data
Description:below function is creating the fetch URL query parameters based on user selection input
***************************************************************************************************/
export const UserFilterQuery = (data) => {
  let url = new URL(FilterQuery);
  Object.keys(data).forEach(key => {
    if (data[key].length > 0) {
      url.searchParams.append(key, data[key]);
    }
  });
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(res => res.json())
      .then(res => {
        resolve(res.products);
      })
  })
};