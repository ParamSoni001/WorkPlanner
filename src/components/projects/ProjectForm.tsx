import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useProjects } from '../../context/ProjectContext';
import Button from '../ui/Button';
import { User } from '../../types';

interface ProjectFormProps {
  onClose: () => void;
  availableMembers: User[];
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onClose, availableMembers }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [members, setMembers] = useState<string[]>([]);
  const [error, setError] = useState('');
  const { createProject } = useProjects();
  const { user } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !description.trim()) {
      setError('Please fill out all required fields');
      return;
    }
    
    try {
      // Make sure the current user (manager) is included in the members
      const memberIds = [...members];
      if (user && !memberIds.includes(user.id)) {
        memberIds.push(user.id);
      }
      
      createProject({
        name,
        description,
        members: memberIds,
        status: 'active',
      });
      
      onClose();
    } catch (err) {
      setError('Failed to create project');
      console.error(err);
    }
  };

  const toggleMember = (memberId: string) => {
    setMembers(prev => 
      prev.includes(memberId)
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Create Project</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
      </div>
      
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Project Name*
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter project name"
            required
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description*
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Describe the project"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Team Members
          </label>
          
          {availableMembers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {availableMembers.map((member) => (
                <div
                  key={member.id}
                  className={`
                    flex items-center p-2 border rounded-md cursor-pointer
                    ${members.includes(member.id) ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:bg-gray-50'}
                  `}
                  onClick={() => toggleMember(member.id)}
                >
                  <input
                    type="checkbox"
                    checked={members.includes(member.id)}
                    onChange={() => {}}
                    className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">
                    {member.name}
                  </span>
                  <span className="ml-auto text-xs text-gray-500">
                    {member.role}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-gray-500">
              No team members available
            </div>
          )}
        </div>
        
        <div className="pt-4 flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
          >
            Create Project
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;