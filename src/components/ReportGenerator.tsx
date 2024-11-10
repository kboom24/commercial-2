import React, { useState } from 'react';
import { FileSpreadsheet, X, Download } from 'lucide-react';
import { PROPERTIES } from '../data/properties';

interface ReportGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReportGenerator({ isOpen, onClose }: ReportGeneratorProps) {
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
  const [reportType, setReportType] = useState('investment');
  const [format, setFormat] = useState('pdf');

  const handleGenerateReport = () => {
    // Here you would typically generate and download the report
    console.log('Generating report:', {
      properties: selectedProperties,
      type: reportType,
      format,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="w-6 h-6 text-indigo-600" />
              <h2 className="text-2xl font-bold">Generate Report</h2>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Report Type
              </label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="investment">Investment Analysis</option>
                <option value="market">Market Analysis</option>
                <option value="financial">Financial Performance</option>
                <option value="portfolio">Portfolio Summary</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Properties
              </label>
              <div className="max-h-60 overflow-y-auto border rounded-lg divide-y">
                {PROPERTIES.map((property) => (
                  <label
                    key={property.id}
                    className="flex items-center p-3 hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedProperties.includes(property.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedProperties([...selectedProperties, property.id]);
                        } else {
                          setSelectedProperties(selectedProperties.filter(id => id !== property.id));
                        }
                      }}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <div className="ml-3">
                      <p className="font-medium">{property.title}</p>
                      <p className="text-sm text-gray-600">{property.location}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Format
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="pdf"
                    checked={format === 'pdf'}
                    onChange={(e) => setFormat(e.target.value)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <span className="ml-2">PDF</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="excel"
                    checked={format === 'excel'}
                    onChange={(e) => setFormat(e.target.value)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <span className="ml-2">Excel</span>
                </label>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerateReport}
                disabled={selectedProperties.length === 0}
                className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}