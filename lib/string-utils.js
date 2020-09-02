const getLink = str => {
  const containsLink = str.match(/\(https?:(.*)\)/);

  return containsLink ? containsLink[0].replace('(', '').replace(')', '') : '';
};

module.exports = {
  getLink
};
