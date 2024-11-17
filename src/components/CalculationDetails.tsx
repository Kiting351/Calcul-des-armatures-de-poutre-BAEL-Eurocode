import React from 'react';
import { BeamInputs, CalculationResults } from '../types/types';
import { Calculator, BookOpen } from 'lucide-react';

interface Props {
  inputs: BeamInputs;
  baelResults: CalculationResults;
  ec2Results: CalculationResults;
}

export default function CalculationDetails({ inputs, baelResults, ec2Results }: Props) {
  const fc28 = parseInt(inputs.concreteClass.replace("C", ""));
  const fe = inputs.steelClass === "FeE500" ? 500 : 400;
  const b = inputs.width;
  const h = inputs.height;
  const d = baelResults.effectiveDepth;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Calculator className="w-5 h-5 text-blue-600" />
        Détails des calculs
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            BAEL 91
          </h4>
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-medium">1. Données de base (Art. A.4.3)</p>
              <ul className="ml-4 space-y-1 text-gray-600">
                <li>• fc28 = {fc28} MPa</li>
                <li>• fe = {fe} MPa</li>
                <li>• fbu = {(0.85 * fc28 / 1.5).toFixed(2)} MPa (Art. A.4.3.2)</li>
                <li className="mt-2 text-xs italic">Coefficient de sécurité γb = 1.5 (Art. A.4.3.2)</li>
              </ul>
            </div>
            
            <div>
              <p className="font-medium">2. Calcul de la hauteur utile (Art. A.4.2)</p>
              <div className="ml-4 text-gray-600">
                <p>d = h - c - 10mm (Art. A.4.2.1)</p>
                <p>d = {h} - {inputs.cover} - 10 = {d} mm</p>
              </div>
            </div>
            
            <div>
              <p className="font-medium">3. Bras de levier (Art. A.4.3.3)</p>
              <div className="ml-4 text-gray-600">
                <p>z = 0.9 × d (hypothèse simplificatrice)</p>
                <p>z = 0.9 × {d} = {baelResults.leverArm.toFixed(1)} mm</p>
                <p className="text-xs italic mt-1">Valable pour les sections courantes (Art. A.4.3.3)</p>
              </div>
            </div>
            
            <div>
              <p className="font-medium">4. Section d'acier (Art. A.4.3.1)</p>
              <div className="ml-4 text-gray-600">
                <p>As = M / (fe × z) (Art. A.4.3.1)</p>
                <p>As = ({inputs.moment} × 10⁶) / ({fe} × {baelResults.leverArm.toFixed(1)})</p>
                <p>As = {baelResults.steelArea.toFixed(2)} mm²</p>
              </div>
            </div>

            <div>
              <p className="font-medium">5. Section minimale (Art. A.4.2.3)</p>
              <div className="ml-4 text-gray-600">
                <p>As,min = 0.23 × b × d × (fc28/fe)^(1/3)</p>
                <p>As,min = 0.23 × {b} × {d} × ({fc28}/{fe})^(1/3)</p>
                <p>As,min = {baelResults.minSteelArea.toFixed(2)} mm²</p>
              </div>
            </div>

            <div>
              <p className="font-medium">6. Section maximale (Art. A.4.2.3)</p>
              <div className="ml-4 text-gray-600">
                <p>As,max = 0.04 × b × h</p>
                <p>As,max = 0.04 × {b} × {h}</p>
                <p>As,max = {baelResults.maxSteelArea.toFixed(2)} mm²</p>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Eurocode 2
          </h4>
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-medium">1. Données de base (EN 1992-1-1, §3)</p>
              <ul className="ml-4 space-y-1 text-gray-600">
                <li>• fck = {fc28} MPa (§3.1.2)</li>
                <li>• fyk = {fe} MPa (§3.2.2)</li>
                <li>• fcd = {(fc28 / 1.5).toFixed(2)} MPa (§3.1.6)</li>
                <li className="mt-2 text-xs italic">Coefficient partiel γc = 1.5 (§2.4.2.4)</li>
              </ul>
            </div>
            
            <div>
              <p className="font-medium">2. Calcul de la hauteur utile (§5.3.3)</p>
              <div className="ml-4 text-gray-600">
                <p>d = h - c - 10mm</p>
                <p>d = {h} - {inputs.cover} - 10 = {ec2Results.effectiveDepth} mm</p>
                <p className="text-xs italic mt-1">Enrobage selon §4.4.1</p>
              </div>
            </div>
            
            <div>
              <p className="font-medium">3. Bras de levier (§6.2.3)</p>
              <div className="ml-4 text-gray-600">
                <p>z = 0.95 × d (hypothèse simplifiée)</p>
                <p>z = 0.95 × {ec2Results.effectiveDepth} = {ec2Results.leverArm.toFixed(1)} mm</p>
                <p className="text-xs italic mt-1">Valable pour les sections courantes (§6.2.3(3))</p>
              </div>
            </div>
            
            <div>
              <p className="font-medium">4. Section d'acier (§6.1)</p>
              <div className="ml-4 text-gray-600">
                <p>As = M / (fyk × z) (§6.1(2))</p>
                <p>As = ({inputs.moment} × 10⁶) / ({fe} × {ec2Results.leverArm.toFixed(1)})</p>
                <p>As = {ec2Results.steelArea.toFixed(2)} mm²</p>
              </div>
            </div>

            <div>
              <p className="font-medium">5. Section minimale (§9.2.1.1)</p>
              <div className="ml-4 text-gray-600">
                <p>As,min = max(0.26 × (fctm/fyk) × b × d, 0.0013 × b × d)</p>
                <p>fctm = 0.30 × fck^(2/3) = {(0.30 * Math.pow(fc28, 2/3)).toFixed(2)} MPa</p>
                <p>As,min = max(</p>
                <p className="ml-4">0.26 × ({(0.30 * Math.pow(fc28, 2/3)).toFixed(2)}/{fe}) × {b} × {d},</p>
                <p className="ml-4">0.0013 × {b} × {d})</p>
                <p>As,min = {ec2Results.minSteelArea.toFixed(2)} mm²</p>
              </div>
            </div>

            <div>
              <p className="font-medium">6. Section maximale (§9.2.1.1)</p>
              <div className="ml-4 text-gray-600">
                <p>As,max = 0.04 × Ac = 0.04 × b × h</p>
                <p>As,max = 0.04 × {b} × {h}</p>
                <p>As,max = {ec2Results.maxSteelArea.toFixed(2)} mm²</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}