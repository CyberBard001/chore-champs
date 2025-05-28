export const dummyChildren = [
  {
    id: 'c1',
    name: 'Aria',
    age: 7,
    avatar: '🦄',
    coins: 20,
    tasks: [
      { id: 't1', title: 'Make your bed', status: 'pending' },
      { id: 't2', title: 'Help set the table', status: 'approved' },
    ],
  },
  {
    id: 'c2',
    name: 'Ava',
    age: 6,
    avatar: '🐱',
    coins: 15,
    tasks: [
      { id: 't3', title: 'Brush your teeth', status: 'pending' },
      { id: 't4', title: 'Tidy toys', status: 'pending' },
    ],
  },
];

// ❌ Optional: Remove this if not used anywhere
// export default { children: dummyChildren };
