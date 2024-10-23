import React, { useState, useRef } from 'react';
import { Document, Page, DocumentProps } from 'react-pdf';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { FormField } from '../types';
import { PDFControls } from './PDFControls';
import { DraggableField } from './DraggableField';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

interface PDFViewerProps {
  file: File | null;
  template: FormField[];
  onFieldPositionUpdate: (fieldName: string, coordinates: FormField['coordinates']) => void;
  currentField: string | null;
}

const options: DocumentProps['options'] = {
  cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.4.120/cmaps/',
  cMapPacked: true,
};

export const PDFViewer: React.FC<PDFViewerProps> = ({
  file,
  template,
  onFieldPositionUpdate,
  currentField,
}) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.5);
  const [error, setError] = useState<string | null>(null);
  const draggableRef = useRef<HTMLDivElement>(null);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setError(null);
  };

  const onDocumentLoadError = (error: Error) => {
    setError(error.message);
  };

  const handleDragStop = (_: DraggableEvent, data: DraggableData) => {
    if (!currentField || !draggableRef.current) return;

    const element = draggableRef.current.getBoundingClientRect();
    onFieldPositionUpdate(currentField, {
      x: data.x,
      y: data.y,
      width: element.width,
      height: element.height,
      page: currentPage,
    });
  };

  if (!file) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <p className="text-gray-500">Please upload a PDF file to begin</p>
      </div>
    );
  }

  return (
    <div className="relative bg-gray-100 p-4 rounded-lg shadow-inner">
      <PDFControls
        currentPage={currentPage}
        numPages={numPages}
        scale={scale}
        onPageChange={setCurrentPage}
        onScaleChange={setScale}
      />

      <div className="relative border-2 border-gray-300 rounded-lg overflow-hidden">
        {error ? (
          <div className="p-4 text-red-500">Error loading PDF: {error}</div>
        ) : (
          <Document 
            file={file} 
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            options={options}
          >
            <Page
              pageNumber={currentPage}
              scale={scale}
              renderAnnotationLayer={false}
              renderTextLayer={false}
            />
            {currentField && (
              <Draggable
                nodeRef={draggableRef}
                onStop={handleDragStop}
                bounds="parent"
              >
                <div ref={draggableRef} className="absolute">
                  <DraggableField fieldName={currentField} />
                </div>
              </Draggable>
            )}
          </Document>
        )}
      </div>
      
      <div className="mt-2 text-center text-sm text-gray-600">
        {numPages > 0 && `Page ${currentPage} of ${numPages}`}
      </div>
    </div>
  );
};