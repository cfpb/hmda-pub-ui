# HMDA Publication

### This repository is a work in progress.

Information and code contained in this repository should be considered provisional and a work in progress unless otherwise indicated.

## Dependencies

* [yarn](https://yarnpkg.com)

## Install

To install the publication UI, clone this repo and run the following:

```
yarn
```

## Run locally

After building your desired project, you can visit it by running a static webserver from the project root directory
`yarn start`
or
`docker run -it -p "3000:80" -v "$(pwd):/usr/share/nginx/html" nginx:1.12`

You'd then visit each project at `http://localhost:8081/dist/` or `192.168.99.100:3000/dist/` respectively.
