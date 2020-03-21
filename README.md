# KindergartenSystem

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.24.

## Getting started:
* Node.js  
You can download it from here: https://nodejs.org/en/  
* Angular CLI  
You can install it via Node.js using following command:  
`npm install -g @angular/cli`  
Above command will install it globally
* Angular Devkit
You can install it via Node.js using following command:  
`npm install --save-dev @angular-devkit/build-angular`  
Above command will install it as dev dependency (so you should run it from repo directory)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# Workarounds for issues
## Certificate
You can turn off certificate validation for localhost only using this solution:  
https://stackoverflow.com/questions/7580508/getting-chrome-to-accept-self-signed-localhost-certificate

> For localhost only:
Simply paste this in your chrome:
chrome://flags/#allow-insecure-localhost

As an alternative you may try to add this certificate to trusted for Google Chrome
