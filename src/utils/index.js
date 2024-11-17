export const pages = [
  {
    id: 'money',
    title: '🤑 Money',
    description: 'To help with taxes and how to spend your money',
    thumbnail: '/api/placeholder/300/200',
    component: () => import('@/pages/MoneyFlow.jsx')
    // component: () => import('../pages/Page2.jsx')
  },
  {
    id: 'TripCalc',
    title: 'Trip Calculator',
    description: 'First page description',
    thumbnail: '/api/placeholder/300/200',
    component: () => import('@/pages/TripCalc.jsx')
  },
  {
    id: 'Page1',
    title: 'Page One',
    description: 'First page description',
    thumbnail: '/api/placeholder/300/200',
    component: () => import('@/pages/Page1.jsx')
  },
  {
    id: 'Page2',
    title: 'Page Two',
    description: 'Second page description',
    thumbnail: '/api/placeholder/300/200',
    component: () => import('@/pages/Page2.jsx')
    // component: () => import('../pages/Page2.jsx')
  },
];