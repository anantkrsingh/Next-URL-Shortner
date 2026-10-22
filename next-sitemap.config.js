/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: "https://tinyur.in", 
    generateRobotsTxt: true, 
    sitemapSize: 7000,
    changefreq: "daily",
    priority: 0.7,
    exclude: ["/signup", "/login", "/account", "/opengraph-image.png", "/twitter-image.png"],
  };
  