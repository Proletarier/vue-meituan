const processingUrl = (url = "", params = {}) => {
  const regex = /\{\{[a-zA-Z0-9]*\}\}/g;
  const values = url.match(regex);
  if (values == null) {
    return url;
  }
  let replaces = {};
  values.forEach((item) => {
    const key = item.replace(/\{\{|\}\}/g, "");
    replaces[item] = params[key];
  });

  for (const key in replaces) {
    url = url.replace(key, replaces[key]);
  }
  return url;
};

export { processingUrl };
