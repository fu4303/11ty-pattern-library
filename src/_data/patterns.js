const nunjucks = require('nunjucks');
const fs = require('fs');
const path = require('path');

module.exports = {
  navItems(collection) {
    return collection.filter(x => !x.inputPath.includes('variants'));
  },
  getVariants(item, collection) {
    const basePath = item.filePathStem
      .split('/')
      .filter(x => x.length)
      .slice(0, 2)
      .join('/');

    return collection.filter(
      x =>
        x.filePathStem.indexOf(`/${basePath}`) === 0 &&
        x.filePathStem.includes('variants')
    );
  },
  render(item) {
    const markup = fs.readFileSync(
      `${__basedir}${item.inputPath.replace('./', '/')}`,
      'utf8'
    );

    return nunjucks.renderString(markup, {data: item.data});
  }
};