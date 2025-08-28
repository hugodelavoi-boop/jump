import React from 'react';
import { useSchools } from '../hooks/useSchools';
import { School } from 'lucide-react';

interface SchoolSelectorProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

const SchoolSelector: React.FC<SchoolSelectorProps> = ({ value, onChange, required = false }) => {
  const { schools, loading } = useSchools();

  if (loading) {
    return (
      <div className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 flex items-center gap-2">
        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-electric-blue"></div>
        <span className="font-nunito text-gray-500">Loading schools...</span>
      </div>
    );
  }

  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-electric-blue focus:border-electric-blue transition-colors appearance-none bg-white"
      >
        <option value="">Select your child's school</option>
        {schools.map((school) => (
          <option key={school.id} value={school.name}>
            {school.name}
            {school.suburb && ` - ${school.suburb}`}
          </option>
        ))}
      </select>
      <School className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
      
      {schools.length === 0 && (
        <p className="mt-2 text-sm text-gray-500 font-nunito">
          No schools available. Please contact us to add your school.
        </p>
      )}
    </div>
  );
};

export default SchoolSelector;