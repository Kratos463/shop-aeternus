// Function to convert INR price to the selected currency and round it up to the nearest whole number
export const convertPrice = (price, selectedCurr) => {
    let convertedPrice = price / selectedCurr?.value;
    convertedPrice = Math.ceil(convertedPrice) + 1;
    return convertedPrice;
};


// function for truncate the title
export const truncateTitle = (title, maxLength) => {
    if (title.length > maxLength) {
      return title.slice(0, maxLength) + '...';
    }
    return title;
  };