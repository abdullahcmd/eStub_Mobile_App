import React from 'react';
import {ChipOption, ChipRow} from '../common';

type Props = {
  years: number[];
  selectedYear: number | null;
  onSelect: (year: number) => void;
};

export const W2YearSelector = ({years, selectedYear, onSelect}: Props) => {
  const options: ChipOption<number>[] = [...years]
    .sort((a, b) => a - b)
    .map(y => ({value: y, label: String(y)}));
  return <ChipRow options={options} value={selectedYear} onChange={onSelect} />;
};
