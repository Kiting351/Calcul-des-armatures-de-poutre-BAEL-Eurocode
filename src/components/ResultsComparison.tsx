import React from 'react';
import { CalculationResults } from '../types/types';
import { ArrowRightLeft } from 'lucide-react';

interface Props {
  baelResults: CalculationResults;
  ec2Results: CalculationResults;
}

export default function ResultsComparison({ baelResults, ec2Results }: Props) {
  const formatNumber = (num: number) => num.toFixed(2);
  
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">BAEL 91</h3>
        <div className="space-y-3">
          <p className="flex justify-between">
            <span className="text-gray-600">Section d'acier:</span>
            <span className="font-medium">{formatNumber(baelResults.steelArea)} mm²</span>
          </p>
          <p className="flex justify-between">
            <span className="text-gray-600">Bras de levier:</span>
            <span className="font-medium">{formatNumber(baelResults.leverArm)} mm</span>
          </p>
          <p className="flex justify-between">
            <span className="text-gray-600">Hauteur utile:</span>
            <span className="font-medium">{formatNumber(baelResults.effectiveDepth)} mm</span>
          </p>
          <p className="flex justify-between">
            <span className="text-gray-600">Section min:</span>
            <span className="font-medium">{formatNumber(baelResults.minSteelArea)} mm²</span>
          </p>
          <p className="flex justify-between">
            <span className="text-gray-600">Section max:</span>
            <span className="font-medium">{formatNumber(baelResults.maxSteelArea)} mm²</span>
          </p>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Eurocode 2</h3>
        <div className="space-y-3">
          <p className="flex justify-between">
            <span className="text-gray-600">Section d'acier:</span>
            <span className="font-medium">{formatNumber(ec2Results.steelArea)} mm²</span>
          </p>
          <p className="flex justify-between">
            <span className="text-gray-600">Bras de levier:</span>
            <span className="font-medium">{formatNumber(ec2Results.leverArm)} mm</span>
          </p>
          <p className="flex justify-between">
            <span className="text-gray-600">Hauteur utile:</span>
            <span className="font-medium">{formatNumber(ec2Results.effectiveDepth)} mm</span>
          </p>
          <p className="flex justify-between">
            <span className="text-gray-600">Section min:</span>
            <span className="font-medium">{formatNumber(ec2Results.minSteelArea)} mm²</span>
          </p>
          <p className="flex justify-between">
            <span className="text-gray-600">Section max:</span>
            <span className="font-medium">{formatNumber(ec2Results.maxSteelArea)} mm²</span>
          </p>
        </div>
      </div>
      
      <div className="md:col-span-2 bg-blue-50 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <ArrowRightLeft className="w-5 h-5" />
          Comparaison des résultats
        </h3>
        <div className="space-y-3">
          <p className="flex justify-between">
            <span className="text-gray-600">Différence de section d'acier:</span>
            <span className="font-medium">
              {formatNumber(Math.abs(ec2Results.steelArea - baelResults.steelArea))} mm² 
              ({formatNumber(Math.abs(ec2Results.steelArea - baelResults.steelArea) / baelResults.steelArea * 100)}%)
            </span>
          </p>
          <p className="flex justify-between">
            <span className="text-gray-600">Différence de bras de levier:</span>
            <span className="font-medium">
              {formatNumber(Math.abs(ec2Results.leverArm - baelResults.leverArm))} mm
              ({formatNumber(Math.abs(ec2Results.leverArm - baelResults.leverArm) / baelResults.leverArm * 100)}%)
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}