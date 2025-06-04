
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { FormData } from '../QuoteForm';

interface PropertyInfoStepProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

const PropertyInfoStep: React.FC<PropertyInfoStepProps> = ({ formData, updateFormData }) => {
  const accessOptions = [
    'Easy access (open yard, wide gate)',
    'Limited access (narrow gate)',
    'Backyard only',
    'Front yard only',
    'Steep slope',
    'Soft ground'
  ];

  const obstacleOptions = [
    'Power lines',
    'Buildings/Structures',
    'Fences',
    'Underground utilities',
    'Septic system',
    'Landscaping/Garden beds'
  ];

  const handleAccessChange = (option: string, checked: boolean) => {
    const currentAccess = formData.accessToWorkArea;
    const updatedAccess = checked
      ? [...currentAccess, option]
      : currentAccess.filter(item => item !== option);
    
    updateFormData({ accessToWorkArea: updatedAccess });
  };

  const handleObstacleChange = (option: string, checked: boolean) => {
    const currentObstacles = formData.knownObstacles;
    const updatedObstacles = checked
      ? [...currentObstacles, option]
      : currentObstacles.filter(item => item !== option);
    
    updateFormData({ knownObstacles: updatedObstacles });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Property Information</h2>
      <p className="text-gray-600">Where is the work & site conditions?</p>

      {/* Full Street Address */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <Label htmlFor="streetAddress" className="text-base font-medium">
            Street Address <span className="text-red-500">*</span>
          </Label>
          <Input
            id="streetAddress"
            type="text"
            placeholder="Enter street address"
            value={formData.streetAddress}
            onChange={(e) => updateFormData({ streetAddress: e.target.value })}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="city" className="text-base font-medium">
            City <span className="text-red-500">*</span>
          </Label>
          <Input
            id="city"
            type="text"
            placeholder="City"
            value={formData.city}
            onChange={(e) => updateFormData({ city: e.target.value })}
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="zipCodeProperty" className="text-base font-medium">
          Zip Code <span className="text-red-500">*</span>
        </Label>
        <Input
          id="zipCodeProperty"
          type="text"
          placeholder="Zip Code"
          value={formData.zipCodeProperty}
          onChange={(e) => updateFormData({ zipCodeProperty: e.target.value })}
          className="mt-1 max-w-xs"
          maxLength={5}
        />
      </div>

      {/* Property Type */}
      <div>
        <Label htmlFor="propertyType" className="text-base font-medium">
          Property Type <span className="text-gray-500">(Helpful)</span>
        </Label>
        <Select value={formData.propertyType} onValueChange={(value) => updateFormData({ propertyType: value })}>
          <SelectTrigger className="mt-1 max-w-xs">
            <SelectValue placeholder="Select property type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="residential">Residential</SelectItem>
            <SelectItem value="commercial">Commercial</SelectItem>
            <SelectItem value="hoa">HOA</SelectItem>
            <SelectItem value="vacant-lot">Vacant Lot</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Access to Work Area */}
      <div>
        <Label className="text-base font-medium">
          Access to Work Area <span className="text-red-500">*</span>
        </Label>
        <Card className="p-4 mt-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {accessOptions.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={`access-${option}`}
                  checked={formData.accessToWorkArea.includes(option)}
                  onCheckedChange={(checked) => handleAccessChange(option, !!checked)}
                />
                <Label htmlFor={`access-${option}`} className="text-sm font-normal">
                  {option}
                </Label>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Known Obstacles */}
      <div>
        <Label className="text-base font-medium">
          Known Obstacles Near Work Area <span className="text-gray-500">(Helpful)</span>
        </Label>
        <Card className="p-4 mt-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {obstacleOptions.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={`obstacle-${option}`}
                  checked={formData.knownObstacles.includes(option)}
                  onCheckedChange={(checked) => handleObstacleChange(option, !!checked)}
                />
                <Label htmlFor={`obstacle-${option}`} className="text-sm font-normal">
                  {option}
                </Label>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PropertyInfoStep;
