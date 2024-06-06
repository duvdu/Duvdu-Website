
import exclude_errors from '../public/static/exclude_errors.json'
import exclude_loadings from '../public/static/exclude_loading.json'

export const findprojectIndex = (list, slug) => {
  const index = list.findIndex((item) => item.slug === slug);
  return index;
};
export const findProductIndexById = (list, id) => {
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

export function handleFileUpload(event) {
  const file = event?.target?.files[0] || event?.target?.file// Get the first selected file
  if (!file) {
    return; // No file selected, do nothing
  }

  const fileName = file.name; // Extract the file name
  const fileType = file.type; // Get the file type
  const fileSize = file.size; // Get the file size in bytes

  // Format the file size for human readability (optional)
  const formattedFileSize = formatFileSize(fileSize);

  const fileInfoText = `
  <b>File Name:</b> ${fileName}<br>
  <b>File Type:</b> ${fileType}<br>
  <b>File Size:</b> ${formattedFileSize}
  `;

  // Display the file information in the specified element
  return {
    fileName: fileName,
    fileType: fileType,
    formattedFileSize: formattedFileSize,
    file: file
  };
}

export function handleMultipleFileUpload(event) {
  const files = event.target.files; // Get all selected files
  if (!files?.length) {
    return []; // No files selected, return empty array
  }

  // Convert FileList to an array and map over it to gather file info
  return Array.from(files).map(file => {
    const fileName = file.name;
    const fileType = file.type;
    const fileSize = file.size;

    // Optional: Format the file size for human readability
    const formattedFileSize = formatFileSize(fileSize);

    return {
      fileName: fileName,
      fileType: fileType,
      formattedFileSize: formattedFileSize,
      file: file
    };
  });
}

export function handleMultipleFileUploadUpdated(event) {
  const files = event.target.files; // Get all selected files
  if (!files.length) {
    return []; // No files selected, return empty array
  }

  // Convert FileList to an array and map over it to gather file info
  const data = Array.from(files).map(file => {
    const fileName = file.name;
    const fileType = file.type;
    const fileSize = file.size;

    // Optional: Format the file size for human readability
    const formattedFileSize = formatFileSize(fileSize);

    return {
      fileName: fileName,
      fileType: fileType,
      formattedFileSize: formattedFileSize,
      file: file
    };
  });
  return { data: data, files: files }
}

export function gettFileURL(file) {
  try {
    return URL.createObjectURL(file ?? null)
  }
  catch (ex) {
    return null
  }

}
export function gettFileUploaded(file) {
  const data = handleFileUpload(file);
  try {
    return URL.createObjectURL(data.file ?? null)
  }
  catch (ex) {
    return null
  }

}

// Function to format file size for human readability (optional)
function formatFileSize(bytes) {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let i = 0;
  while (bytes > 1024 && i < units.length - 1) {
    bytes /= 1024;
    i++;
  }
  return `${bytes.toFixed(2)} ${units[i]}`;
}

export function parseFileSize(sizeString) {
  const units = ["B", "KB", "MB", "GB", "TB"];
  const regex = /([\d.]+)\s*(B|KB|MB|GB|TB)/i;
  const match = sizeString.match(regex);

  if (!match) {
    throw new Error("Invalid size format");
  }

  const value = parseFloat(match[1]);
  const unit = match[2].toUpperCase();

  const unitIndex = units.indexOf(unit);
  if (unitIndex === -1) {
    throw new Error("Invalid unit");
  }

  return value * Math.pow(1024, unitIndex);
}

export const Goback = () => {
  window.history.back()
};


export const convertDuration = (durationInMilliseconds) => {
  const totalSeconds = Math.floor(durationInMilliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const formattedDuration = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  return formattedDuration;
};

export const errorConvertedMessage = (error) => {
  if (!error) return null;

  try {
    const errorConverted = JSON.parse(error);

    try {
      const errors = errorConverted.data.errors;

      if (errors.length === 1) {

        return `<div class="error-msg" >${errors[0].message}</div>`;
      }
      
      
      const hasFieldErrors = errors.some(error => error.field);

      if (hasFieldErrors) {
        
        const formattedMessages = errors.map(error => `<li>${error.field}: ${error.message}</li>`).join('');
        return `<strong>Error Fields:</strong><ul style="padding-left:20px;">${formattedMessages}</ul>`;
      } else {

        const formattedMessages = errors.map(error => `<li>${error.message}</li>`).join('');
        return `<strong>Error Messages:</strong><ul style="padding-left:20px;">${formattedMessages}</ul>`;
      }
    } catch (err) {
      const errorMessage = errorConverted.data.message;
      return `<div class="error-msg" >${errorMessage}</div>`;
      
    }
  } catch (err) {
    return error.toString();
  }
};

function validateErrorsAsList(data) {
  // Check if 'data' is an object
  if (typeof data !== 'object' || data === null) {
    // console.log("Invalid data: Not an object.");
    return false;
  }

  // Check if 'data' has a property 'errors'
  if (!data.hasOwnProperty('errors')) {
    // console.log("Invalid data: 'errors' property missing.");
    return false;
  }

  // Check if 'data.errors' is an array
  if (!Array.isArray(data.errors)) {
    // console.log("Invalid data: 'errors' is not an array.");
    return false;
  }

  // Optional: Check if 'data.errors' array has elements
  if (data.errors.length === 0) {
    // console.log("Warning: 'errors' array is empty.");
    return false;  // Change to 'true' if empty array is acceptable
  }

  // Optional: Check each element in the array (if you expect each element to have certain properties)
  data.errors.forEach((error, index) => {
    if (!error.hasOwnProperty('message') || !error.hasOwnProperty('field')) {
      // console.log(`Invalid format in errors array at index ${index}: Required properties missing.`);
      return false;
    }
  });

  // console.log("Validation successful: data.errors[index] path is valid.");
  return true;
}

export const handleRemoveEvent = (e) => {
  if (e.target)
    e.target.value = null
  if (e.current)
    e.current.value = null;

};

export const getAllTagsOfSubcategories = (categories, categoryId) => {

  const category = categories.find(cat => cat._id === categoryId);
  if (!category) {
    return []; // Return an empty array if no category is found
  }

  // Aggregate all tags from all subcategories of the found category
  const allTags = category.subCategories.reduce((acc, subCategory) => {
    return acc.concat(subCategory.tags); // Collect all tags
  }, []);

  return allTags;
}

export const exclude_error = (errorReq) => {
  // return false
  return exclude_errors.includes(errorReq) ? true : false
}
export const exclude_loading = (loadingReq) => {
  // return false
  return exclude_loadings.includes(loadingReq) ? true : false
}

export const filterByCycle = (categories, cycleType) => {
  if (!Array.isArray(categories)) {
    throw new TypeError('Expected an array of categories');
  }
  return categories.filter(category => category.cycle === cycleType);
}

export const noScroll = (event) => {
  const body = document.body;

  if (event) {
    body.style.overflow = 'hidden';
  } else {
    body.style.overflow = 'visible';
  }
}

export const convertToFormData = (data, avoidfeilds = []) => {
  const formData = new FormData();

  Object.keys(data).forEach(key => {
    // Append each key-value pair to the FormData instance
    if (avoidfeilds.includes(key)) return
    formData.append(key, data[key]);
  });

  return formData;
}
export const OpenPopUp = (id) => {
  const editBoardElement = document.querySelector('#' + id);
  if (editBoardElement) {
    editBoardElement.classList.add('show');
  }
}
export const ClosePopUp = (id) => {
  const editBoardElement = document.querySelector('#' + id);
  if (editBoardElement) {
    editBoardElement.classList.remove('show');

  }
}

export const validatePassword = (password) => {
  if (password.length < 8) {
    return 'Password must be at least 8 characters long.';
  }

  const uppercaseRegex = /[A-Z]/;
  if (!uppercaseRegex.test(password)) {
    return 'Password must contain at least one uppercase letter.';
  }

  const lowercaseRegex = /[a-z]/;
  if (!lowercaseRegex.test(password)) {
    return 'Password must contain at least one lowercase letter.';
  }

  const specialCharRegex = /[^A-Za-z0-9]/;
  if (!specialCharRegex.test(password)) {
    return 'Password must contain at least one special character.';
  }

  return null;
};


export const UpdateKeysAndValues = (obj, onUpdate, avoidFields = [], prefix = '') => {
  Object.keys(obj).forEach(key => {
    if (avoidFields.includes(key)) return; // Skip processing if key is in avoidFields
    const value = obj[key];
    const prefixedKey = `${prefix}${prefix ? '.' : ''}${key}`;
    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        const arrayKey = `${prefixedKey}[${index}]`;
        if (onUpdate) onUpdate(arrayKey, item);
      });
    } else if (value && typeof value === 'object' && value !== null) {
      UpdateKeysAndValues(value, onUpdate, avoidFields, prefixedKey); // Pass avoidFields down
    } else {
      if (onUpdate) onUpdate(prefixedKey, value);
    }
  });
};


export const isFav = (idproject, FavList) => {
  // Check if FavList has at least one element
  FavList = FavList?.data || []
  if (FavList.length === 0) return false;
  // Access the first board in FavList
  const firstBoard = FavList[0];
  // Check if any project's ID in the first board matches the given idproject
  return firstBoard.projects.some(project => project.project._id === idproject);
};

export const isProjectInObject = (data, projectId) => {
  for (const board of data) {
    for (const project of board.projects) {
      if (project._id === projectId) {
        return false;
      }
    }
  }
  return true;
}

export const calculateRating = (rate) => {
  if (!rate) return 0
  if (rate.ratersCounter > 0) {
    return rate.totalRates / rate.ratersCounter;
  }
  return 0;
};

export const formatRemainingTime = (milliseconds) => {
  let remainingTime = Math.max(milliseconds, 0); // Ensure the time is non-negative
  const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  remainingTime %= (1000 * 60 * 60 * 24);
  const hours = Math.floor(remainingTime / (1000 * 60 * 60));
  remainingTime %= (1000 * 60 * 60);
  const minutes = Math.floor(remainingTime / (1000 * 60));
  
  const timeParts = [];
  
  if (days > 0) {
      timeParts.push(`${days} day${days > 1 ? 's' : ''}`);
  }
  if (hours > 0) {
      timeParts.push(`${hours} hour${hours > 1 ? 's' : ''}`);
  }
  if (minutes > 0) {
      timeParts.push(`${minutes} minute${minutes > 1 ? 's' : ''}`);
  }
  
  return timeParts.join(' ');
};