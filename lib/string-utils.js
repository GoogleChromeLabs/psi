const getLink = str => {
  const containsLink = str.match(/\((?<url>https?:.*)\)/);

  return containsLink ? containsLink.groups.url.replace('(', '').replace(')', '') : '';
};

module.exports = {
  getLink
};
