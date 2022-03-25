const promisseAllWrapper = async (arr) => {
  return await Promise.all(arr).then((values) => {
    return values;
  });
};

export default promisseAllWrapper;
