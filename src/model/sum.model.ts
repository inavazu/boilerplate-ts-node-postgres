export interface SumSchema {
  sum: number;
}

export class Sum implements SumSchema {
  sum: number;

  constructor (sumSchema: SumSchema) {
    this.sum = sumSchema.sum;
  }

  getValue (): number {
    return this.sum;
  }
}
