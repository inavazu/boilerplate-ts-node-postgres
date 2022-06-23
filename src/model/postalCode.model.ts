export interface PostalCodeSchema {
    id: number;
    code: string;
    theGeom: number[];
}

export class PostalCode implements PostalCodeSchema {
  id: number;
  code: string;
  theGeom: number[];

  constructor (postalCodeSchema: PostalCodeSchema) {
    this.id = postalCodeSchema.id;
    this.code = postalCodeSchema.code;
    this.theGeom = postalCodeSchema.theGeom;
  }
}
