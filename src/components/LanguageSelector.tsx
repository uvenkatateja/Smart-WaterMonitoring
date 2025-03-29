import React from 'react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { Language } from '@/utils/translations';

const languageOptions: { value: Language; label: string; flag: string }[] = [
  { value: 'english', label: 'English', flag: '🇬🇧' },
  { value: 'hindi', label: 'हिंदी', flag: '🇮🇳' },
  { value: 'telugu', label: 'తెలుగు', flag: '🇮🇳' },
  { value: 'tamil', label: 'தமிழ்', flag: '🇮🇳' }
];

interface LanguageSelectorProps {
  variant?: 'default' | 'navbar';
}

const LanguageSelector = ({ variant = 'default' }: LanguageSelectorProps) => {
  const { language, setLanguage } = useLanguage();
  
  const currentLanguage = languageOptions.find(option => option.value === language);
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {variant === 'navbar' ? (
          <Button variant="default" size="sm" className="bg-water-800 hover:bg-water-700 text-white h-8 px-2 gap-1">
            <Globe className="h-4 w-4" />
            <span>{currentLanguage?.flag}</span>
            <span className="hidden md:inline">{currentLanguage?.label}</span>
          </Button>
        ) : (
          <Button variant="outline" size="sm" className="h-8 px-2 gap-1">
            <Globe className="h-4 w-4" />
            <span>{currentLanguage?.flag}</span>
            <span className="hidden md:inline">{currentLanguage?.label}</span>
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languageOptions.map(option => (
          <DropdownMenuItem 
            key={option.value}
            onClick={() => setLanguage(option.value)}
            className={language === option.value ? "bg-accent" : ""}
          >
            <span className="mr-2">{option.flag}</span>
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector; 