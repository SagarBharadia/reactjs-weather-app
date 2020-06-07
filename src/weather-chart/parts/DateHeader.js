import React from "react";

const getFullDay = (dayNumber) => {
  let fullDay = "";
  switch (dayNumber) {
    case 1:
      fullDay = "Monday ";
      break;
    case 2:
      fullDay = "Tuesday ";
      break;
    case 3:
      fullDay = "Wednesday ";
      break;
    case 4:
      fullDay = "Thursday ";
      break;
    case 5:
      fullDay = "Friday ";
      break;
    case 6:
      fullDay = "Saturday ";
      break;
    case 7:
      fullDay = "Sunday ";
      break;
    default:
      break;
  }
  return fullDay;
};

const getDateWithOrdinal = (date) => {
  return (
    date +
    (31 == date || 21 == date || 1 == date
      ? "st"
      : 22 == date || 2 == date
      ? "nd"
      : 23 == date || 3 == date
      ? "rd"
      : "th")
  );
};

const getFullDate = (date) => {
  const dt = new Date(date);
  let fullDate = getFullDay(dt.getDay());
  fullDate += " " + getDateWithOrdinal(dt.getDate());
  fullDate += " " + dt.getFullYear();
  return fullDate;
};

const DateHeader = (props) => {
  return <h5 className="m-0">{getFullDate(props.date)}</h5>;
};

export default DateHeader;
