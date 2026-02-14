import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'hi' | 'ta' | 'te' | 'bn';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation data
const translations = {
  en: {
    // Login & Auth
    'auth.welcome': 'Welcome Back',
    'auth.createAccount': 'Create Account',
    'auth.signInDescription': 'Sign in to access municipal services',
    'auth.signUpDescription': 'Sign up for municipal services',
    'auth.citizen': 'Citizen',
    'auth.staff': 'Staff',
    'auth.mobile': 'Mobile Number',
    'auth.mobilePlaceholder': 'Enter 10-digit mobile number',
    'auth.fullName': 'Full Name',
    'auth.fullNamePlaceholder': 'Enter your full name',
    'auth.email': 'Email Address',
    'auth.emailPlaceholder': 'Enter your email address',
    'auth.employeeId': 'Employee ID',
    'auth.employeeIdPlaceholder': 'Enter employee ID',
    'auth.password': 'Password',
    'auth.passwordPlaceholder': 'Enter password',
    'auth.signInCitizen': 'Sign In as Citizen',
    'auth.signInStaff': 'Sign In as Staff',
    'auth.createCitizenAccount': 'Create Citizen Account',
    'auth.signingIn': 'Signing In...',
    'auth.creatingAccount': 'Creating Account...',
    'auth.alreadyAccount': 'Already have an account? Sign in',
    'auth.newUser': 'New user? Create an account',
    'auth.staffAdminOnly': 'Staff accounts are created by administrators only',
    'auth.secureAccess': 'Secure access to municipal services • Government of India',
    
    // Header
    'header.municipalPortal': 'Municipal Portal',
    'header.grievanceSystem': 'Grievance Redressal System',
    
    // Location
    'location.selectLocation': 'Select Your Location',
    'location.selectDescription': 'Choose your state and district for location-aware services',
    'location.state': 'State',
    'location.district': 'District',
    'location.selectState': 'Select state',
    'location.selectDistrict': 'Select district',
    'location.continue': 'Continue',
    
    // Departments
    'departments.title': 'Select Department',
    'departments.description': 'Choose the relevant department for your grievance',
    'departments.selectDepartment': 'Select Department',
    'departments.pending': 'pending',
    'departments.electricity': 'Electricity',
    'departments.electricityDesc': 'Street lights, power outages, damaged poles and electrical infrastructure issues',
    'departments.waterSupply': 'Water Supply',
    'departments.waterSupplyDesc': 'Pipe leakages, contaminated water, reduced water supply and related issues',
    'departments.roadsTransport': 'Roads & Transport',
    'departments.roadsTransportDesc': 'Potholes, unfinished road works, road destructions and transport issues',
    'departments.healthSanitation': 'Health & Sanitation',
    'departments.healthSanitationDesc': 'Garbage collection, hygiene issues, unswept streets and sanitation problems',
    'departments.sewageDrainage': 'Sewage & Drainage',
    'departments.sewageDrainageDesc': 'Blocked drains, sewage leaks, mosquito breeding and drainage issues',
    
    // Complaint Form
    'complaint.submitComplaint': 'Submit Complaint',
    'complaint.submitDescription': 'Submit your grievance to {department} department',
    'complaint.title': 'Complaint Title',
    'complaint.titlePlaceholder': 'Brief title describing your issue',
    'complaint.description': 'Detailed Description',
    'complaint.descriptionPlaceholder': 'Describe your issue in detail...',
    'complaint.location': 'Specific Location (Optional)',
    'complaint.locationPlaceholder': 'Street address, landmark, area details',
    'complaint.attachments': 'Attachments (Optional)',
    'complaint.uploadText': 'Click to upload images, videos, or documents',
    'complaint.supportedFiles': 'Supported: JPG, PNG, MP4, PDF, DOC (Max 10MB each)',
    'complaint.attachedFiles': 'Attached Files:',
    'complaint.remove': 'Remove',
    'complaint.submitting': 'Submitting...',
    'complaint.submit': 'Submit Complaint',
    'complaint.backToDepartments': '← Back to Departments',
    'complaint.required': '*',
    'complaint.characters': 'characters',
    
    // Staff Dashboard
    'staff.dashboard': 'Staff Dashboard',
    'staff.welcomeBack': 'Welcome back, {name} • {department} Department',
    'staff.totalAssigned': 'Total Assigned',
    'staff.pending': 'Pending',
    'staff.inProgress': 'In Progress',
    'staff.resolvedToday': 'Resolved Today',
    'staff.assignedComplaints': 'Assigned Complaints',
    'staff.manageDescription': 'Manage and respond to citizen grievances',
    'staff.ticketId': 'Ticket ID:',
    'staff.citizen': 'Citizen:',
    'staff.location': 'Location:',
    'staff.assigned': 'Assigned:',
    'staff.view': 'View',
    'staff.chat': 'Chat',
    'staff.high': 'high',
    'staff.medium': 'medium',
    'staff.low': 'low',
    
    // Common
    'common.location': 'Location:',
    'common.fillRequired': 'Please fill required fields',
    'common.fillAll': 'Please fill all fields',
    'common.success': 'Success',
    'common.error': 'Error',
    'common.complaintSubmitted': 'Complaint Submitted Successfully',
    'common.ticketId': 'Your ticket ID is {ticketId}',
  },
  
  hi: {
    // Login & Auth
    'auth.welcome': 'स्वागत है',
    'auth.createAccount': 'खाता बनाएं',
    'auth.signInDescription': 'नगरीय सेवाओं तक पहुंचने के लिए साइन इन करें',
    'auth.signUpDescription': 'नगरीय सेवाओं के लिए साइन अप करें',
    'auth.citizen': 'नागरिक',
    'auth.staff': 'कर्मचारी',
    'auth.mobile': 'मोबाइल नंबर',
    'auth.mobilePlaceholder': '10 अंकों का मोबाइल नंबर दर्ज करें',
    'auth.fullName': 'पूरा नाम',
    'auth.fullNamePlaceholder': 'अपना पूरा नाम दर्ज करें',
    'auth.email': 'ईमेल पता',
    'auth.emailPlaceholder': 'अपना ईमेल पता दर्ज करें',
    'auth.employeeId': 'कर्मचारी आईडी',
    'auth.employeeIdPlaceholder': 'कर्मचारी आईडी दर्ज करें',
    'auth.password': 'पासवर्ड',
    'auth.passwordPlaceholder': 'पासवर्ड दर्ज करें',
    'auth.signInCitizen': 'नागरिक के रूप में साइन इन करें',
    'auth.signInStaff': 'कर्मचारी के रूप में साइन इन करें',
    'auth.createCitizenAccount': 'नागरिक खाता बनाएं',
    'auth.signingIn': 'साइन इन हो रहे हैं...',
    'auth.creatingAccount': 'खाता बनाया जा रहा है...',
    'auth.alreadyAccount': 'पहले से खाता है? साइन इन करें',
    'auth.newUser': 'नए उपयोगकर्ता? खाता बनाएं',
    'auth.staffAdminOnly': 'कर्मचारी खाते केवल प्रशासकों द्वारा बनाए जाते हैं',
    'auth.secureAccess': 'नगरीय सेवाओं तक सुरक्षित पहुंच • भारत सरकार',
    
    // Header
    'header.municipalPortal': 'नगरीय पोर्टल',
    'header.grievanceSystem': 'शिकायत निवारण प्रणाली',
    
    // Location
    'location.selectLocation': 'अपना स्थान चुनें',
    'location.selectDescription': 'स्थान-आधारित सेवाओं के लिए अपना राज्य और जिला चुनें',
    'location.state': 'राज्य',
    'location.district': 'जिला',
    'location.selectState': 'राज्य चुनें',
    'location.selectDistrict': 'जिला चुनें',
    'location.continue': 'जारी रखें',
    
    // Departments
    'departments.title': 'विभाग चुनें',
    'departments.description': 'अपनी शिकायत के लिए संबंधित विभाग चुनें',
    'departments.selectDepartment': 'विभाग चुनें',
    'departments.pending': 'लंबित',
    'departments.electricity': 'बिजली',
    'departments.electricityDesc': 'स्ट्रीट लाइट, बिजली कटौती, क्षतिग्रस्त खंभे और विद्युत अवसंरचना की समस्याएं',
    'departments.waterSupply': 'जल आपूर्ति',
    'departments.waterSupplyDesc': 'पाइप रिसाव, दूषित पानी, कम जल आपूर्ति और संबंधित समस्याएं',
    'departments.roadsTransport': 'सड़क और परिवहन',
    'departments.roadsTransportDesc': 'गड्ढे, अधूरे सड़क कार्य, सड़क क्षति और परिवहन की समस्याएं',
    'departments.healthSanitation': 'स्वास्थ्य और स्वच्छता',
    'departments.healthSanitationDesc': 'कचरा संग्रह, स्वच्छता मुद्दे, अस्वच्छ सड़कें और स्वच्छता की समस्याएं',
    'departments.sewageDrainage': 'सीवेज और जल निकासी',
    'departments.sewageDrainageDesc': 'अवरुद्ध नालियां, सीवेज रिसाव, मच्छर प्रजनन और जल निकासी की समस्याएं',
    
    // Complaint Form
    'complaint.submitComplaint': 'शिकायत दर्ज करें',
    'complaint.submitDescription': '{department} विभाग को अपनी शिकायत दर्ज करें',
    'complaint.title': 'शिकायत का शीर्षक',
    'complaint.titlePlaceholder': 'अपनी समस्या का संक्षिप्त शीर्षक',
    'complaint.description': 'विस्तृत विवरण',
    'complaint.descriptionPlaceholder': 'अपनी समस्या का विस्तार से वर्णन करें...',
    'complaint.location': 'विशिष्ट स्थान (वैकल्पिक)',
    'complaint.locationPlaceholder': 'सड़क का पता, मील का पत्थर, क्षेत्र का विवरण',
    'complaint.attachments': 'अटैचमेंट (वैकल्पिक)',
    'complaint.uploadText': 'चित्र, वीडियो या दस्तावेज़ अपलोड करने के लिए क्लिक करें',
    'complaint.supportedFiles': 'समर्थित: JPG, PNG, MP4, PDF, DOC (अधिकतम 10MB प्रत्येक)',
    'complaint.attachedFiles': 'संलग्न फाइलें:',
    'complaint.remove': 'हटाएं',
    'complaint.submitting': 'जमा किया जा रहा है...',
    'complaint.submit': 'शिकायत दर्ज करें',
    'complaint.backToDepartments': '← विभागों में वापस',
    'complaint.required': '*',
    'complaint.characters': 'अक्षर',
    
    // Staff Dashboard
    'staff.dashboard': 'कर्मचारी डैशबोर्ड',
    'staff.welcomeBack': 'स्वागत है, {name} • {department} विभाग',
    'staff.totalAssigned': 'कुल आवंटित',
    'staff.pending': 'लंबित',
    'staff.inProgress': 'प्रगति में',
    'staff.resolvedToday': 'आज हल किए गए',
    'staff.assignedComplaints': 'आवंटित शिकायतें',
    'staff.manageDescription': 'नागरिक शिकायतों का प्रबंधन और जवाब दें',
    'staff.ticketId': 'टिकट आईडी:',
    'staff.citizen': 'नागरिक:',
    'staff.location': 'स्थान:',
    'staff.assigned': 'आवंटित:',
    'staff.view': 'देखें',
    'staff.chat': 'चैट',
    'staff.high': 'उच्च',
    'staff.medium': 'मध्यम',
    'staff.low': 'कम',
    
    // Common
    'common.location': 'स्थान:',
    'common.fillRequired': 'कृपया आवश्यक फ़ील्ड भरें',
    'common.fillAll': 'कृपया सभी फ़ील्ड भरें',
    'common.success': 'सफलता',
    'common.error': 'त्रुटि',
    'common.complaintSubmitted': 'शिकायत सफलतापूर्वक दर्ज की गई',
    'common.ticketId': 'आपका टिकट आईडी है {ticketId}',
  },
  
  ta: {
    // Login & Auth
    'auth.welcome': 'வரவேற்கிறோம்',
    'auth.createAccount': 'கணக்கு உருவாக்கவும்',
    'auth.signInDescription': 'நகராட்சி சேவைகளை அணுக உள்நுழையவும்',
    'auth.signUpDescription': 'நகராட்சி சேவைகளுக்கு பதிவுசெய்யவும்',
    'auth.citizen': 'குடிமகன்',
    'auth.staff': 'ஊழியர்',
    'auth.mobile': 'மொபைல் எண்',
    'auth.mobilePlaceholder': '10 இலக்க மொபைல் எண்ணை உள்ளிடவும்',
    'auth.fullName': 'முழு பெயர்',
    'auth.fullNamePlaceholder': 'உங்கள் முழு பெயரை உள்ளிடவும்',
    'auth.email': 'மின்னஞ்சல் முகவரி',
    'auth.emailPlaceholder': 'உங்கள் மின்னஞ்சல் முகவரியை உள்ளிடவும்',
    'auth.employeeId': 'ஊழியர் அடையாள எண்',
    'auth.employeeIdPlaceholder': 'ஊழியர் அடையாள எண்ணை உள்ளிடவும்',
    'auth.password': 'கடவுச்சொல்',
    'auth.passwordPlaceholder': 'கடவுச்சொல்லை உள்ளிடவும்',
    'auth.signInCitizen': 'குடிமகனாக உள்நுழையவும்',
    'auth.signInStaff': 'ஊழியராக உள்நுழையவும்',
    'auth.createCitizenAccount': 'குடிமகன் கணக்கை உருவாக்கவும்',
    'auth.signingIn': 'உள்நுழைகிறது...',
    'auth.creatingAccount': 'கணக்கு உருவாக்கப்படுகிறது...',
    'auth.alreadyAccount': 'ஏற்கனவே கணக்கு உள்ளதா? உள்நுழையவும்',
    'auth.newUser': 'புதிய பயனர்? கணக்கு உருவாக்கவும்',
    'auth.staffAdminOnly': 'ஊழியர் கணக்குகள் நிர்வாகிகளால் மட்டுமே உருவாக்கப்படும்',
    'auth.secureAccess': 'நகராட்சி சேவைகளுக்கு பாதுகாப்பான அணுகல் • இந்திய அரசு',
    
    // Header
    'header.municipalPortal': 'நகராட்சி போர்ட்டல்',
    'header.grievanceSystem': 'குறைதீர்ப்பு அமைப்பு',
    
    // Location
    'location.selectLocation': 'உங்கள் இடத்தைத் தேர்ந்தெடுக்கவும்',
    'location.selectDescription': 'இட-அடிப்படையிலான சேவைகளுக்கு உங்கள் மாநிலம் மற்றும் மாவட்டத்தைத் தேர்ந்தெடுக்கவும்',
    'location.state': 'மாநிலம்',
    'location.district': 'மாவட்டம்',
    'location.selectState': 'மாநிலத்தைத் தேர்ந்தெடுக்கவும்',
    'location.selectDistrict': 'மாவட்டத்தைத் தேர்ந்தெடுக்கவும்',
    'location.continue': 'தொடரவும்',
    
    // Departments
    'departments.title': 'துறையைத் தேர்ந்தெடுக்கவும்',
    'departments.description': 'உங்கள் குறைக்கு தொடர்புடைய துறையைத் தேர்ந்தெடுக்கவும்',
    'departments.selectDepartment': 'துறையைத் தேர்ந்தெடுக்கவும்',
    'departments.pending': 'நிலுவையில்',
    'departments.electricity': 'மின்சாரம்',
    'departments.electricityDesc': 'தெரு விளக்குகள், மின்சார துண்டிப்பு, சேதமடைந்த கம்பங்கள் மற்றும் மின்சார கட்டமைப்பு பிரச்சினைகள்',
    'departments.waterSupply': 'நீர் வழங்கல்',
    'departments.waterSupplyDesc': 'குழாய் கசிவுகள், அசுத்த நீர், குறைந்த நீர் வழங்கல் மற்றும் தொடர்புடைய பிரச்சினைகள்',
    'departments.roadsTransport': 'சாலைகள் மற்றும் போக்குவரத்து',
    'departments.roadsTransportDesc': 'குழிகள், முடிக்கப்படாத சாலை வேலைகள், சாலை அழிவுகள் மற்றும் போக்குவரத்து பிரச்சினைகள்',
    'departments.healthSanitation': 'சுகாதாரம் மற்றும் தூய்மை',
    'departments.healthSanitationDesc': 'குப்பை சேகரிப்பு, சுகாதார பிரச்சினைகள், துடைக்கப்படாத தெருக்கள் மற்றும் தூய்மை பிரச்சினைகள்',
    'departments.sewageDrainage': 'கழிவுநீர் மற்றும் வடிகால்',
    'departments.sewageDrainageDesc': 'அடைப்பு வடிகால்கள், கழிவுநீர் கசிவுகள், கொசு இனப்பெருக்கம் மற்றும் வடிகால் பிரச்சினைகள்',
    
    // Continue with other translations...
    'complaint.submitComplaint': 'குறையைச் சமர்ப்பிக்கவும்',
    'complaint.submit': 'குறையைச் சமர்ப்பிக்கவும்',
    'staff.dashboard': 'ஊழியர் டாஷ்போர்டு',
    'common.location': 'இடம்:',
    'common.fillRequired': 'தேவையான புலங்களை நிரப்பவும்',
  },
  
  te: {
    'auth.welcome': 'స్వాగతం',
    'auth.citizen': 'పౌరుడు',
    'auth.staff': 'సిబ్బంది',
    'header.municipalPortal': 'మునిసిపల్ పోర్టల్',
    'header.grievanceSystem': 'ఫిర్యాదుల పరిష్కార వ్యవస్థ',
    'location.selectLocation': 'మీ స్థానాన్ని ఎంచుకోండి',
    'location.state': 'రాష్ట్రం',
    'location.district': 'జిల్లా',
    'departments.title': 'విభాగాన్ని ఎంచుకోండి',
    'departments.electricity': 'విద్యుత్',
    'departments.waterSupply': 'నీటి సరఫరా',
    'complaint.submitComplaint': 'ఫిర్యాదు దాఖలు చేయండి',
    'staff.dashboard': 'సిబ్బంది డాష్‌బోర్డ్',
    'common.location': 'స్థానం:',
  },
  
  bn: {
    'auth.welcome': 'স্বাগতম',
    'auth.citizen': 'নাগরিক',
    'auth.staff': 'কর্মচারী',
    'header.municipalPortal': 'পৌর পোর্টাল',
    'header.grievanceSystem': 'অভিযোগ নিষ্পত্তি ব্যবস্থা',
    'location.selectLocation': 'আপনার অবস্থান নির্বাচন করুন',
    'location.state': 'রাজ্য',
    'location.district': 'জেলা',
    'departments.title': 'বিভাগ নির্বাচন করুন',
    'departments.electricity': 'বিদ্যুৎ',
    'departments.waterSupply': 'জল সরবরাহ',
    'complaint.submitComplaint': 'অভিযোগ জমা দিন',
    'staff.dashboard': 'কর্মচারী ড্যাশবোর্ড',
    'common.location': 'অবস্থান:',
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
    // Store in localStorage for persistence
    localStorage.setItem('selectedLanguage', language);
  };

  // Load language from localStorage on init
  React.useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') as Language;
    if (savedLanguage && ['en', 'hi', 'ta', 'te', 'bn'].includes(savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const t = (key: string, params?: Record<string, string>): string => {
    let translation = translations[currentLanguage]?.[key] || translations.en[key] || key;
    
    // Replace parameters in translation
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        translation = translation.replace(`{${param}}`, value);
      });
    }
    
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const languages = [
  { code: 'en' as Language, name: 'English' },
  { code: 'hi' as Language, name: 'हिंदी' },
  { code: 'ta' as Language, name: 'தமிழ்' },
  { code: 'te' as Language, name: 'తెలుగు' },
  { code: 'bn' as Language, name: 'বাংলা' },
];