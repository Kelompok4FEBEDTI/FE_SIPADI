const getDate = () => {
  const today = new Date();

  const date = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;
  return date;
};

const getTime = () => {
  const today = new Date();
  const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
  return time;
};

export default { getDate, getTime };
