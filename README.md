# vuejs-auth0

This is a simple demo project to show a working implementation of Auth0 in Vue.js (cli) using a custom login and passwordless authentication.

## Build Setup
Rename auth0-variables.example.js to auth0-variables.js and fill in the domain and client id listed on your Auth0 application page.

``` bash
# set node to the version used during development
# optional but recommended
nvm use

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [webpack guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## Working with this demo

If you are using this as an example, one thing you will want to do is changing the plugins/auth0-variables.example.js.  I'd really recommend getting rid of this file entirely in your own project, but as I wanted to develop using these without risking checking them in, I created a separate file I could .gitignore.

Almost all of the "important", logic has been centralized in plugins/authService.js.  Because I wanted to leave the default #/path navigation in place, this service watches the window.location for the callback from Auth0 rather than putting it in a page or forcing Vue.js history.

Other than that, this project should just run out of the box and give you a good starting place for implementing passwordless login using Auth0 in your own Vue.js cli project. You should be able to copy authService.js, install it as a plugin, rename the variables file, and wire up the appropriate listeners.

## Justification
While there were some demo projects available at the time I created this, both the existing demo projects and Auth0's documentation were ... noisy.  These example projects did things like:

1. Added un-needed dependencies (bootstrap, EventEmitter, etc.)
1. Added complexity to the application architecture
1. Included everything in one very large file
1. Forced router history, rather than allowing the default #/path navigation

So I created this demo project as a "no-frills" example of what I think is best implementation of Auth0 in Vue.js.  I've intentionally excluded any styling, avoided adding any additional packages, and tried to use the default webpack Vue.js template where possible.  With some notable exceptions:

1. Installed the [auth0-js](https://www.npmjs.com/package/auth0-js) npm package (because it would be stupid to re-write this)
1. Updated eslint to use rules I use in every project (sorry, standard comma placement is bad)
1. Forced a specific package version in npm (not doing this is crazy!)
1. Added [nvm / .nvmrc](https://github.com/creationix/nvm) to support a specific version of node (optional)
1. Created a config file to hold the Auth0 specific info (avoids adding my ClientId to github)
