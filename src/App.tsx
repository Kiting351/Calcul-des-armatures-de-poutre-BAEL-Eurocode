import React, { useState, useEffect } from 'react';
import { BeamInputs, CalculationResults } from './types/types';
import { calculateBAEL, calculateEC2 } from './utils/calculations';
import BeamForm from './components/BeamForm';
import ResultsComparison from './components/ResultsComparison';
import CalculationDetails from './components/CalculationDetails';
import CalculationFlowcharts from './components/CalculationFlowcharts';
import { Ruler, Calculator } from 'lucide-react';

function App() {
  const [inputs, setInputs] = useState<BeamInputs>({
    width: 300,
    height: 600,
    length: 5000,
    concreteClass: 'C25',
    steelClass: 'FeE500',
    moment: 200,
    cover: 30
  });

  const [baelResults, setBaelResults] = useState<CalculationResults | null>(null);
  const [ec2Results, setEc2Results] = useState<CalculationResults | null>(null);

  const handleInputChange = (name: keyof BeamInputs, value: number | string) => {
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const baelCalc = calculateBAEL(inputs);
    const ec2Calc = calculateEC2(inputs);
    
    setBaelResults(baelCalc);
    setEc2Results(ec2Calc);
  }, [inputs]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-3">
            <Calculator className="w-8 h-8 text-blue-600" />
            Calcul des armatures de poutre
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Comparaison entre BAEL 91 et Eurocode 2
          </p>
        </div>

        <div className="space-y-8">
          <BeamForm inputs={inputs} onInputChange={handleInputChange} />
          
          {baelResults && ec2Results && (
            <>
              <ResultsComparison
                baelResults={baelResults}
                ec2Results={ec2Results}
              />
              <CalculationFlowcharts />
              <CalculationDetails
                inputs={inputs}
                baelResults={baelResults}
                ec2Results={ec2Results}
              />
            </>
          )}
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Ruler className="w-6 h-6 text-blue-600" />
              Schéma de la poutre
            </h2>
            <div className="aspect-[2/1] bg-gray-100 rounded-lg flex items-center justify-center">
              <div 
                className="relative"
                style={{
                  width: `${inputs.width / 2}px`,
                  height: `${inputs.height / 2}px`,
                  backgroundColor: '#e5e7eb',
                  border: '2px solid #374151'
                }}
              >
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-500" 
                     style={{bottom: `${inputs.cover}px`}} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;