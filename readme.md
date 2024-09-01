# Dynamic microfrontends demo

This example is heavily based on microfrontends-example dynamic remote applications:
- https://github.com/module-federation/module-federation-examples/tree/master/advanced-api/dynamic-remotes
- https://github.com/module-federation/module-federation-examples/tree/master/dynamic-system-host

But this example goes a little bit further.

First, it shows how to register remote dynamically in such scenarios where the link to the remote is dynamic itself and needs to be retrieved at runtime.

Second, it shows how to handle dynamic microfrontends load with TypeScript.

So it provides useful and convenient point of reference in case microfrontend urls can't be known at build-time.

# Usage

```sh
$ npm run install # install all dependencies for all subprojects
$ npm run start # run all microfrontends together
# or, to check that everything works out well
$ npm run e2e
```

`npm run start` will run applications inside `host`, `remote`, `remote_2` folders on
`localhost:4001`, `localhost:4002` and `localhost:4003` respectively.
It will also open each url in your browser upon start.

Navigate to `localhost:4001` and click buttons to get microfrontends dynamically!


## Structure

`host` is a container that embeds microfrontends dynamically.
Two components are being loaded as microfrontends, each from it's own source.

The first case is a static url which gets registered dynamically.
This url refers to application inside `remote` folder which provides simple `Button` component.
`Button` is a simple `React.FC<{}>` exported as a default.

The second case represents a flow where the remote url is retrieved from the other source.
In my code it's emulated via `getUrl` function but in reality it's often needed to get the url from some sort of an external dictionary. It helps to have the ability to change url when things get changed.
It also helps to run the production build in different environments.

The second application is located at `remote_2`. It exports `Widget` component which is a simple `React.FC<{}>`.
The `host` application uses `React.lazy` to import it and shows necessary adjustment to comply with typing needs.

## TypeScript

Module Federation requires for the so called "async boundary" to be implemented.
It means that the entry point to the application must be loaded asynchronously.

That leaves out `commonjs` module type, which is a quite common option.
In order for Module Federation to work, a different module type must be used.
In my example, module type is set to `esnext`, and `moduleResolutionType: "node"` is set as well.