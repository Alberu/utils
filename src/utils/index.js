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