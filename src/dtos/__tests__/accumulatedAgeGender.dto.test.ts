import { AccumulatedAgeGenderDTO } from '../accumulatedAgeGender.dto';
import { mocksPaystats } from '../../../mocks/paystats.mocks';

describe('AccumulatedAgeGenderDTO', () => {
  describe('from model to dto', () => {
    const expectedAgeRange = '25-34';

    const checkDTOWithSumValue = (dto: AccumulatedAgeGenderDTO) => {
      expect(dto.ageRange).toBe(expectedAgeRange);
      expect(dto.amount).toEqual(23423.432);
      expect(dto.gender).toBe('F');
    };

    const checkDTOWithoutSumValue = (dto: AccumulatedAgeGenderDTO) => {
      expect(dto.ageRange).toBe(expectedAgeRange);
      expect(dto.amount).toEqual(2352346.657);
      expect(dto.gender).toBe('M');
    };

    it('from model to dto, when model has sum value', () => {
      const dto = new AccumulatedAgeGenderDTO(mocksPaystats[0]);

      checkDTOWithSumValue(dto);
    });
    it('from model to dto, when model has NO sum value', () => {
      const dto = new AccumulatedAgeGenderDTO(mocksPaystats[1]);

      checkDTOWithoutSumValue(dto);
    });
    it('from model array to dto array', () => {
      const dtos: AccumulatedAgeGenderDTO[] = AccumulatedAgeGenderDTO.convertFromPaystatsArray(mocksPaystats);

      expect(dtos).toHaveLength(2);
      checkDTOWithSumValue(dtos[0]);
      checkDTOWithoutSumValue(dtos[1]);
    });
  });
});
