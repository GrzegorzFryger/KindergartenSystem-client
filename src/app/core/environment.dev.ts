const apiUrl = 'http://localhost:8080';
const receivablesUrl = apiUrl + '/api/receivables/';

export const environment = {
  production: false,
  nameLocalStorageVariable: 'userCredentials',
  routes: {
    signInUrl: 'auth/login',
    homeUrl: '/home'
  },
  apiUrls: {
    apiUrl,
    authorization: apiUrl + '/api/authenticate',
    user: apiUrl + '/api/account/user',
    receivables: {
      getAllIncomingPaymentsForChild: receivablesUrl + 'payments/child/'
    }
  }
};
