export const categories: Record<string, { label: string }> = {
  date1: { label: 'Automotive' },
  date2: { label: 'Electronics' },
};

export const items: Record<string, { category: string; label: string }> = {
  date3: { category: 'date1', label: 'Thing 1' },
  date4: { category: 'date2', label: 'Thing 2' },
};
