
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FormData } from '../QuoteForm';

interface ContactInfoStepProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

const ContactInfoStep: React.FC<ContactInfoStepProps> = ({ formData, updateFormData }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>
      <p className="text-gray-600">How can we reach you with your quote?</p>

      {/* Full Name */}
      <div>
        <Label htmlFor="fullName" className="text-base font-medium">
          Full Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="fullName"
          type="text"
          placeholder="Enter your first and last name"
          value={formData.fullName}
          onChange={(e) => updateFormData({ fullName: e.target.value })}
          className="mt-1"
        />
      </div>

      {/* Email Address */}
      <div>
        <Label htmlFor="email" className="text-base font-medium">
          Email Address <span className="text-red-500">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email address"
          value={formData.email}
          onChange={(e) => updateFormData({ email: e.target.value })}
          className="mt-1"
        />
        <p className="text-sm text-gray-500 mt-1">
          We'll send your quote and any follow-up communication here
        </p>
      </div>

      {/* Phone Number */}
      <div>
        <Label htmlFor="phoneNumber" className="text-base font-medium">
          Phone Number <span className="text-red-500">*</span>
        </Label>
        <Input
          id="phoneNumber"
          type="tel"
          placeholder="(555) 123-4567"
          value={formData.phoneNumber}
          onChange={(e) => updateFormData({ phoneNumber: e.target.value })}
          className="mt-1"
        />
        <p className="text-sm text-gray-500 mt-1">
          For quick questions, scheduling, or urgent communication
        </p>
      </div>

      {/* Preferred Contact Method */}
      <div>
        <Label className="text-base font-medium">
          Preferred Contact Method <span className="text-gray-500">(Optional)</span>
        </Label>
        <RadioGroup
          value={formData.preferredContact}
          onValueChange={(value) => updateFormData({ preferredContact: value })}
          className="mt-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="email" id="contact-email" />
            <Label htmlFor="contact-email" className="font-normal">Email</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="phone" id="contact-phone" />
            <Label htmlFor="contact-phone" className="font-normal">Phone Call</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="text" id="contact-text" />
            <Label htmlFor="contact-text" className="font-normal">Text Message</Label>
          </div>
        </RadioGroup>
      </div>

      {/* How Did You Hear About Us */}
      <div>
        <Label htmlFor="howDidYouHear" className="text-base font-medium">
          How Did You Hear About Us? <span className="text-gray-500">(Optional)</span>
        </Label>
        <Select value={formData.howDidYouHear} onValueChange={(value) => updateFormData({ howDidYouHear: value })}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="google">Google Search</SelectItem>
            <SelectItem value="referral">Referral from Friend/Family</SelectItem>
            <SelectItem value="truck">Saw Truck/Sign</SelectItem>
            <SelectItem value="social">Social Media</SelectItem>
            <SelectItem value="existing">Existing Customer</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Summary */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-8">
        <h3 className="font-semibold text-green-800 mb-2">Next Steps:</h3>
        <ul className="text-sm text-green-700 space-y-1">
          <li>• We'll review your request within 24 hours</li>
          <li>• A certified arborist will contact you to discuss details</li>
          <li>• We'll schedule a convenient time for an on-site assessment if needed</li>
          <li>• You'll receive a detailed, written quote</li>
        </ul>
      </div>
    </div>
  );
};

export default ContactInfoStep;
