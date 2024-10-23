import React from 'react';
import { FormField, FormData } from '../types';
import { FileText, CheckSquare } from 'lucide-react';

interface FieldSelectorProps {
  template: FormField[];
  currentField: string | null;
  onFieldSelect: (fieldName: string) => void;
  formData: FormData;
  onFormDataChange: (fieldName: string, value: string | boolean) => void;
}

export const FieldSelector: React.FC<FieldSelectorProps> = ({
  template,
  currentField,
  onFieldSelect,
  formData,
  onFormDataChange,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Form Fields</h2>
      <div className="space-y-4">
        {template.map((field) => (
          <div key={field.name} className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {field.type === 'text' ? (
                  <FileText className="w-4 h-4 text-blue-500" />
                ) : (
                  <CheckSquare className="w-4 h-4 text-green-500" />
                )}
                <span className="text-sm font-medium">{field.name}</span>
              </div>
              <button
                onClick={() => onFieldSelect(field.name)}
                className={`px-3 py-1 text-sm rounded ${
                  currentField === field.name
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {field.coordinates ? 'Reposition' : 'Position'}
              </button>
            </div>
            {field.type === 'text' ? (
              <input
                type="text"
                value={formData[field.name] as string || ''}
                onChange={(e) => onFormDataChange(field.name, e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder={`Enter ${field.name}`}
              />
            ) : (
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={!!formData[field.name]}
                  onChange={(e) => onFormDataChange(field.name, e.target.checked)}
                  className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-600">Enabled</span>
              </label>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};