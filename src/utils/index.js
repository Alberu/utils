export const pages = [
  {
    id: 'Money Flow',
    title: '🤑 Money',
    description: 'To help with taxes and how to spend your money',
    thumbnail: '/api/placeholder/300/200',
    component: () => import('@/pages/MoneyFlow.jsx')
    // component: () => import('../pages/Page2.jsx') // can also be done like this
  },
  {
    id: 'Trip Price Calculator',
    title: 'Trip Calculator',
    description: 'To calculate price of fuel by car',
    thumbnail: '/api/placeholder/300/200',
    component: () => import('@/pages/TripCalc.jsx')
  },
];

export const occuraceMultiplier = {
  'Monthly': 1,
  'Weekly': 4,
  'Daily': 30.47,
  // 'other': 1,
}

export const initialCategories = { 'Essential': '#ABAA99', 'Investment': '#FA961F', 'Savings': '#2ECE2E', 'Other': '#f00' }

export const initialExpenses = [
  { category: 'Essential', type: 'Monthly', name: "Rent", value: 1000, percent: false, colour: '#FA961F' },
  { category: 'Essential', type: 'Monthly', name: "Food", value: 300, percent: false, colour: '#ABAA99' },
  { category: 'Other', type: 'Monthly', name: "Other", value: 200, percent: false, colour: '#f00' },
  { category: 'Savings', type: 'Monthly', name: "ISA", value: 535.20, percent: 100, colour: '#2ECE2E' },
]

// experimenting wiht a new way to store all the information in one place
export const finances = [
  {
    name: 'income', colour: 'green', value: 30000, children: [
      { category: 'fixed', name: "salary", value: 1000, colour: '#FA961F' },
      { category: 'variable', name: "bonus", value: 1000, colour: '#FA961F' },
    ]
  },
  {
    name: 'pre-tax', colour: 'green', value: 30000, children: [
      { category: 'pension', name: "pension", value: 1000, colour: '#FA961F' },
    ]
  },
  {
    name: 'tax', colour: 'green', value: 30000, children: [
      { category: 'tax', name: "tax", value: 1000, colour: '#FA961F' },
      { category: 'tax', name: "NI", value: 1000, colour: '#FA961F' },
      { category: 'other', name: "other", value: 1000, colour: '#FA961F' },
    ]
  },
  {
    name: 'budget', colour: 'green', value: 30000, children: [
      { category: 'expense', name: "Rent", value: 1000, colour: '#FA961F' },
      { category: 'expense', name: "Food", value: 300, colour: '#ABAA99' },
      { category: 'expense', name: "Other", value: 200, colour: '#f00' },
      { category: 'saving', name: "Other", value: 200, colour: '#f00' },
      { category: 'investment', name: "Other", value: 200, colour: '#f00' },
      { category: 'essential', name: "Other", value: 200, colour: '#f00' },
    ]
  },
]

// locale can also be set to undefined to let the system pick
export const formatCurrency = (num, decimalPlaces = 2, locale = 'en-GB') => num.toLocaleString(locale, { minimumFractionDigits: decimalPlaces, maximumFractionDigits: decimalPlaces })

export const tmp = {
  nodes: [
    {
      id: "P0=>7-11"
    },
    {
      id: "P0=>全家"
    },
    {
      id: "P0=>全聯"
    },
    // {
    //   id: "P0=>無消費"
    // },
    {
      id: "P0=>無特定偏好"
    },
    {
      id: "P1=>7-11"
    },
    {
      id: "P1=>全家"
    },
    {
      id: "P1=>全聯"
    },
    // {
    //   id: "P1=>無消費"
    // },
    {
      id: "P1=>無特定偏好"
    },
    {
      id: "P2=>7-11"
    },
    {
      id: "P2=>全家"
    },
    {
      id: "P2=>全聯"
    },
    // {
    //   id: "P2=>無消費"
    // },
    {
      id: "P2=>無特定偏好"
    }
  ],
  links: [
    {
      source: "P0=>無特定偏好",
      target: "P1=>7-11",
      value: 0.35
    },
    // {
    //   source: "P0=>無消費",
    //   target: "P1=>7-11",
    //   value: 31.51
    // },
    {
      source: "P0=>全聯",
      target: "P1=>7-11",
      value: 0.23
    },
    {
      source: "P0=>全家",
      target: "P1=>7-11",
      value: 1.1
    },
    {
      source: "P0=>7-11",
      target: "P1=>7-11",
      value: 11.31
    },
    {
      source: "P0=>無特定偏好",
      target: "P1=>全家",
      value: 0.43
    },
    // {
    //   source: "P0=>無消費",
    //   target: "P1=>全家",
    //   value: 17.64
    // },
    {
      source: "P0=>全聯",
      target: "P1=>全家",
      value: 0.11
    },
    {
      source: "P0=>全家",
      target: "P1=>全家",
      value: 9.22
    },
    {
      source: "P0=>7-11",
      target: "P1=>全家",
      value: 0.93
    },
    {
      source: "P0=>無特定偏好",
      target: "P1=>全聯",
      value: 0.06
    },
    // {
    //   source: "P0=>無消費",
    //   target: "P1=>全聯",
    //   value: 8.17
    // },
    {
      source: "P0=>全聯",
      target: "P1=>全聯",
      value: 2.17
    },
    {
      source: "P0=>全家",
      target: "P1=>全聯",
      value: 0.2
    },
    {
      source: "P0=>7-11",
      target: "P1=>全聯",
      value: 0.23
    },
    // {
    //   source: "P0=>無特定偏好",
    //   target: "P1=>無消費",
    //   value: 0.41
    // },
    // {
    //   "source": "P0=>無消費",
    //   "target": "P1=>無消費",
    //   "value": 42.15
    // },
    // {
    //   source: "P0=>全聯",
    //   target: "P1=>無消費",
    //   value: 7.22
    // },
    // {
    //   source: "P0=>全家",
    //   target: "P1=>無消費",
    //   value: 15.49
    // },
    // {
    //   source: "P0=>7-11",
    //   target: "P1=>無消費",
    //   value: 25.29
    // },
    {
      source: "P0=>無特定偏好",
      target: "P1=>無特定偏好",
      value: 0.13
    },
    // {
    //   source: "P0=>無消費",
    //   target: "P1=>無特定偏好",
    //   value: 0.49
    // },
    {
      source: "P0=>全聯",
      target: "P1=>無特定偏好",
      value: 0.05
    },
    {
      source: "P0=>全家",
      target: "P1=>無特定偏好",
      value: 0.31
    },
    {
      source: "P0=>7-11",
      target: "P1=>無特定偏好",
      value: 0.41
    },
    {
      source: "P1=>無特定偏好",
      target: "P2=>7-11",
      value: 0.35
    },
    // {
    //   source: "P1=>無消費",
    //   target: "P2=>7-11",
    //   value: 28.09
    // },
    {
      source: "P1=>全聯",
      target: "P2=>7-11",
      value: 0.23
    },
    {
      source: "P1=>全家",
      target: "P2=>7-11",
      value: 1.09
    },
    {
      source: "P1=>7-11",
      target: "P2=>7-11",
      value: 9.66
    },
    {
      source: "P1=>無特定偏好",
      target: "P2=>全家",
      value: 0.33
    },
    // {
    //   source: "P1=>無消費",
    //   target: "P2=>全家",
    //   value: 13.58
    // },
    {
      source: "P1=>全聯",
      target: "P2=>全家",
      value: 0.17
    },
    {
      source: "P1=>全家",
      target: "P2=>全家",
      value: 7.91
    },
    {
      source: "P1=>7-11",
      target: "P2=>全家",
      value: 0.86
    },
    {
      source: "P1=>無特定偏好",
      target: "P2=>全聯",
      value: 0.05
    },
    // {
    //   source: "P1=>無消費",
    //   target: "P2=>全聯",
    //   value: 6.4
    // },
    {
      source: "P1=>全聯",
      target: "P2=>全聯",
      value: 1.77
    },
    {
      source: "P1=>全家",
      target: "P2=>全聯",
      value: 0.2
    },
    {
      source: "P1=>7-11",
      target: "P2=>全聯",
      value: 0.13
    },
    // {
    //   source: "P1=>無特定偏好",
    //   target: "P2=>無消費",
    //   value: 0.54
    // },
    // {
    //   "source": "P1=>無消費",
    //   "target": "P2=>無消費",
    //   "value": 42.09
    // },
    // {
    //   source: "P1=>全聯",
    //   target: "P2=>無消費",
    //   value: 8.62
    // },
    // {
    //   source: "P1=>全家",
    //   target: "P2=>無消費",
    //   value: 18.77
    // },
    // {
    //   source: "P1=>7-11",
    //   target: "P2=>無消費",
    //   value: 33.56
    // },
    {
      source: "P1=>無特定偏好",
      target: "P2=>無特定偏好",
      value: 0.11
    },
    // {
    //   source: "P1=>無消費",
    //   target: "P2=>無特定偏好",
    //   value: 0.4
    // },
    {
      source: "P1=>全聯",
      target: "P2=>無特定偏好",
      value: 0.04
    },
    {
      source: "P1=>全家",
      target: "P2=>無特定偏好",
      value: 0.34
    },
    {
      source: "P1=>7-11",
      target: "P2=>無特定偏好",
      value: 0.3
    }
  ]
};