import React from 'react';

interface PDFControlsProps {
  currentPage: number;
  numPages: number;
  scale: number;
  onPageChange: (newPage: number) => void;
  onScaleChange: (newScale: number) => void;
}

export const PDFControls: React.FC<PDFControlsProps> = ({
  currentPage,
  numPages,
  scale,
  onPageChange,
  onScaleChange,
}) => (
  <div className="flex justify-between mb-4">
    <div className="space-x-2">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage <= 1}
        className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
      >
        Previous
      </button>
      <button
        onClick={() => onPageChange(Math.min(numPages, currentPage + 1))}
        disabled={currentPage >= numPages}
        className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
      >
        Next
      </button>
    </div>
    <div className="space-x-2">
      <button
        onClick={() => onScaleChange(Math.max(0.5, scale - 0.2))}
        className="px-3 py-1 bg-blue-500 text-white rounded"
      >
        Zoom Out
      </button>
      <button
        onClick={() => onScaleChange(Math.min(3, scale + 0.2))}
        className="px-3 py-1 bg-blue-500 text-white rounded"
      >
        Zoom In
      </button>
    </div>
  </div>
);