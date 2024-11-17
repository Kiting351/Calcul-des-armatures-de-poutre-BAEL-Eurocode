export const calculateBAEL = (inputs: BeamInputs): CalculationResults => {
  const { width, height, moment, cover, concreteClass, steelClass } = inputs;
  
  // Simplified BAEL calculations for educational purposes
  const d = height - cover - 10; // effective depth
  const fe = steelClass === "FeE500" ? 500 : 400; // steel yield strength
  const fc28 = parseInt(concreteClass.replace("C", "")); // concrete strength
  const fbu = 0.85 * fc28 / 1.5;
  
  // Calculate lever arm and steel area
  const z = 0.9 * d;
  const steelArea = (moment * 1e6) / (fe * z);
  
  // Min and max steel areas according to BAEL
  const minSteelArea = 0.23 * width * d * Math.pow(fc28/fe, 1/3);
  const maxSteelArea = 0.04 * width * height;
  
  return {
    steelArea,
    leverArm: z,
    effectiveDepth: d,
    minSteelArea,
    maxSteelArea
  };
};

export const calculateEC2 = (inputs: BeamInputs): CalculationResults => {
  const { width, height, moment, cover, concreteClass, steelClass } = inputs;
  
  // Simplified Eurocode 2 calculations for educational purposes
  const d = height - cover - 10; // effective depth
  const fyk = steelClass === "FeE500" ? 500 : 400;
  const fcd = parseInt(concreteClass.replace("C", "")) / 1.5;
  
  // Calculate lever arm and steel area
  const z = 0.95 * d;
  const steelArea = (moment * 1e6) / (fyk * z);
  
  // Min and max steel areas according to EC2
  const minSteelArea = Math.max(0.26 * (fcd/fyk) * width * d, 0.0013 * width * d);
  const maxSteelArea = 0.04 * width * height;
  
  return {
    steelArea,
    leverArm: z,
    effectiveDepth: d,
    minSteelArea,
    maxSteelArea
  };
};