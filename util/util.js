// Find project Index From List
export const findprojectIndex = (list, slug) => {
  const index = list.findIndex((item) => item.slug === slug);
  return index;
};
export const findprojectIndexById = (list, id) => {
  const index = list.findIndex((item) => item.id === id);
  return index;
};

export const convertToK = (number, afterpoint) => {
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


export function convertHoursTo__(hours) {
  // Define constants for conversion rates
  const hoursInDay = 24;
  const daysInMonth = 30; // Assuming a month has 30 days for simplicity
  const daysInYear = 365; // Assuming a year has 365 days for simplicity

  // Calculate years
  const years = Math.floor(hours / (hoursInDay * daysInYear));

  // Calculate remaining hours after subtracting years
  const remainingHoursAfterYears = hours % (hoursInDay * daysInYear);

  // Calculate months
  const months = Math.floor(remainingHoursAfterYears / (hoursInDay * daysInMonth));

  // Calculate remaining hours after subtracting months
  const remainingHoursAfterMonths = remainingHoursAfterYears % (hoursInDay * daysInMonth);

  // Calculate days
  const days = Math.floor(remainingHoursAfterMonths / hoursInDay);

  // Calculate remaining hours after subtracting days
  const remainingHours = remainingHoursAfterMonths % hoursInDay;

  let result = "";
  if (years > 0) {
      result += `${years} year${years > 1 ? 's' : ''}`;
  }
  if (months > 0) {
      result += `${result.length > 0 ? ', ' : ''}${months} month${months > 1 ? 's' : ''}`;
  }
  if (days > 0) {
      result += `${result.length > 0 ? ', ' : ''}${days} day${days > 1 ? 's' : ''}`;
  }
  if (remainingHours > 0) {
      result += `${result.length > 0 ? ', ' : ''}${remainingHours} hour${remainingHours > 1 ? 's' : ''}`;
  }

  return result;
}
