// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    baseUrl: 'https://jegybazar-c7ea5.firebaseio.com/',
    registerUrl: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser',
    loginUrl: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword',
    apiKey: 'AIzaSyBLhPy_k7ADTcsq-DDGjK2TIG_eEnNe2Zk',
    authDomain: 'jegybazar-c7ea5.firebaseapp.com',
    databaseURL: 'https://jegybazar-c7ea5.firebaseio.com',
    projectId: 'jegybazar-c7ea5',
    storageBucket: 'jegybazar-c7ea5.appspot.com',
    messagingSenderId: '970300620781'
  }
};
