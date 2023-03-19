import { Paystats } from '../src/model/paystat.model';

export const mocksPaystats: Paystats[] = [
  new Paystats({
    id: 23,
    postal_code_id: 28222,
    p_month: new Date('2020-01-01'),
    p_age: '25-34',
    p_gender: 'F',
    amount: 2352346.657,
    sum: 23423.432
  }),
  new Paystats({
    id: 24,
    postal_code_id: 28222,
    p_month: new Date('2020-01-01'),
    p_age: '25-34',
    p_gender: 'M',
    amount: 2352346.657
  })
];
