const apiUrl = 'http://localhost:8080';
const receivablesUrl = apiUrl + '/api/receivables/';

export const environment = {
  production: false,
  nameLocalStorageVariableAuth: 'userCredentials',
  nameLocalStorageVariableUser: 'currentUser',
  routes: {
    signInUrl: 'auth/login',
    homeUrl: '/parent'
  },
  apiUrls: {
    apiUrl,
    authorization: apiUrl + '/api/authenticate',
    user: apiUrl + '/api/account/user',
    guardian: apiUrl + '/api/account/guardians/',
    receivables: {
      getAllIncomingPaymentsForChild: receivablesUrl + 'payments/child/'
    }
  }
};

