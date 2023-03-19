import { AccumulatedAgeGenderMonthDTO } from '../accumulatedAgeGenderMonth.dto';
import { mocksPaystats } from '../../../mocks/paystats.mocks';

describe('AccumulatedAgeGenderMonthDTO', () => {
  describe('from model to dto', () => {
    const expectedAgeRange = '25-34';
    const expectedMonth = new Date('2020-01-01');

    const checkDTOWithSumValue = (dto: AccumulatedAgeGenderMonthDTO) => {
      expect(dto.ageRange).toBe(expectedAgeRange);
      expect(dto.amount).toEqual(23423.432);
      expect(dto.gender).toBe('F');
      expect(dto.month).toEqual(expectedMonth);
    };

    const checkDTOWithoutSumValue = (dto: AccumulatedAgeGenderMonthDTO) => {
      expect(dto.ageRange).toBe(expectedAgeRange);
      expect(dto.amount).toEqual(2352346.657);
      expect(dto.gender).toBe('M');
      expect(dto.month).toEqual(expectedMonth);
    };

    it('from model to dto, when model has sum value', () => {
      const dto = new AccumulatedAgeGenderMonthDTO(mocksPaystats[0]);

      checkDTOWithSumValue(dto);
    });
    it('from model to dto, when model has NO sum value', () => {
      const dto = new AccumulatedAgeGenderMonthDTO(mocksPaystats[1]);

      checkDTOWithoutSumValue(dto);
    });
    it('from model array to dto array', () => {
      const dtos: AccumulatedAgeGenderMonthDTO[] = AccumulatedAgeGenderMonthDTO.convertFromPaystatsArray(mocksPaystats);

      expect(dtos).toHaveLength(2);
      checkDTOWithSumValue(dtos[0]);
      checkDTOWithoutSumValue(dtos[1]);
    });
  });
});
