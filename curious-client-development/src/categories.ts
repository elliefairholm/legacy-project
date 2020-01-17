interface ICategories {
  id: number,
  name: string
}

const categories: ICategories[] = [
  { id: 1, name: 'Music' },
  { id: 2, name: 'Development' },
  { id: 3, name: 'Sports' },
  { id: 4, name: 'IT&Software' },
  { id: 5, name: 'Office Productivity' },
  { id: 6, name: 'Design' },
  { id: 7, name: 'Personal Development' },
  { id: 8, name: 'Marketing' },
  { id: 9, name: 'Health&Fitness' },
];

export { categories as default };
