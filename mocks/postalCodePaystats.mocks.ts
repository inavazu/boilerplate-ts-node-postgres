import { PostalCodePaystats } from '../src/model/postalCodePaystats.model';

export const mocksPostalCodePaystats: PostalCodePaystats[] = [
  new PostalCodePaystats({
    id: 23,
    postal_code_id: 28222,
    p_month: new Date('2020-01-01'),
    p_age: '25-34',
    p_gender: 'F',
    amount: 2352346.657,
    sum: 23423.432,
    code: '28222',
    the_geom: [1, 2, 3]
  }),
  new PostalCodePaystats({
    id: 24,
    postal_code_id: 28222,
    p_month: new Date('2020-01-01'),
    p_age: '25-34',
    p_gender: 'M',
    amount: 2352346.657,
    code: '28222',
    the_geom: [1, 2, 3]
  })
];
