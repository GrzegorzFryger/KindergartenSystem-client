const apiUrl = 'https://localhost:8080';
const receivablesUrl = apiUrl + '/api/receivables/';
const financesUrl = apiUrl + '/api/finances/';
const calendarUrl = apiUrl + '/api/calendar/';
const groupsUrl = apiUrl + '/api/groups/';

const mealUrl = apiUrl + '/api/meal';
const mealDictionaryUrl = apiUrl + '/api/dictionary/meal/';
const mealPriceUrl = apiUrl + '/api/meal/price';
const accountUrl = apiUrl + '/api/account/';
const actuatorUrl = apiUrl + '/actuator/';
const paymentsUrl = apiUrl + '/api/payments/';

export const environment = {
  production: false,
  locale: 'pl-PL',
  localeDate: 'pl_PL',
  formatDate: 'yyyy/MM/dd',
  nameLocalStorageVariableAuth: 'userCredentials',
  nameLocalStorageVariableUser: 'currentUser',
  routes: {
    signInUrl: 'auth/login',
    homeUrl: '/parent',
    homeUrlAdmin: '/administrator',
    homeUrlTeacher: '/teacher',
  },
  apiUrls: {
    authorization: apiUrl + '/api/authenticate',
    user: apiUrl + '/api/accounts/user',
    guardianUrl: apiUrl + '/api/accounts/guardians/',
    meal: apiUrl + '/api/meal',
    mealDictionary: apiUrl + '/api/dictionary/meal/',

    account: {
      user: accountUrl + 'user',
      activate: accountUrl + 'activate',
      guardian: {
        findAllGuardianChildren: accountUrl + 'guardians/',
        guardians: accountUrl + 'guardians',
        count: accountUrl + 'guardians/count',
        create: accountUrl + 'guardian',
        update: accountUrl + 'guardian',
        findAllGuardians: accountUrl + 'guardians/search/',
        appendChild: accountUrl + 'guardian/append-child'
      },
      employee: {
        employees: accountUrl + 'employees',
        count: accountUrl + 'employees/count',
        create: accountUrl + 'employee',
        update: accountUrl + 'employee'
      },
      child: {
        children: accountUrl + 'children',
        getChildById: accountUrl + 'child/',
        count: accountUrl + 'children/count',
        searchChildrenByFullName: accountUrl + 'children/search',
        create: accountUrl + 'child',
        update: accountUrl + 'child'
      },
    },
    receivables: {
      // Receivables Controller
      getAllIncomingPaymentsForChild: receivablesUrl + 'payments/children/',
      getAllIncomingPaymentsForChildFromDateToDate: receivablesUrl + 'payments/children/',
      getAllIncomingPaymentsForGuardian: receivablesUrl + 'payments/guardian/',
      getAllIncomingPaymentsForGuardianFromDateToDate: receivablesUrl + 'payments/guardian/',
      getAllPaymentMappingsForGuardian: receivablesUrl + 'payments/mappings/',
      importTransactions: receivablesUrl + 'transactions/import',
      checkTransactionsReturnedInputFile: receivablesUrl + 'transactions/import/check',

      // CashPayment Controller
      getAllCashPayments: receivablesUrl + 'cash-payments',
      getAllCashPaymentsForChild: receivablesUrl + 'cash-payments/child/',
      getAllCashPaymentsFromPastMonth: receivablesUrl + 'cash-payments/past-month',
      getCashPayment: receivablesUrl + 'cash-payments/',
      deleteCashPayment: receivablesUrl + 'cash-payments/',
      createCashPayment: receivablesUrl + 'cash-payments',
      updateCashPayment: receivablesUrl + 'cash-payments',

      // Transactions Controller
      getAllUnassignedTransactions: receivablesUrl + 'transactions',
      getAllTransactionsForChild: receivablesUrl + 'transactions/child/',
      getAllTransactionsFromPastMonth: receivablesUrl + 'transactions/past-month',
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
      getSumOfBalancesForAllChildren: financesUrl + 'balance/guardian/',
      getAccountNumberForChild: financesUrl + 'accountNumber/'
    },
    calendar: {
      // Absence Controller
      findAbsence: calendarUrl + 'absence/',
      createAbsence: calendarUrl + 'absence',
      createAbsences: calendarUrl + 'absences',
      updateAbsence: calendarUrl + 'absence',
      deleteAbsence: calendarUrl + 'absence/',
      getAllAbsences: calendarUrl + 'absences',
      getAllAbsencesBetweenDates: calendarUrl + 'absence/betweenDates/',
      getAllAbsencesByChildId: calendarUrl + 'absence/childById/',
      getAllAbsencesByDate: calendarUrl + 'absence/childByDate/',
      getAllAbsencesForChildBetweenDates: calendarUrl + 'absences/children',

      // DayOffWork Controller
      findDayOffWork: calendarUrl + 'dayoff/',
      findAllDaysOffWork: calendarUrl + 'daysoff/',
      createDayOffWork: calendarUrl + 'dayoff',
      updateDayOffWork: calendarUrl + 'dayoff',
      deleteDayOffWork: calendarUrl + 'dayoff/',
    },
    groups: {
      // Groups Controller
      getGroup: groupsUrl,
      getAllGroups: groupsUrl + 'groups',
      createGroup: groupsUrl,
      updateGroup: groupsUrl,
      deleteGroup: groupsUrl,
      addChildToGroup: groupsUrl + 'add/',
      findAllChildrenInGroup: groupsUrl + 'list/',
      removeChildFromGroup: groupsUrl + 'remove/'
    },
    meals: {
      getMealType: mealDictionaryUrl + 'mealType',
      getDietType: mealDictionaryUrl + 'dietType',
      getMealPrice: mealPriceUrl,
      getAllMeals: mealUrl,
      deleteNN: mealUrl + '/nn/delete',
      addNN: mealUrl + '/nn',
      updateMealPrice: mealUrl + '/price',
      getMealPriceById: mealUrl + '/price/',
      deleteMealPriceById: mealUrl + '/price/',
      getAvailableMealPrice: mealUrl + '/price/notSet',
      addMealPrice: mealUrl + '/price',
      addMeal: mealUrl,
      invokeMeal: mealUrl + '/',
      getAllMealsByChild: mealUrl + '/',
      getMealBySelectedDate: mealUrl + '/order/'
    },

    actuator: {
      getHealth: actuatorUrl + 'health',
      getHttpTrace: actuatorUrl + 'httptrace',
      getMetrics: actuatorUrl + 'metrics',
      getMetricsDetails: ''
    },

    payments: {
      findAllRecurringPayments: paymentsUrl + 'recurring-payments',
      findAllRecurringPaymentsByChildId: paymentsUrl + 'recurring-payments/',
      findPaymentById: paymentsUrl + 'recurring-payment',
      createTuition: paymentsUrl + 'recurring-payment/tuition',
      createOtherPayment: paymentsUrl + 'recurring-payments/other',
      updatePayment: paymentsUrl + 'recurring-payments',
      markAsCancelPayment: paymentsUrl + 'recurring-payments/',

      history: {
        getChildById: paymentsUrl +  'payment-history/',
        applyBalanceCorrectionForPayment: paymentsUrl + 'payment-history/balance-correction',
        paymentLastMonth: paymentsUrl + ' payments-history/month'
      },

      discount: {
        getById: paymentsUrl + 'discount/',
        getAll: paymentsUrl +  'discounts',
        create: paymentsUrl + 'discount',
        update: paymentsUrl + 'discount',
        delete: paymentsUrl + 'discount'
      },
    }

  }

};


