  // Find project Index From List
  export const findprojectIndex = (list, slug) => {
    const index = list.findIndex((item) => item.slug === slug);
    return index;
  };
  export const findprojectIndexById = (list, id) => {
    const index = list.findIndex((item) => item.id === id);
    return index;
  };
  