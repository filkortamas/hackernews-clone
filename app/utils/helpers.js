export const getFormatedDateFromNumber = dateNumber => {
  const dateTime = new Date(dateNumber * 1000);
  return `${dateTime.getDay()}/${dateTime.getMonth()}/${dateTime.getFullYear()}, ${dateTime.getHours()}:${
    dateTime.getMinutes().toString().length > 1 ? '' : '0'
  }${dateTime.getMinutes()}`;
};

export const tousandSeparator = (number, separator = ',') =>
  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
