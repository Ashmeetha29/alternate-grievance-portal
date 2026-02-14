import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IconMapPin, IconArrowRight } from "@tabler/icons-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface LocationSelectorProps {
  onLocationSelect: (location: { state: string; district: string }) => void;
  selectedLocation?: { state: string; district: string };
}

// Mock data - in real app would come from API
const states = [
  { id: 'MH', name: 'Maharashtra' },
  { id: 'TN', name: 'Tamil Nadu' },
  { id: 'KA', name: 'Karnataka' },
  { id: 'TG', name: 'Telangana' },
  { id: 'WB', name: 'West Bengal' },
];

const districts: Record<string, Array<{ id: string; name: string }>> = {
  MH: [
    { id: 'MU', name: 'Mumbai' },
    { id: 'PU', name: 'Pune' },
    { id: 'NG', name: 'Nagpur' },
    { id: 'TH', name: 'Thane' },
    { id: 'AU', name: 'Aurangabad' },
  ],
  TN: [
    { id: 'CH', name: 'Chennai' },
    { id: 'CO', name: 'Coimbatore' },
    { id: 'MD', name: 'Madurai' },
    { id: 'TR', name: 'Tiruchirappalli' },
    { id: 'SL', name: 'Salem' },
  ],
  KA: [
    { id: 'BG', name: 'Bengaluru' },
    { id: 'MY', name: 'Mysuru' },
    { id: 'MN', name: 'Mangaluru' },
  ],
  TG: [
    { id: 'HY', name: 'Hyderabad' },
    { id: 'WG', name: 'Warangal' },
    { id: 'NZ', name: 'Nizamabad' },
  ],
  WB: [
    { id: 'KO', name: 'Kolkata' },
    { id: 'DA', name: 'Darjeeling' },
    { id: 'DU', name: 'Durgapur' },
  ],
};

export const LocationSelector = ({ onLocationSelect, selectedLocation }: LocationSelectorProps) => {
  const { t } = useLanguage();
  const [state, setState] = useState(selectedLocation?.state || '');
  const [district, setDistrict] = useState(selectedLocation?.district || '');

  const handleStateChange = (value: string) => {
    setState(value);
    setDistrict('');
  };

  const handleDistrictChange = (value: string) => {
    setDistrict(value);
  };

  const handleSubmit = () => {
    if (state && district) {
      const stateObj = states.find(s => s.id === state);
      const districtObj = districts[state]?.find(d => d.id === district);
      
      if (stateObj && districtObj) {
        onLocationSelect({
          state: stateObj.name,
          district: districtObj.name,
        });
      }
    }
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-secondary rounded-lg flex items-center justify-center">
            <IconMapPin className="h-5 w-5 text-secondary-foreground" />
          </div>
          <div>
            <CardTitle>{t('location.selectLocation')}</CardTitle>
            <CardDescription>{t('location.selectDescription')}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* State Selector */}
          <div>
            <label className="text-sm font-medium mb-2 block">{t('location.state')}</label>
            <Select value={state} onValueChange={handleStateChange}>
              <SelectTrigger>
                <SelectValue placeholder={t('location.selectState')} />
              </SelectTrigger>
              <SelectContent>
                {states.map((stateItem) => (
                  <SelectItem key={stateItem.id} value={stateItem.id}>
                    {stateItem.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* District Selector */}
          <div>
            <label className="text-sm font-medium mb-2 block">{t('location.district')}</label>
            <Select value={district} onValueChange={handleDistrictChange} disabled={!state}>
              <SelectTrigger>
                <SelectValue placeholder={t('location.selectDistrict')} />
              </SelectTrigger>
              <SelectContent>
                {districts[state]?.map((districtItem) => (
                  <SelectItem key={districtItem.id} value={districtItem.id}>
                    {districtItem.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button 
          onClick={handleSubmit} 
          disabled={!state || !district}
          className="w-full md:w-auto"
          variant="hero"
        >
          {t('location.continue')} <IconArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
};