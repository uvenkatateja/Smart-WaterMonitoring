export type Language = 'english' | 'hindi' | 'telugu' | 'tamil';

export const translations = {
  english: {
    // Dashboard
    waterQualityDashboard: 'Water Quality Dashboard',
    welcome: 'Welcome',
    lastUpdated: 'Last updated',
    refresh: 'Refresh',
    auto: 'Auto',
    downloadCSV: 'Download CSV',
    
    // Water quality parameters
    pH: 'pH Level',
    TDS: 'TDS',
    Temperature: 'Temperature',
    
    // Status and conditions
    optimal: 'Optimal',
    good: 'Good',
    fair: 'Fair',
    poor: 'Poor',
    attentionNeeded: 'Attention needed',
    high: 'High',
    low: 'Low',
    moderate: 'Moderate',
    excellent: 'Excellent',
    
    // Time ranges
    today: 'Today',
    weekly: 'Weekly',
    monthly: 'Monthly',
    yearly: 'Yearly',
    
    // Alerts and recommendations
    alerts: 'Alerts',
    recommendations: 'Recommendations',
    pHRecommendationAcidic: 'The pH level is too acidic. Consider adding alkaline additives to neutralize the water.',
    pHRecommendationAlkaline: 'The pH level is too alkaline. Consider adding acid neutralizers to balance the water.',
    pHRecommendationNormal: 'The pH level is within the optimal range. Continue to monitor for any changes.',
    tdsRecommendationLow: 'The TDS level is excellent. Continue to monitor for any significant changes.',
    tdsRecommendationModerate: 'The TDS level is acceptable but moderate. Consider additional filtration if the level increases.',
    tdsRecommendationHigh: 'The TDS level is high. Water filtration is recommended to reduce the dissolved solids.',
    tempRecommendationLow: 'The water temperature is low. Consider raising the temperature for optimal ecosystem health.',
    tempRecommendationHigh: 'The water temperature is high. Consider methods to cool the water to prevent stress on aquatic life.',
    tempRecommendationNormal: 'The water temperature is within the optimal range. Continue to monitor for any changes.'
  },
  
  hindi: {
    // Dashboard
    waterQualityDashboard: 'पानी की गुणवत्ता डैशबोर्ड',
    welcome: 'स्वागत है',
    lastUpdated: 'अंतिम अपडेट',
    refresh: 'रीफ्रेश',
    auto: 'ऑटो',
    downloadCSV: 'CSV डाउनलोड करें',
    
    // Water quality parameters
    pH: 'पीएच स्तर',
    TDS: 'टीडीएस',
    Temperature: 'तापमान',
    
    // Status and conditions
    optimal: 'अनुकूलतम',
    good: 'अच्छा',
    fair: 'संतोषजनक',
    poor: 'ख़राब',
    attentionNeeded: 'ध्यान देने की आवश्यकता',
    high: 'उच्च',
    low: 'निम्न',
    moderate: 'मध्यम',
    excellent: 'उत्कृष्ट',
    
    // Time ranges
    today: 'आज',
    weekly: 'साप्ताहिक',
    monthly: 'मासिक',
    yearly: 'वार्षिक',
    
    // Alerts and recommendations
    alerts: 'अलर्ट',
    recommendations: 'सिफारिशें',
    pHRecommendationAcidic: 'पीएच स्तर बहुत अम्लीय है। पानी को निष्प्रभावित करने के लिए क्षारीय योज्य पदार्थ जोड़ने पर विचार करें।',
    pHRecommendationAlkaline: 'पीएच स्तर बहुत क्षारीय है। पानी को संतुलित करने के लिए अम्ल निष्प्रभावकों को जोड़ने पर विचार करें।',
    pHRecommendationNormal: 'पीएच स्तर इष्टतम सीमा के भीतर है। किसी भी परिवर्तन की निगरानी जारी रखें।',
    tdsRecommendationLow: 'टीडीएस स्तर उत्कृष्ट है। किसी भी महत्वपूर्ण परिवर्तन की निगरानी जारी रखें।',
    tdsRecommendationModerate: 'टीडीएस स्तर स्वीकार्य लेकिन मध्यम है। यदि स्तर बढ़ता है तो अतिरिक्त फ़िल्टरेशन पर विचार करें।',
    tdsRecommendationHigh: 'टीडीएस स्तर उच्च है। घुले हुए ठोस पदार्थों को कम करने के लिए पानी का फ़िल्टरेशन की सिफारिश की जाती है।',
    tempRecommendationLow: 'पानी का तापमान कम है। इष्टतम पारिस्थितिकी तंत्र स्वास्थ्य के लिए तापमान बढ़ाने पर विचार करें।',
    tempRecommendationHigh: 'पानी का तापमान उच्च है। जलीय जीवन पर तनाव को रोकने के लिए पानी को ठंडा करने के तरीकों पर विचार करें।',
    tempRecommendationNormal: 'पानी का तापमान इष्टतम सीमा के भीतर है। किसी भी परिवर्तन की निगरानी जारी रखें।'
  },
  
  telugu: {
    // Dashboard
    waterQualityDashboard: 'నీటి నాణ్యత డాష్‌బోర్డ్',
    welcome: 'స్వాగతం',
    lastUpdated: 'చివరిగా నవీకరించబడింది',
    refresh: 'రిఫ్రెష్',
    auto: 'ఆటో',
    downloadCSV: 'CSV డౌన్‌లోడ్ చేయండి',
    
    // Water quality parameters
    pH: 'pH స్థాయి',
    TDS: 'TDS',
    Temperature: 'ఉష్ణోగ్రత',
    
    // Status and conditions
    optimal: 'అనుకూలమైన',
    good: 'మంచిది',
    fair: 'మధ్యస్థంగా ఉంది',
    poor: 'పేదది',
    attentionNeeded: 'శ్రద్ధ అవసరం',
    high: 'ఎక్కువ',
    low: 'తక్కువ',
    moderate: 'మోస్తరు',
    excellent: 'అద్భుతమైన',
    
    // Time ranges
    today: 'నేడు',
    weekly: 'వారానికి',
    monthly: 'నెలవారీ',
    yearly: 'సంవత్సరానికి',
    
    // Alerts and recommendations
    alerts: 'హెచ్చరికలు',
    recommendations: 'సిఫార్సులు',
    pHRecommendationAcidic: 'pH స్థాయి చాలా ఆమ్లము. నీటిని తటస్థం చేయడానికి క్షారాన్ని జోడించడం పరిగణించండి.',
    pHRecommendationAlkaline: 'pH స్థాయి చాలా క్షారము. నీటిని సమతుల్యం చేయడానికి ఆమ్ల తటస్థకలను జోడించడాన్ని పరిగణించండి.',
    pHRecommendationNormal: 'pH స్థాయి సరైన పరిధిలో ఉంది. ఏదైనా మార్పులను గమనిస్తూ ఉండండి.',
    tdsRecommendationLow: 'TDS స్థాయి అద్భుతంగా ఉంది. ఏదైనా గణనీయమైన మార్పులను గమనిస్తూ ఉండండి.',
    tdsRecommendationModerate: 'TDS స్థాయి ఆమోదయోగ్యం కానీ మోస్తరు. స్థాయి పెరిగితే అదనపు ఫిల్టరేషన్‌ను పరిగణించండి.',
    tdsRecommendationHigh: 'TDS స్థాయి ఎక్కువగా ఉంది. కరిగిన ఘన పదార్థాలను తగ్గించడానికి నీటి ఫిల్టరేషన్ సిఫారసు చేయబడింది.',
    tempRecommendationLow: 'నీటి ఉష్ణోగ్రత తక్కువగా ఉంది. సరైన పర్యావరణ ఆరోగ్యం కోసం ఉష్ణోగ్రతను పెంచడాన్ని పరిగణించండి.',
    tempRecommendationHigh: 'నీటి ఉష్ణోగ్రత ఎక్కువగా ఉంది. జలచరాలపై ఒత్తిడిని నిరోధించడానికి నీటిని చల్లబరిచే పద్ధతులను పరిగణించండి.',
    tempRecommendationNormal: 'నీటి ఉష్ణోగ్రత సరైన పరిధిలో ఉంది. ఏదైనా మార్పులను గమనిస్తూ ఉండండి.'
  },
  
  tamil: {
    // Dashboard
    waterQualityDashboard: 'நீர் தர டாஷ்போர்டு',
    welcome: 'வரவேற்கிறோம்',
    lastUpdated: 'கடைசியாக புதுப்பிக்கப்பட்டது',
    refresh: 'புதுப்பி',
    auto: 'தானியங்கி',
    downloadCSV: 'CSV பதிவிறக்கம் செய்',
    
    // Water quality parameters
    pH: 'pH அளவு',
    TDS: 'TDS',
    Temperature: 'வெப்பநிலை',
    
    // Status and conditions
    optimal: 'சிறந்த',
    good: 'நல்லது',
    fair: 'சராசரி',
    poor: 'மோசமான',
    attentionNeeded: 'கவனம் தேவை',
    high: 'அதிகம்',
    low: 'குறைவு',
    moderate: 'மிதமான',
    excellent: 'மிகச்சிறந்த',
    
    // Time ranges
    today: 'இன்று',
    weekly: 'வாராந்திர',
    monthly: 'மாதாந்திர',
    yearly: 'வருடாந்திர',
    
    // Alerts and recommendations
    alerts: 'எச்சரிக்கைகள்',
    recommendations: 'பரிந்துரைகள்',
    pHRecommendationAcidic: 'pH அளவு மிகவும் அமிலத்தன்மை கொண்டது. நீரை நடுநிலைப்படுத்த காரமான சேர்க்கைகளைச் சேர்க்க பரிசீலிக்கவும்.',
    pHRecommendationAlkaline: 'pH அளவு மிகவும் காரத்தன்மை கொண்டது. நீரை சமநிலைப்படுத்த அமில நடுநிலையாக்கிகளைச் சேர்க்க பரிசீலிக்கவும்.',
    pHRecommendationNormal: 'pH அளவு சிறந்த வரம்பிற்குள் உள்ளது. எந்த மாற்றங்களையும் தொடர்ந்து கண்காணிக்கவும்.',
    tdsRecommendationLow: 'TDS அளவு மிகச்சிறந்தது. எந்த குறிப்பிடத்தக்க மாற்றங்களையும் தொடர்ந்து கண்காணிக்கவும்.',
    tdsRecommendationModerate: 'TDS அளவு ஏற்றுக்கொள்ளக்கூடியது ஆனால் மிதமானது. அளவு அதிகரித்தால் கூடுதல் வடிகட்டுதலை பரிசீலிக்கவும்.',
    tdsRecommendationHigh: 'TDS அளவு அதிகமாக உள்ளது. கரைந்த திடப்பொருட்களைக் குறைக்க நீர் வடிகட்டுதல் பரிந்துரைக்கப்படுகிறது.',
    tempRecommendationLow: 'நீரின் வெப்பநிலை குறைவாக உள்ளது. சிறந்த சுற்றுச்சூழல் ஆரோக்கியத்திற்காக வெப்பநிலையை உயர்த்த பரிசீலிக்கவும்.',
    tempRecommendationHigh: 'நீரின் வெப்பநிலை அதிகமாக உள்ளது. நீர்வாழ் உயிரினங்களுக்கு அழுத்தத்தைத் தடுக்க நீரைக் குளிர்விக்கும் முறைகளைப் பரிசீலிக்கவும்.',
    tempRecommendationNormal: 'நீரின் வெப்பநிலை சிறந்த வரம்பிற்குள் உள்ளது. எந்த மாற்றங்களையும் தொடர்ந்து கண்காணிக்கவும்.'
  }
};

// Context hook for language
export const getTranslation = (lang: Language, key: keyof typeof translations.english): string => {
  return translations[lang][key] || translations.english[key] || key;
}; 