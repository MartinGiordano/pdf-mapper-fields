import React, { useState, useCallback } from 'react';
import { PDFViewer } from './components/PDFViewer';
import { FormField } from './types';

const template: FormField[] = [
  { name: 'name', type: 'text' },
  { name: 'lastName', type: 'text' },
  { name: 'civilState', type: 'text' },
  { name: 'isAdult', type: 'checkbox' }
];

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [currentField, setCurrentField] = useState<string | null>(null);
  const [formFields, setFormFields] = useState<FormField[]>(template);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const handleFieldPositionUpdate = useCallback((fieldName: string, coordinates: FormField['coordinates']) => {
    setFormFields(prev => prev.map(field => 
      field.name === fieldName ? { ...field, coordinates } : field
    ));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-6">PDF Form Editor</h1>
          
          <div className="mb-6">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <div className="grid grid-cols-4 gap-6">
            <div className="col-span-1 bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Available Fields</h2>
              <div className="space-y-2">
                {formFields.map(field => (
                  <button
                    key={field.name}
                    onClick={() => setCurrentField(field.name)}
                    className={`w-full px-4 py-2 text-left rounded ${
                      currentField === field.name
                        ? 'bg-blue-500 text-white'
                        : 'bg-white hover:bg-gray-100'
                    }`}
                  >
                    {field.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="col-span-3">
              <PDFViewer
                file={file}
                template={formFields}
                onFieldPositionUpdate={handleFieldPositionUpdate}
                currentField={currentField}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;