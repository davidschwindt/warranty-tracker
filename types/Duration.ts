export type Duration = {
  unit: DurationUnit;
  numUnits: number;
};

export enum DurationUnit {
  day = 'DAY',
  month = 'MONTH',
  year = 'YEAR',
}

export const durationLabels: Record<DurationUnit, string> = {
  [DurationUnit.day]: 'Day(s)',
  [DurationUnit.month]: 'Month(s)',
  [DurationUnit.year]: 'Year(s)',
};
