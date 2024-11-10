import React, { useState, useMemo } from 'react';
import { Calculator, DollarSign, Percent, Building2, TrendingUp } from 'lucide-react';
import { Property } from '../types';

interface FinancialCalculatorProps {
  property: Property;
  onClose: () => void;
}

interface CalculationResult {
  monthlyMortgage: number;
  annualCashFlow: number;
  cashOnCashReturn: number;
  totalInvestment: number;
  fiveYearEquity: number;
  irr: number;
}

export function FinancialCalculator({ property, onClose }: FinancialCalculatorProps) {
  const [loanTerms, setLoanTerms] = useState({
    downPaymentPercent: 25,
    interestRate: 5.5,
    loanTerm: 30,
    closingCosts: property.price * 0.03,
    vacancyRate: 5,
    operatingExpenseRatio: 45,
    propertyAppreciation: 3,
    rentGrowth: 3,
    expenseGrowth: 2,
  });

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  const percentFormatter = new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  const calculations = useMemo((): CalculationResult => {
    const downPayment = (property.price * loanTerms.downPaymentPercent) / 100;
    const loanAmount = property.price - downPayment;
    const monthlyRate = loanTerms.interestRate / 1200;
    const numberOfPayments = loanTerms.loanTerm * 12;

    // Monthly mortgage payment (P&I)
    const monthlyMortgage = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    // Annual cash flow calculation
    const grossPotentialRent = property.noi! / (1 - loanTerms.operatingExpenseRatio / 100) * 12;
    const effectiveGrossIncome = grossPotentialRent * (1 - loanTerms.vacancyRate / 100);
    const operatingExpenses = effectiveGrossIncome * (loanTerms.operatingExpenseRatio / 100);
    const annualDebtService = monthlyMortgage * 12;
    const annualCashFlow = effectiveGrossIncome - operatingExpenses - annualDebtService;

    // Cash on cash return
    const totalInvestment = downPayment + loanTerms.closingCosts;
    const cashOnCashReturn = (annualCashFlow / totalInvestment) * 100;

    // 5-year equity projection
    const principalPaidYear1 = calculatePrincipalPaid(loanAmount, loanTerms.interestRate, 1);
    const appreciationYear5 = property.price * Math.pow(1 + loanTerms.propertyAppreciation / 100, 5);
    const principalPaidYear5 = calculatePrincipalPaid(loanAmount, loanTerms.interestRate, 5);
    const fiveYearEquity = appreciationYear5 - loanAmount + principalPaidYear5;

    // Simplified IRR calculation (approximation)
    const yearlyReturns = [];
    let currentCashFlow = annualCashFlow;
    for (let i = 0; i < 5; i++) {
      yearlyReturns.push(currentCashFlow);
      currentCashFlow *= (1 + loanTerms.rentGrowth / 100);
    }
    yearlyReturns[4] += fiveYearEquity - totalInvestment; // Add equity gain in final year
    const irr = calculateSimpleIRR([-totalInvestment, ...yearlyReturns]);

    return {
      monthlyMortgage,
      annualCashFlow,
      cashOnCashReturn,
      totalInvestment,
      fiveYearEquity,
      irr,
    };
  }, [property, loanTerms]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Calculator className="w-6 h-6 text-indigo-600" />
              <h2 className="text-2xl font-bold">Investment Analysis</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Investment Parameters</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Down Payment (%)
                  </label>
                  <input
                    type="number"
                    value={loanTerms.downPaymentPercent}
                    onChange={(e) => setLoanTerms(prev => ({
                      ...prev,
                      downPaymentPercent: parseFloat(e.target.value)
                    }))}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Interest Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={loanTerms.interestRate}
                    onChange={(e) => setLoanTerms(prev => ({
                      ...prev,
                      interestRate: parseFloat(e.target.value)
                    }))}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Loan Term (years)
                  </label>
                  <select
                    value={loanTerms.loanTerm}
                    onChange={(e) => setLoanTerms(prev => ({
                      ...prev,
                      loanTerm: parseInt(e.target.value)
                    }))}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value={15}>15 years</option>
                    <option value={20}>20 years</option>
                    <option value={25}>25 years</option>
                    <option value={30}>30 years</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vacancy Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={loanTerms.vacancyRate}
                    onChange={(e) => setLoanTerms(prev => ({
                      ...prev,
                      vacancyRate: parseFloat(e.target.value)
                    }))}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Investment Analysis</h3>
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <DollarSign className="w-4 h-4" />
                    <span>Monthly Mortgage Payment</span>
                  </div>
                  <p className="text-2xl font-bold">{formatter.format(calculations.monthlyMortgage)}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>Annual Cash Flow</span>
                  </div>
                  <p className="text-2xl font-bold">{formatter.format(calculations.annualCashFlow)}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Percent className="w-4 h-4" />
                    <span>Cash on Cash Return</span>
                  </div>
                  <p className="text-2xl font-bold">{percentFormatter.format(calculations.cashOnCashReturn / 100)}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Building2 className="w-4 h-4" />
                    <span>5-Year Projected Equity</span>
                  </div>
                  <p className="text-2xl font-bold">{formatter.format(calculations.fiveYearEquity)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t">
            <h3 className="text-lg font-semibold mb-4">Investment Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-sm text-indigo-600 mb-1">Total Investment Required</p>
                <p className="text-xl font-bold">{formatter.format(calculations.totalInvestment)}</p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-sm text-indigo-600 mb-1">5-Year IRR</p>
                <p className="text-xl font-bold">{percentFormatter.format(calculations.irr / 100)}</p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-sm text-indigo-600 mb-1">Break-even Period</p>
                <p className="text-xl font-bold">
                  {(calculations.totalInvestment / calculations.annualCashFlow).toFixed(1)} years
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper functions
function calculatePrincipalPaid(loanAmount: number, interestRate: number, years: number): number {
  const monthlyRate = interestRate / 1200;
  const numberOfPayments = years * 12;
  const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, 360)) / 
    (Math.pow(1 + monthlyRate, 360) - 1);
  
  let remainingBalance = loanAmount;
  for (let i = 0; i < numberOfPayments; i++) {
    const interestPayment = remainingBalance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    remainingBalance -= principalPayment;
  }
  
  return loanAmount - remainingBalance;
}

function calculateSimpleIRR(cashFlows: number[]): number {
  const guess = 0.1;
  const epsilon = 0.0001;
  let rate = guess;
  
  for (let i = 0; i < 100; i++) {
    const npv = cashFlows.reduce((acc, cf, t) => acc + cf / Math.pow(1 + rate, t), 0);
    if (Math.abs(npv) < epsilon) break;
    rate += (npv > 0 ? 0.01 : -0.01);
  }
  
  return rate * 100;
}