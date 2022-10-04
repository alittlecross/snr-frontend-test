# Senior Frontend Test

My solution to the following problem:

> Write routes to render `index.njk` and `addresses.njk` in the routes folder.
>
> Write a post request to the address API using details in `config.js`.
>
> Display request results in the `addresses.njk` select element.
>
> Write suitable unit tests for functionality (start with the API call and expand if time allows).
>
> If time allows add some markup validation, e.g. what if the input is invalid?

## Prerequisites

* Node.js

## Environment Variables

| Name | Description                            | Required | Default
|------|----------------------------------------|----------|-
| PORT | the port the application should run on | no       | `3000`

## Running the application

### Locally

```
$ npm install
$ npm run build
$ npm start
```

Unless overridden, the application will be available at http://localhost:3000

## Running tests

```
$ npm test
```

## Linting JavaScript files

```
$ npm run lint
```
