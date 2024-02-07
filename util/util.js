  // Find project Index From List
  export const findprojectIndex = (list, slug) => {
    const index = list.findIndex((item) => item.slug === slug);
    return index;
  };
  export const findprojectIndexById = (list, id) => {
    const index = list.findIndex((item) => item.id === id);
    return index;
  };
  
  export const convertToK = (number,afterpoint) => {
    if (number >= 1000) {
      return (number / 1000).toFixed(afterpoint) + 'K';
    } else {
      return number;
    }
  }

  export const deleteProduct = (list, slug) => {
    return null;
  };
  export const findProductIndexById = (list, slug) => {
    return null;
  };
