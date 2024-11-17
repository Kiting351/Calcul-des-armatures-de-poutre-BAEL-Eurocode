import React from 'react';
import { GitBranch } from 'lucide-react';

export default function CalculationFlowcharts() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
        <GitBranch className="w-5 h-5 text-blue-600" />
        Organigrammes de calcul
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* BAEL 91 Flowchart */}
        <div>
          <h4 className="font-semibold text-blue-800 mb-4">BAEL 91</h4>
          <div className="space-y-4">
            {flowchartSteps.map((step, index) => (
              <div key={`bael-${index}`} className="relative">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-sm">{step.bael}</p>
                </div>
                {index < flowchartSteps.length - 1 && (
                  <div className="h-8 w-0.5 bg-blue-200 absolute left-1/2 -bottom-4 transform -translate-x-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Eurocode 2 Flowchart */}
        <div>
          <h4 className="font-semibold text-blue-800 mb-4">Eurocode 2</h4>
          <div className="space-y-4">
            {flowchartSteps.map((step, index) => (
              <div key={`ec2-${index}`} className="relative">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <p className="font-medium text-sm">{step.ec2}</p>
                </div>
                {index < flowchartSteps.length - 1 && (
                  <div className="h-8 w-0.5 bg-green-200 absolute left-1/2 -bottom-4 transform -translate-x-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const flowchartSteps = [
  {
    bael: "1. Données d'entrée (Art. A.4.3)\n• Dimensions\n• Classes des matériaux\n• Moment fléchissant",
    ec2: "1. Données d'entrée (§3)\n• Dimensions\n• Classes des matériaux\n• Moment fléchissant"
  },
  {
    bael: "2. Calcul des contraintes limites (Art. A.4.3.2)\n• fbu = 0.85 × fc28 / 1.5\n• fe = fyk",
    ec2: "2. Calcul des contraintes de calcul (§3.1.6)\n• fcd = fck / γc\n• fyd = fyk / γs"
  },
  {
    bael: "3. Hauteur utile (Art. A.4.2)\nd = h - c - φ/2",
    ec2: "3. Hauteur utile (§5.3.3)\nd = h - c - φ/2"
  },
  {
    bael: "4. Bras de levier (Art. A.4.3.3)\nz = 0.9d",
    ec2: "4. Bras de levier (§6.2.3)\nz = 0.95d"
  },
  {
    bael: "5. Section d'acier (Art. A.4.3.1)\nAs = M / (fe × z)",
    ec2: "5. Section d'acier (§6.1)\nAs = M / (fyd × z)"
  },
  {
    bael: "6. Vérifications (Art. A.4.2.3)\nAs,min ≤ As ≤ As,max",
    ec2: "6. Vérifications (§9.2.1.1)\nAs,min ≤ As ≤ As,max"
  }
];