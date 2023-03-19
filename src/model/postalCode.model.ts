export interface PostalCodeSchema {
    id: number;
    code: string;
    the_geom: number[];
}

export class PostalCode {
  id: number;
  code: string;
  theGeom: number[];

  constructor (postalCodeSchema: PostalCodeSchema) {
    this.id = postalCodeSchema.id;
    this.code = postalCodeSchema.code;
    this.theGeom = postalCodeSchema.the_geom;
  }
}
