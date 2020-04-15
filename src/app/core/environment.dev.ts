const apiUrl = 'https://localhost:8080';
const receivablesUrl = apiUrl + '/api/receivables/';
const financesUrl = apiUrl + '/api/finances/';
const calendarUrl = apiUrl + '/api/calendar/';

const mealUrl = apiUrl + '/api/meal';
const mealDictionaryUrl = apiUrl + '/api/dictionary/meal/';
const mealPriceUrl = apiUrl + '/api/meal/price';
const accountUrl = apiUrl + '/api/account/';
const actuatorUrl = apiUrl + '/actuator/';

export const environment = {
  production: false,
  locale: 'pl-PL',
  localeDate: 'pl_PL',
  formatDate: 'yyyy/MM/dd',
  nameLocalStorageVariableAuth: 'userCredentials',
  nameLocalStorageVariableUser: 'currentUser',
  routes: {
    signInUrl: 'auth/login',
    homeUrl: '/parent'
  },
  apiUrls: {
    authorization: apiUrl + '/api/authenticate',
    user: apiUrl + '/api/account/user',
    guardianUrl: apiUrl + '/api/account/guardians/',
    meal: apiUrl + '/api/meal',
    mealDictionary: apiUrl + '/api/dictionary/meal/',

    account: {
      // Account Controller
      user: accountUrl + 'user',

      // Borough Controller

      // Child Controller
      getChildById: accountUrl + 'child/',
      searchChildrenByFullName: accountUrl + 'children/search',

      // Employee Controller

      // Guardian Controller
      findAllGuardianChildren: accountUrl + 'guardians/'
    },
    receivables: {
      // Receivables Controller
      getAllIncomingPaymentsForChild: receivablesUrl + 'payments/child/',
      getAllIncomingPaymentsForChildFromDateToDate: receivablesUrl + 'payments/child/',
      getAllIncomingPaymentsForGuardian: receivablesUrl + 'payments/guardian/',
      getAllIncomingPaymentsForGuardianFromDateToDate: receivablesUrl + 'payments/guardian/',
      getAllPaymentMappingsForGuardian: receivablesUrl + 'payments/mappings/',
      importTransactions: receivablesUrl + 'transactions/import',
      checkTransactionsReturnedInputFile: receivablesUrl + 'transactions/import/check',

      // CashPayment Controller
      getAllCashPayments: receivablesUrl + 'cash-payments',
      getCashPayment: receivablesUrl + 'cash-payments/',
      deleteCashPayment: receivablesUrl + 'cash-payments/',
      createCashPayment: receivablesUrl + 'cash-payments',
      updateCashPayment: receivablesUrl + 'cash-payments',

      // Transactions Controller
      getAllUnassignedTransactions: receivablesUrl + 'transactions',
      assignTransactionToChild: receivablesUrl + 'transactions/assign/',
      getTransaction: receivablesUrl + 'transactions/',
      deleteTransaction: receivablesUrl + 'transactions/',
      createTransaction: receivablesUrl + 'transactions',
      updateTransaction: receivablesUrl + 'transactions'
    },
    finances: {
      // Finances Controller
      getBalance: financesUrl + 'balance/',
      getBalancesForAllChildren: financesUrl + 'balance/children/',
      getSumOfBalancesForAllChildren: financesUrl + 'balance/guardian/'
    },
    calendar: {
      // Absence Controller
      findAbsence: calendarUrl + 'absence/',
      createAbsence: calendarUrl + 'absence',
      createAbsences: calendarUrl + 'absences',
      updateAbsence: calendarUrl + 'absence',
      deleteAbsence: calendarUrl + 'absence/',
      getAllAbsencesByChildId: calendarUrl + 'absence/childById/',
      getAllAbsencesByDate: calendarUrl + 'absence/childByDate/',
      getAllAbsencesForChildBetweenDates: calendarUrl + 'absences/child',

      // DayOffWork Controller
      findDayOffWork: calendarUrl + 'dayoff/',
      findAllDaysOffWork: calendarUrl + 'daysoff/',
      createDayOffWork: calendarUrl + 'dayoff',
      updateDayOffWork: calendarUrl + 'dayoff',
      deleteDayOffWork: calendarUrl + 'dayoff/',
    },
    meals: {
      getMealType: mealDictionaryUrl + 'mealType',
      getDietType: mealDictionaryUrl + 'dietType',
      getMealPrice: mealPriceUrl,
      getAllMeals: mealUrl,
      deleteNN: mealUrl + '/nn/delete',
      addNN: mealUrl + '/nn',
    },
    guardian: {
      guardians: accountUrl + 'guardians',
      count: accountUrl + 'guardians/count'
    },
    employee: {
      employees: accountUrl + 'employees',
      count: accountUrl + 'employees/count'
    },
    child: {
      children: accountUrl + 'children',
      count: accountUrl + 'children/count'
    },
    actuator: {
      getHealth: actuatorUrl + 'health',
      getHttpTrace: actuatorUrl + 'httptrace',
      getMetrics: actuatorUrl + 'metrics',
      getMetricsDetails: ''
    }

  }

};


