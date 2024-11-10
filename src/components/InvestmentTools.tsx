import React, { useState } from 'react';
import { Calculator, TrendingUp, PieChart, FileSpreadsheet } from 'lucide-react';
import { FinancialCalculator } from './FinancialCalculator';
import { InvestmentComparison } from './InvestmentComparison';
import { PortfolioAnalysis } from './PortfolioAnalysis';
import { ReportGenerator } from './ReportGenerator';
import { PROPERTIES } from '../data/properties';

export function InvestmentTools() {
  const [showCalculator, setShowCalculator] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [showReports, setShowReports] = useState(false);

  const [selectedProperty] = useState(PROPERTIES[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold mb-4">Investment Tools</h1>
        <p className="text-gray-600 max-w-3xl">
          Professional-grade tools to analyze multifamily investment opportunities. 
          Make data-driven decisions with our comprehensive suite of investment calculators and analysis tools.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <Calculator className="w-6 h-6 text-indigo-600" />
            <h2 className="text-xl font-bold">Financial Calculator</h2>
          </div>
          <p className="text-gray-600 mb-6">
            Comprehensive investment analysis calculator for multifamily properties.
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
              <span>Cash flow analysis</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
              <span>ROI calculations</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
              <span>Mortgage payments</span>
            </li>
          </ul>
          <button
            onClick={() => setShowCalculator(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Launch Calculator
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-indigo-600" />
            <h2 className="text-xl font-bold">Investment Comparison</h2>
          </div>
          <p className="text-gray-600 mb-6">
            Compare multiple investment opportunities side by side.
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
              <span>Side-by-side analysis</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
              <span>Key metrics comparison</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
              <span>Risk assessment</span>
            </li>
          </ul>
          <button
            onClick={() => setShowComparison(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Compare Properties
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <PieChart className="w-6 h-6 text-indigo-600" />
            <h2 className="text-xl font-bold">Portfolio Analysis</h2>
          </div>
          <p className="text-gray-600 mb-6">
            Track and analyze your entire multifamily portfolio performance.
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
              <span>Portfolio metrics</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
              <span>Performance tracking</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
              <span>Diversification analysis</span>
            </li>
          </ul>
          <button
            onClick={() => setShowPortfolio(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Analyze Portfolio
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <FileSpreadsheet className="w-6 h-6 text-indigo-600" />
            <h2 className="text-xl font-bold">Reports Generator</h2>
          </div>
          <p className="text-gray-600 mb-6">
            Generate professional investment analysis reports.
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
              <span>Custom reports</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
              <span>Export options</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
              <span>Presentation ready</span>
            </li>
          </ul>
          <button
            onClick={() => setShowReports(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Generate Report
          </button>
        </div>
      </div>

      {showCalculator && selectedProperty && (
        <FinancialCalculator
          property={selectedProperty}
          onClose={() => setShowCalculator(false)}
        />
      )}

      {showComparison && (
        <InvestmentComparison
          isOpen={showComparison}
          onClose={() => setShowComparison(false)}
        />
      )}

      {showPortfolio && (
        <PortfolioAnalysis
          isOpen={showPortfolio}
          onClose={() => setShowPortfolio(false)}
        />
      )}

      {showReports && (
        <ReportGenerator
          isOpen={showReports}
          onClose={() => setShowReports(false)}
        />
      )}
    </div>
  );
}