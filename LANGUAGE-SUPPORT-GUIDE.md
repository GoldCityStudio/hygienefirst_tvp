# Language Support Guide

## Overview
The booking system now supports **3 languages**:
- **繁體中文** (Traditional Chinese) - zh-TW [Default]
- **简体中文** (Simplified Chinese) - zh-CN
- **English** - en

## Features

### 1. **Language Selector**
- Located in the chatbot header (top-right corner)
- Dropdown menu with 3 language options
- Changes language instantly when selected
- Preference is saved to browser localStorage

### 2. **Auto-Detection & Persistence**
- System remembers your last language choice
- Language preference is stored in localStorage
- Automatically loads preferred language on next visit

### 3. **Comprehensive Translation Coverage**
The language manager translates:
- ✅ Chatbot title
- ✅ Welcome messages
- ✅ Input placeholder text
- ✅ Button labels (Send, Close, Next, Previous)
- ✅ Quick reply buttons
- ✅ Booking form titles and labels
- ✅ Service names
- ✅ Authentication messages
- ✅ Common UI elements

## How to Use

### For Users
1. **Open the chatbot** by clicking the robot button (bottom-right corner)
2. **Find the language selector** in the chatbot header (dropdown menu)
3. **Select your preferred language**: 繁體中文 / 简体中文 / English
4. **UI updates instantly** - all text changes to your chosen language
5. **Your choice is saved** - next time you visit, the same language is used

### For Developers

#### Language Manager Structure
```javascript
const languageManager = {
    currentLanguage: 'zh-TW',  // Default language
    supportedLanguages: {
        'zh-TW': '繁體中文',
        'zh-CN': '简体中文',
        'en': 'English'
    },
    translations: {
        'zh-TW': { ... },
        'zh-CN': { ... },
        'en': { ... }
    }
};
```

#### Key Methods
```javascript
// Get translation for a key
languageManager.t('welcomeMessage')

// Change language
languageManager.setLanguage('en')

// Initialize language manager
languageManager.init()

// Update UI with current language
languageManager.updateUI()
```

#### Using Translations in Code
```javascript
// Example 1: Get welcome message
const welcomeText = languageManager.t('welcomeMessage');

// Example 2: Get quick reply text
const quickReplies = [
    languageManager.t('servicePrice'),
    languageManager.t('howToBook'),
    languageManager.t('bookingStatus')
];

// Example 3: Conditional text based on language
const responseText = languageManager.currentLanguage === 'en'
    ? 'Thank you for your booking!'
    : languageManager.currentLanguage === 'zh-CN'
    ? '感谢您的预约！'
    : '感謝您的預約！';
```

## Translation Keys Reference

### Chatbot
| Key | zh-TW | zh-CN | en |
|-----|-------|-------|-----|
| `chatbotTitle` | AI 預約助手 | AI 预约助手 | AI Booking Assistant |
| `welcomeMessage` | 您好！我是 Hygiene First 的 AI 預約助手... | 您好！我是 Hygiene First 的 AI 预约助手... | Hello! I am Hygiene First's AI Booking Assistant... |
| `inputPlaceholder` | 輸入您的問題... | 输入您的问题... | Type your question... |
| `sendButton` | 發送 | 发送 | Send |
| `closeButton` | 關閉 | 关闭 | Close |

### Quick Replies
| Key | zh-TW | zh-CN | en |
|-----|-------|-------|-----|
| `servicePrice` | 服務價格 | 服务价格 | Service Price |
| `howToBook` | 如何預約 | 如何预约 | How to Book |
| `serviceTime` | 服務時間 | 服务时间 | Service Time |
| `cancelBooking` | 取消預約 | 取消预约 | Cancel Booking |
| `bookingStatus` | 預約狀態 | 预约状态 | Booking Status |
| `contactSupport` | 聯繫客服 | 联系客服 | Contact Support |
| `provideFeedback` | 提供意見 | 提供意见 | Provide Feedback |
| `chatHistory` | 聊天記錄 | 聊天记录 | Chat History |

### Booking Form
| Key | zh-TW | zh-CN | en |
|-----|-------|-------|-----|
| `selectService` | 選擇服務類型 | 选择服务类型 | Select Service Type |
| `selectDateTime` | 選擇日期和時間 | 选择日期和时间 | Select Date & Time |
| `customerInfo` | 填寫您的資料 | 填写您的资料 | Fill Your Information |
| `confirmBooking` | 確認預約資料 | 确认预约资料 | Confirm Booking Details |
| `nextStep` | 下一步 | 下一步 | Next Step |
| `previousStep` | 上一步 | 上一步 | Previous Step |

### Services
| Key | zh-TW | zh-CN | en |
|-----|-------|-------|-----|
| `healthAssessment` | 健康評估 | 健康评估 | Health screening |
| `elderlyCare` | 長者照顧 | 长者照顾 | Elderly Care |
| `woundCare` | 傷口護理 | 伤口护理 | Wound Care |
| `housekeeping` | 家居清潔 | 家居清洁 | Housekeeping |
| `medicalCare` | 醫療護理 | 医疗护理 | Medical Care |

### Authentication
| Key | zh-TW | zh-CN | en |
|-----|-------|-------|-----|
| `login` | 登入 | 登录 | Login |
| `signup` | 註冊 | 注册 | Sign Up |
| `logout` | 登出 | 登出 | Logout |
| `continueAsGuest` | 繼續訪客模式 | 继续访客模式 | Continue as Guest |

### Common
| Key | zh-TW | zh-CN | en |
|-----|-------|-------|-----|
| `loading` | 載入中... | 加载中... | Loading... |
| `error` | 錯誤 | 错误 | Error |
| `success` | 成功 | 成功 | Success |
| `confirm` | 確認 | 确认 | Confirm |
| `cancel` | 取消 | 取消 | Cancel |

## Adding New Languages

### Step 1: Add Language to Supported List
```javascript
supportedLanguages: {
    'zh-TW': '繁體中文',
    'zh-CN': '简体中文',
    'en': 'English',
    'ja': '日本語',  // NEW: Japanese
    'ko': '한국어'     // NEW: Korean
}
```

### Step 2: Add Translation Object
```javascript
translations: {
    'zh-TW': { ... },
    'zh-CN': { ... },
    'en': { ... },
    'ja': {  // NEW: Japanese translations
        chatbotTitle: 'AI予約アシスタント',
        welcomeMessage: 'こんにちは！...',
        inputPlaceholder: '質問を入力してください...',
        // ... add all keys
    }
}
```

### Step 3: Update Language Selector HTML
```html
<select id="language-selector" onchange="languageManager.setLanguage(this.value)">
    <option value="zh-TW">繁體中文</option>
    <option value="zh-CN">简体中文</option>
    <option value="en">English</option>
    <option value="ja">日本語</option>  <!-- NEW -->
    <option value="ko">한국어</option>  <!-- NEW -->
</select>
```

## Technical Implementation

### Initialization Flow
```
1. Page Load
   ↓
2. languageManager.init() called
   ↓
3. Check localStorage for 'preferred_language'
   ↓
4. Set currentLanguage (default: 'zh-TW')
   ↓
5. languageManager.updateUI() called
   ↓
6. Update all UI elements with translations
```

### Language Change Flow
```
1. User selects language from dropdown
   ↓
2. languageManager.setLanguage(lang) called
   ↓
3. currentLanguage updated
   ↓
4. languageManager.updateUI() called
   ↓
5. Save preference to localStorage
   ↓
6. UI updates instantly
```

### Data Persistence
- **Storage**: Browser localStorage
- **Key**: `preferred_language`
- **Values**: `zh-TW`, `zh-CN`, `en`
- **Lifetime**: Permanent (until browser data is cleared)

## UI Components Updated

### 1. Chatbot Header
- Title text
- Language selector value
- Close button text (if applicable)

### 2. Chatbot Input Area
- Input placeholder
- Send button text

### 3. Quick Reply Buttons
- All button labels
- Button actions remain the same

### 4. Booking Form
- Step titles (Step 1-4)
- Button labels (Next, Previous, Confirm)
- Section headers
- Quick fill button text

### 5. Welcome & Response Messages
- Welcome message
- Greeting responses
- Default fallback messages
- Error messages

## Browser Compatibility
- ✅ Chrome / Edge (Chromium)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## localStorage Support
- Required: Yes
- Fallback: Uses default language (zh-TW) if localStorage is unavailable
- Privacy: All data stored locally in user's browser

## Best Practices

### 1. Always Use Translation Keys
❌ **Don't hardcode text**:
```javascript
addMessage('服務價格', 'bot');
```

✅ **Use translation keys**:
```javascript
addMessage(languageManager.t('servicePrice'), 'bot');
```

### 2. Check Current Language for Dynamic Content
```javascript
const message = languageManager.currentLanguage === 'en'
    ? 'Your booking is confirmed!'
    : languageManager.currentLanguage === 'zh-CN'
    ? '您的预约已确认！'
    : '您的預約已確認！';
```

### 3. Keep Translation Keys Consistent
- Use camelCase for keys: `servicePrice`, `howToBook`
- Group related keys: `chatbot*`, `booking*`, `auth*`
- Use descriptive names: `welcomeMessage` not `msg1`

## Testing Checklist

- [ ] Default language loads correctly (zh-TW)
- [ ] Language selector shows current language
- [ ] Switching to 简体中文 works
- [ ] Switching to English works
- [ ] Language preference persists after page refresh
- [ ] All chatbot messages use translations
- [ ] All quick replies use translations
- [ ] Booking form titles update correctly
- [ ] Button labels update correctly
- [ ] Welcome message changes language
- [ ] Default responses use correct language

## Troubleshooting

### Issue: Language doesn't change
**Solution**: Check browser console for errors. Ensure `languageManager.init()` is called.

### Issue: Some text doesn't translate
**Solution**: Check if the text is hardcoded. Replace with `languageManager.t('key')`.

### Issue: Language preference not saved
**Solution**: Check if localStorage is enabled. Some browsers block it in incognito mode.

### Issue: Wrong language loads
**Solution**: Clear localStorage: `localStorage.removeItem('preferred_language')` in console.

## Future Enhancements

### Potential Features
1. **Auto-detect browser language**
   ```javascript
   const browserLang = navigator.language.split('-')[0];
   // Map 'zh' to 'zh-TW' or 'zh-CN', 'en' to 'en'
   ```

2. **Right-to-left (RTL) language support**
   - Add Arabic, Hebrew
   - Adjust UI direction

3. **Voice input in multiple languages**
   - Integrate Web Speech API
   - Support multi-language recognition

4. **Translation API integration**
   - Auto-translate user inputs
   - Real-time translation for responses

5. **Language-specific content**
   - Show different services per language
   - Localized pricing
   - Regional contact information

## Summary
The language support system provides:
- ✅ 3 languages (Traditional Chinese, Simplified Chinese, English)
- ✅ Easy language switching via dropdown
- ✅ Persistent language preference
- ✅ Comprehensive translation coverage
- ✅ Developer-friendly translation API
- ✅ Extensible for additional languages

---

**Last Updated**: October 2, 2025
**Version**: 1.0
**Author**: Hygiene First Development Team

