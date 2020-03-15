const getLink = str => {
  const containsLink = str.match(/\(https?:(.*)\)/);
  if (containsLink) {
    return containsLink[0].replace('(', '').replace(')', '');
  }
};

module.exports = {
  getLink
};
