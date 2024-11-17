import React from 'react';
import { BeamInputs } from '../types/types';

interface Props {
  inputs: BeamInputs;
  onInputChange: (name: keyof BeamInputs, value: number | string) => void;
}

export default function BeamForm({ inputs, onInputChange }: Props) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Paramètres de la poutre</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Largeur (mm)
            <input
              type="number"
              value={inputs.width}
              onChange={(e) => onInputChange('width', Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Hauteur (mm)
            <input
              type="number"
              value={inputs.height}
              onChange={(e) => onInputChange('height', Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Moment fléchissant (kN.m)
            <input
              type="number"
              value={inputs.moment}
              onChange={(e) => onInputChange('moment', Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Enrobage (mm)
            <input
              type="number"
              value={inputs.cover}
              onChange={(e) => onInputChange('cover', Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Classe de béton
            <select
              value={inputs.concreteClass}
              onChange={(e) => onInputChange('concreteClass', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="C20">C20/25</option>
              <option value="C25">C25/30</option>
              <option value="C30">C30/37</option>
              <option value="C35">C35/45</option>
              <option value="C40">C40/50</option>
            </select>
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nuance d'acier
            <select
              value={inputs.steelClass}
              onChange={(e) => onInputChange('steelClass', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="FeE400">FeE400</option>
              <option value="FeE500">FeE500</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  );
}