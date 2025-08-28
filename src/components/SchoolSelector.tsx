import React, { useState } from 'react';
import { useSchools } from '../hooks/useSchools';
import { School, Plus, MapPin } from 'lucide-react';
import Button from './Button';

interface SchoolSelectorProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

const SchoolSelector: React.FC<SchoolSelectorProps> = ({ value, onChange, required = false }) => {
  const { schools, loading, addSchool } = useSchools();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSchool, setNewSchool] = useState({
    name: '',
    suburb: '',
    postcode: ''
  });
  const [isAdding, setIsAdding] = useState(false);

  const handleAddSchool = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSchool.name.trim()) return;

    setIsAdding(true);
    try {
      await addSchool(newSchool.name, newSchool.suburb, newSchool.postcode);
      onChange(newSchool.name); // Select the newly added school
      setNewSchool({ name: '', suburb: '', postcode: '' });
      setShowAddForm(false);
    } catch (error) {
      console.error('Failed to add school:', error);
      alert('Failed to add school. Please try again.');
    } finally {
      setIsAdding(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 flex items-center gap-2">
        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-electric-blue"></div>
        <span className="font-nunito text-gray-500">Loading schools...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
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
      </div>

      {!showAddForm ? (
        <button
          type="button"
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 text-electric-blue hover:text-electric-blue/80 transition-colors font-nunito text-sm"
        >
          <Plus className="w-4 h-4" />
          Don't see your school? Add it here
        </button>
      ) : (
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h4 className="font-fredoka font-semibold text-navy mb-3 flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add New School
          </h4>
          <form onSubmit={handleAddSchool} className="space-y-3">
            <div>
              <input
                type="text"
                value={newSchool.name}
                onChange={(e) => setNewSchool(prev => ({ ...prev, name: e.target.value }))}
                placeholder="School name *"
                required
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-electric-blue focus:border-electric-blue transition-colors text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                value={newSchool.suburb}
                onChange={(e) => setNewSchool(prev => ({ ...prev, suburb: e.target.value }))}
                placeholder="Suburb"
                className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-electric-blue focus:border-electric-blue transition-colors text-sm"
              />
              <input
                type="text"
                value={newSchool.postcode}
                onChange={(e) => setNewSchool(prev => ({ ...prev, postcode: e.target.value }))}
                placeholder="Postcode"
                className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-electric-blue focus:border-electric-blue transition-colors text-sm"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="primary"
                size="sm"
                disabled={isAdding || !newSchool.name.trim()}
                className="text-sm"
              >
                {isAdding ? 'Adding...' : 'Add School'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setShowAddForm(false);
                  setNewSchool({ name: '', suburb: '', postcode: '' });
                }}
                disabled={isAdding}
                className="text-sm"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SchoolSelector;