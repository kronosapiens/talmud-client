# talmud-client

> Computational Governance

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).


## Notes

- Useful utility to understand build size: https://chrisbateman.github.io/webpack-visualizer/

- Autotrack URL tracking requires Vue history mode, which requires a specific deployment configuration to function correctly. Namely, Cloudfront must be configured to return `index.html` whenever a 403 (forbidden) error occurs. Error handling must occur within the Vue app.