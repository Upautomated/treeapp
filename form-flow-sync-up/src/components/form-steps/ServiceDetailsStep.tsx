
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { FormData } from '../QuoteForm';

interface ServiceDetailsStepProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

const ServiceDetailsStep: React.FC<ServiceDetailsStepProps> = ({ formData, updateFormData }) => {
  const services = [
    {
      id: 'tree-removal',
      name: 'Tree Removal',
      description: 'Complete tree removal',
      icon: '🌳'
    },
    {
      id: 'stump-grinding',
      name: 'Stump Grinding',
      description: 'Remove tree stumps',
      icon: '⚙️'
    },
    {
      id: 'emergency-service',
      name: 'Emergency Service',
      description: 'Urgent tree issues',
      icon: '🚨'
    },
    {
      id: 'tree-health',
      name: 'Tree Health Assessment',
      description: 'Professional evaluation',
      icon: '🔍'
    },
    {
      id: 'lot-clearing',
      name: 'Lot Clearing',
      description: 'Clear multiple trees',
      icon: '🏞️'
    }
  ];

  const handleServiceToggle = (serviceId: string) => {
    const currentServices = formData.servicesNeeded;
    const updatedServices = currentServices.includes(serviceId)
      ? currentServices.filter(id => id !== serviceId)
      : [...currentServices, serviceId];
    
    updateFormData({ servicesNeeded: updatedServices });
  };

  const validateZipCode = (zipCode: string) => {
    // Simple validation for 5-digit zip code
    const zipRegex = /^\d{5}$/;
    return zipRegex.test(zipCode);
  };

  const handleZipCodeChange = (value: string) => {
    updateFormData({ zipCode: value });
    
    if (validateZipCode(value)) {
      // In a real application, you would validate against Canton, GA (30115) 100-mile radius
      console.log('Validating zip code:', value);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Service Details</h2>
      <p className="text-gray-600">Tell us about your tree service needs</p>

      {/* Property Zip Code */}
      <div>
        <Label htmlFor="zipCode" className="text-base font-medium">
          Property Zip Code <span className="text-red-500">*</span>
        </Label>
        <Input
          id="zipCode"
          type="text"
          placeholder="Enter your zip code"
          value={formData.zipCode}
          onChange={(e) => handleZipCodeChange(e.target.value)}
          maxLength={5}
          className="mt-1"
        />
        <p className="text-sm text-gray-500 mt-1">
          We service areas within 100 miles of Canton, GA
        </p>
      </div>

      {/* Services Needed */}
      <div>
        <Label className="text-base font-medium">
          What service do you need? <span className="text-red-500">*</span>
        </Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          {services.map((service) => (
            <Card
              key={service.id}
              className={`p-4 cursor-pointer transition-all border-2 ${
                formData.servicesNeeded.includes(service.id)
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleServiceToggle(service.id)}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{service.icon}</span>
                <div>
                  <h3 className="font-medium text-gray-900">{service.name}</h3>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Urgency Level */}
      <div>
        <Label htmlFor="urgency" className="text-base font-medium">
          How urgently do you need this service? <span className="text-red-500">*</span>
        </Label>
        <Select value={formData.urgencyLevel} onValueChange={(value) => updateFormData({ urgencyLevel: value })}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select urgency level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="emergency">Emergency - ASAP (tree fallen, immediate hazard)</SelectItem>
            <SelectItem value="high">High (urgent but not immediate emergency, e.g., hazardous limb)</SelectItem>
            <SelectItem value="medium">Medium (within 1-2 weeks)</SelectItem>
            <SelectItem value="low">Low (flexible, routine maintenance)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Brief Description */}
      <div>
        <Label htmlFor="description" className="text-base font-medium">
          Brief Description of Main Goal <span className="text-gray-500">(Optional but Helpful)</span>
        </Label>
        <Textarea
          id="description"
          placeholder="e.g., Remove dead pine tree in backyard, Prune branches overhanging roof"
          value={formData.briefDescription}
          onChange={(e) => updateFormData({ briefDescription: e.target.value })}
          className="mt-1"
          rows={3}
        />
      </div>
    </div>
  );
};

export default ServiceDetailsStep;
