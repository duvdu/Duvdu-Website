  // Find project Index From List
  export const findprojectIndex = (list, slug) => {
    const index = list.findIndex((item) => item.slug === slug);
    return index;
  };
  export const findprojectIndexById = (list, id) => {
    const index = list.findIndex((item) => item.id === id);
    return index;
  };
  
  export const convertToK = (number) => {
    // Check if the number is greater than or equal to 1000
    if (number >= 1000) {
        // If yes, divide the number by 1000 and append 'K'
        return (number / 1000).toFixed(2) + 'K';
    } else {
        // If no, return the original number
        return number;
    }
}