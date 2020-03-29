const apiUrl = 'https://localhost:8080';
const receivablesUrl = apiUrl + '/api/receivables/';
const financesUrl = apiUrl + '/api/finances/';
const mealUrl = apiUrl + '/api/meal';
const mealDictionaryUrl = apiUrl + '/api/dictionary/meal/';
const mealPriceUrl = apiUrl + '/api/meal/price';
const accountUrl = apiUrl + '/api/account/';

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
    meal: apiUrl + '/api/meal',
    mealDictionary: apiUrl + '/api/dictionary/meal/',

    receivables: {
      // Receivables Controller
      getAllIncomingPaymentsForChild: receivablesUrl + 'payments/child/',
      getAllIncomingPaymentsForChildFromDateToDate: receivablesUrl + 'payments/child/',
      getAllIncomingPaymentsForGuardian: receivablesUrl + 'payments/guardian/',
      getAllIncomingPaymentsForGuardianFromDateToDate: receivablesUrl + 'payments/guardian/',
      getAllPaymentMappingsForGuardian: receivablesUrl + 'payments/mappings/',
      importTransactions: receivablesUrl + 'transactions/import',

      // CashPayment Controller
      getAllCashPayments: receivablesUrl + 'cash-payments',
      getCashPayment: receivablesUrl + 'cash-payments/',
      deleteCashPayment: receivablesUrl + 'cash-payments/',
      createCashPayment: receivablesUrl + 'cash-payments',
      updateCashPayment: receivablesUrl + 'cash-payments',

      // Transactions Controller
      getAllTransactions: receivablesUrl + 'transactions',
      getTransaction: receivablesUrl + 'transactions/',
      deleteTransaction: receivablesUrl + 'transactions/',
      createTransaction: receivablesUrl + 'transactions',
      updateTransaction: receivablesUrl + 'transactions'
    },
    finances: {
      // Finances Controller
      getBalance: financesUrl + 'balance/',
      getBalanceForAllChildren: financesUrl + 'balance/guardian/'
    },
    meals: {
      getMealType: mealDictionaryUrl + 'mealType',
      getDietType: mealDictionaryUrl + 'dietType',
      getMealPrice: mealPriceUrl,
      getAllMeals: mealUrl,
    },
    account: {
      getChildById: accountUrl + 'child/'
    }
  }
};

