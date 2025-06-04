
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { FormData } from '../QuoteForm';

interface ProjectDetailsStepProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

const ProjectDetailsStep: React.FC<ProjectDetailsStepProps> = ({ formData, updateFormData }) => {
  const locationOptions = [
    'Front yard',
    'Backyard',
    'Side yard',
    'Close to house',
    'Along fence line'
  ];

  const handleLocationChange = (option: string, checked: boolean) => {
    const currentLocations = formData.treeLocation;
    const updatedLocations = checked
      ? [...currentLocations, option]
      : currentLocations.filter(item => item !== option);
    
    updateFormData({ treeLocation: updatedLocations });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    updateFormData({ photos: [...formData.photos, ...files] });
  };

  const removePhoto = (index: number) => {
    const updatedPhotos = formData.photos.filter((_, i) => i !== index);
    updateFormData({ photos: updatedPhotos });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Project Details</h2>
      <p className="text-gray-600">Specifics of the trees/stumps & visuals</p>

      {/* Number of Trees */}
      <div>
        <Label htmlFor="numberOfTrees" className="text-base font-medium">
          Number of Trees/Stumps <span className="text-red-500">*</span>
        </Label>
        <Select value={formData.numberOfTrees} onValueChange={(value) => updateFormData({ numberOfTrees: value })}>
          <SelectTrigger className="mt-1 max-w-xs">
            <SelectValue placeholder="Select number" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2-3">2-3</SelectItem>
            <SelectItem value="4-5">4-5</SelectItem>
            <SelectItem value="6+">6+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tree Size */}
      <div>
        <Label htmlFor="treeSize" className="text-base font-medium">
          Approximate Size/Height of Tree(s) <span className="text-gray-500">(If applicable)</span>
        </Label>
        <Select value={formData.treeSize} onValueChange={(value) => updateFormData({ treeSize: value })}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select size range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="small">Small (under 30ft - single-story house height)</SelectItem>
            <SelectItem value="medium">Medium (30-60ft - two-story house height)</SelectItem>
            <SelectItem value="large">Large (over 60ft)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tree Location */}
      <div>
        <Label className="text-base font-medium">
          Location of Tree(s) on Property <span className="text-gray-500">(Helpful)</span>
        </Label>
        <Card className="p-4 mt-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {locationOptions.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={`location-${option}`}
                  checked={formData.treeLocation.includes(option)}
                  onCheckedChange={(checked) => handleLocationChange(option, !!checked)}
                />
                <Label htmlFor={`location-${option}`} className="text-sm font-normal">
                  {option}
                </Label>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Photo Upload */}
      <div>
        <Label htmlFor="photos" className="text-base font-medium">
          Photo/Video Upload <span className="text-green-600">(Highly Recommended)</span>
        </Label>
        <p className="text-sm text-gray-600 mt-1 mb-3">
          Clear photos of the tree(s)/stump(s), surrounding area, access points, and any obstacles help us provide accurate quotes.
        </p>
        
        <Card className="p-4 border-dashed border-2 border-gray-300">
          <div className="text-center">
            <Input
              id="photos"
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Label 
              htmlFor="photos" 
              className="cursor-pointer flex flex-col items-center justify-center py-4"
            >
              <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="text-sm text-gray-600">Click to upload photos or videos</span>
              <span className="text-xs text-gray-500 mt-1">Supports: JPG, PNG, MP4, MOV</span>
            </Label>
          </div>
        </Card>

        {/* Display uploaded files */}
        {formData.photos.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Uploaded Files:</h4>
            <div className="space-y-2">
              {formData.photos.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm text-gray-600 truncate">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Additional Details */}
      <div>
        <Label htmlFor="additionalDetails" className="text-base font-medium">
          Additional Project Details/Specific Concerns <span className="text-gray-500">(Optional)</span>
        </Label>
        <Textarea
          id="additionalDetails"
          placeholder="e.g., Concerned about specific branch, Want wood chipped and left on site, Haul all debris"
          value={formData.additionalDetails}
          onChange={(e) => updateFormData({ additionalDetails: e.target.value })}
          className="mt-1"
          rows={4}
        />
      </div>
    </div>
  );
};

export default ProjectDetailsStep;
