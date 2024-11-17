export interface BeamInputs {
  width: number;
  height: number;
  length: number;
  concreteClass: string;
  steelClass: string;
  moment: number;
  cover: number;
}

export interface CalculationResults {
  steelArea: number;
  leverArm: number;
  effectiveDepth: number;
  minSteelArea: number;
  maxSteelArea: number;
}