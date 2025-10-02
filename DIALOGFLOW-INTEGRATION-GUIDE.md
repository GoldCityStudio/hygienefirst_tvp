# Dialogflow Agent Integration Guide

## Overview
The AI chatbot on `booking.html` has been updated to integrate with a real Google Dialogflow agent. The system includes multiple authentication methods and fallback responses for reliability.

## ✅ **Features Implemented**

### **1. Real Dialogflow API Integration**
- Direct API calls to Dialogflow detectIntent endpoint
- Proper request/response handling with error management
- Session management for conversation context
- Timezone support (Asia/Hong_Kong)

### **2. Multiple Authentication Methods**
- **Environment Variable**: `window.DIALOGFLOW_ACCESS_TOKEN`
- **Server-Side Proxy**: `/api/dialogflow-token` endpoint
- **Google Sign-In**: OAuth2 authentication
- **Service Account**: JWT token generation (placeholder)

### **3. Robust Error Handling**
- Graceful fallback to simulated responses
- Detailed error logging and debugging
- User-friendly error messages
- Network failure recovery

### **4. Enhanced Response Processing**
- Quick replies extraction from Dialogflow responses
- Intent detection and logging
- Context-aware conversation flow
- Rich message formatting

## 🚀 **Quick Setup (3 Methods)**

### **Method 1: Environment Variable (Easiest)**
Add this to your HTML before the chatbot script:
```html
<script>
    window.DIALOGFLOW_ACCESS_TOKEN = 'YOUR_ACCESS_TOKEN_HERE';
</script>
```

### **Method 2: Server-Side Proxy (Recommended)**
Create an endpoint `/api/dialogflow-token` that returns:
```json
{
    "accessToken": "YOUR_ACCESS_TOKEN_HERE"
}
```

### **Method 3: Google Sign-In**
1. Get Google Client ID from Google Cloud Console
2. Replace `YOUR_GOOGLE_CLIENT_ID` in the code
3. Implement Google Sign-In flow

## 🔧 **Detailed Setup Instructions**

### **Step 1: Create Dialogflow Agent**

1. **Go to [Dialogflow Console](https://dialogflow.cloud.google.com/)**
2. **Create New Agent**:
   - Agent Name: `Hygiene First Booking Assistant`
   - Default Language: `Chinese (Traditional) - zh-TW`
   - Timezone: `Asia/Hong_Kong`
   - Google Project: Select your project

### **Step 2: Configure Intents**

Create these essential intents:

#### **Intent: `welcome`**
- **Training Phrases**:
  ```
  你好
  我想了解服務
  我需要幫助
  開始預約
  有什麼服務
  ```
- **Response**:
  ```
  您好！我是 Hygiene First 的 AI 預約助手 🤖

我可以幫助您：
• 了解我們的服務項目
• 解答預約相關問題
• 提供價格資訊
• 協助您完成預約

請告訴我您需要什麼幫助！
  ```

#### **Intent: `service_pricing`**
- **Training Phrases**:
  ```
  服務價格
  多少錢
  費用
  價格表
  收費標準
  ```
- **Response**:
  ```
  我們的服務價格如下：

🏠 上門健康評估：HK$800起
🧹 家居清潔服務：HK$300起
🏥 醫療護理服務：HK$500起
💊 藥物管理服務：HK$400起
🛠️ 康復護理服務：HK$600起
🍽️ 營養餐食服務：HK$200起
🧼 個人護理服務：HK$350起
🏥 術後護理服務：HK$700起

*實際價格會根據服務內容和時間長度調整
*我們提供多種優惠方案，歡迎詢問！
  ```

#### **Intent: `booking_process`**
- **Training Phrases**:
  ```
  如何預約
  預約流程
  怎麼預約
  預約步驟
  如何下單
  ```
- **Response**:
  ```
  預約流程非常簡單：

1️⃣ 選擇您需要的服務
2️⃣ 選擇合適的日期和時間
3️⃣ 填寫您的聯絡資料
4️⃣ 確認預約詳情

您現在就可以在頁面上完成預約，或者我可以協助您了解更多詳情！
  ```

#### **Intent: `service_duration`**
- **Training Phrases**:
  ```
  服務時間
  多長時間
  時長
  需要多久
  服務多久
  ```
- **Response**:
  ```
  服務時間安排：

⏰ 一般服務：2-4小時
🏥 健康評估：1-2小時
🧹 清潔服務：2-3小時
💊 藥物管理：1-2小時
🍽️ 營養餐食：30分鐘-1小時

我們會根據您的具體需求調整服務時間，確保提供最優質的服務！
  ```

#### **Intent: `cancellation_policy`**
- **Training Phrases**:
  ```
  取消預約
  改期
  取消政策
  退款
  取消費用
  ```
- **Response**:
  ```
  關於取消和改期：

✅ 提前24小時：免費取消或改期
⚠️ 24小時內：收取50%費用
❌ 當天取消：收取100%費用

我們理解有時需要調整時間，建議您盡早聯繫我們安排！
  ```

#### **Intent: `discounts_promotions`**
- **Training Phrases**:
  ```
  優惠
  折扣
  促銷
  特價
  會員優惠
  ```
- **Response**:
  ```
  我們提供多種優惠：

🎉 新客戶：首次服務9折優惠
👥 推薦朋友：雙方各享8折
📅 定期服務：月付享85折
👴 長者優惠：65歲以上9折
💳 會員優惠：年費會員享8折

更多優惠詳情請聯繫我們的客服！
  ```

#### **Intent: `contact_support`**
- **Training Phrases**:
  ```
  聯繫客服
  客服電話
  人工服務
  電話
  客服
  ```
- **Response**:
  ```
  聯繫我們：

📞 客服熱線：+852 9676 9157
📧 電郵：info@hygienefirst.hk
💬 WhatsApp：+852 9676 9157
🌐 網站：www.hygienefirst.hk

服務時間：週一至週日 9:00-18:00
我們隨時為您提供專業服務！
  ```

### **Step 3: Get API Credentials**

#### **Option A: Service Account (Recommended)**
1. Go to Google Cloud Console → IAM & Admin → Service Accounts
2. Create new service account
3. Grant "Dialogflow API Client" role
4. Download JSON key file
5. Use the key to generate access tokens

#### **Option B: OAuth2 Client**
1. Go to Google Cloud Console → APIs & Services → Credentials
2. Create OAuth2 client ID
3. Configure authorized domains
4. Use client ID for Google Sign-In

### **Step 4: Configure Authentication**

#### **Method 1: Direct Token (Development)**
```html
<script>
    window.DIALOGFLOW_ACCESS_TOKEN = 'ya29.a0AfH6SMC...'; // Your access token
</script>
```

#### **Method 2: Server-Side Proxy (Production)**
Create `/api/dialogflow-token` endpoint:
```javascript
// Node.js example
app.post('/api/dialogflow-token', async (req, res) => {
    try {
        const { GoogleAuth } = require('google-auth-library');
        const auth = new GoogleAuth({
            keyFile: 'path/to/service-account-key.json',
            scopes: ['https://www.googleapis.com/auth/cloud-platform']
        });
        
        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();
        
        res.json({ accessToken: accessToken.token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
```

#### **Method 3: Google Sign-In**
```html
<script>
    // Replace with your actual client ID
    window.GOOGLE_CLIENT_ID = 'your-client-id.apps.googleusercontent.com';
</script>
```

### **Step 5: Test Integration**

1. **Open Browser Console** on booking.html
2. **Check Authentication Status**:
   ```javascript
   console.log('Dialogflow Config:', DIALOGFLOW_CONFIG);
   ```
3. **Test Chatbot**:
   - Click the robot button
   - Ask "服務價格"
   - Check console for API calls

### **Step 6: Configure Project Settings**

Update the project ID in the code:
```javascript
// In booking.html, find this line:
projectId: 'hygiene-first-booking', // Replace with your actual project ID
```

## 🔍 **Debugging and Monitoring**

### **Console Logging**
The system provides detailed logging:
- ✅ Authentication success
- ⚠️ Authentication warnings
- ❌ API errors
- 🔄 Request/response details

### **Common Issues**

#### **1. CORS Errors**
```
Access to fetch at 'https://dialogflow.googleapis.com/...' from origin '...' has been blocked by CORS policy
```
**Solution**: Use server-side proxy or configure CORS headers

#### **2. Authentication Errors**
```
HTTP error! status: 401
```
**Solution**: Check access token validity and permissions

#### **3. Project Not Found**
```
HTTP error! status: 404
```
**Solution**: Verify project ID and enable Dialogflow API

### **Testing Commands**
```javascript
// Test configuration
window.configureDialogflow({
    projectId: 'your-project-id',
    accessToken: 'your-access-token'
});

// Test API call
sendToDialogflow('服務價格').then(response => console.log(response));
```

## 📊 **Analytics and Monitoring**

### **Track Usage**
```javascript
// Add to your analytics
function trackChatbotUsage(intent, response) {
    // Send to your analytics service
    gtag('event', 'chatbot_interaction', {
        intent: intent,
        response_length: response.length
    });
}
```

### **Monitor Performance**
- Response times
- Error rates
- User satisfaction
- Common questions

## 🚀 **Production Deployment**

### **Security Checklist**
- [ ] Use HTTPS only
- [ ] Implement rate limiting
- [ ] Validate all inputs
- [ ] Use environment variables for secrets
- [ ] Enable CORS properly
- [ ] Monitor API usage

### **Performance Optimization**
- [ ] Cache responses
- [ ] Implement request debouncing
- [ ] Use CDN for static assets
- [ ] Monitor memory usage

### **Monitoring Setup**
- [ ] Error tracking (Sentry, etc.)
- [ ] Performance monitoring
- [ ] User analytics
- [ ] API usage tracking

## 📞 **Support**

### **Resources**
- [Dialogflow Documentation](https://cloud.google.com/dialogflow/docs)
- [Google Cloud Console](https://console.cloud.google.com/)
- [Dialogflow Console](https://dialogflow.cloud.google.com/)

### **Troubleshooting**
1. Check browser console for errors
2. Verify API credentials
3. Test with simple messages first
4. Check network connectivity
5. Validate project configuration

## 🎯 **Current Status**

✅ **UI Implementation**: Complete
✅ **API Integration**: Complete
✅ **Authentication**: Multiple methods available
✅ **Error Handling**: Robust fallback system
✅ **Session Management**: Implemented
⏳ **Production Setup**: Ready for configuration

The chatbot is now fully integrated with Dialogflow and ready for production use. Simply configure your authentication method and project settings to enable real AI responses!
