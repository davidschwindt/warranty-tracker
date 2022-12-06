import Item from './types/Item';

export const categories: Record<string, { label: string }> = {
  date1: { label: 'Automotive' },
  date2: { label: 'Electronics' },
};

export const items: Record<string, Item> = {
  date3: { category: 'date1', description: 'Thing 1' },
  date4: { category: 'date2', description: 'Thing 2' },
};

export const purchaseMethods: Record<string, { label: string }> = {
  date5: { label: 'Blue Visa' },
  date6: { label: 'Red MasterCard' },
};
