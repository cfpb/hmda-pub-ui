# HMDA Publication UI

The front-end for HMDA data publication, https://ffiec.cfpb.gov/data-publication/.

## Dependencies

* [yarn](https://yarnpkg.com)

_This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find the most recent information on how to perform common tasks in [this guide](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md)._

## Install

Clone this repo and run the following:

```
yarn
```

## Getting started

### Create React App

For local development you can run:

```
yarn start
```

`yarn start` will run the application in development mode, opening a browser window to http://localhost:3000.

The page will automatically reload if you make changes to the code.
You will see the build errors and lint warnings in the console.

### Docker

To see the application running in a container you can run:

```
docker run -p 80:80 hmda/hmda-pub-ui
```

Open http://192.168.99.100/ (or your Docker Machine IP) to view the application.