# Dialogflow AI Chatbot Setup Guide

## Overview
This guide will help you set up Google Dialogflow integration for the AI chatbot on the booking page (`booking.html`).

## Features Implemented
✅ **Floating Chat Button** - Animated robot icon that pulses to attract attention
✅ **Chat Interface** - Modern chat window with message bubbles
✅ **Typing Indicator** - Animated dots showing when bot is "thinking"
✅ **Quick Reply Buttons** - Pre-defined response options for common questions
✅ **Welcome Message** - Friendly greeting with service overview
✅ **Smart Responses** - Context-aware replies for common booking questions
✅ **Mobile Responsive** - Works on all device sizes

## Current Implementation
The chatbot is currently using **simulated responses** for demonstration purposes. To connect to actual Dialogflow, follow the setup steps below.

## Dialogflow Setup Steps

### 1. Create Dialogflow Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Dialogflow API
4. Go to [Dialogflow Console](https://dialogflow.cloud.google.com/)
5. Create a new agent

### 2. Configure Agent Settings
- **Agent Name**: `Hygiene First Booking Assistant`
- **Default Language**: `Chinese (Traditional) - zh-TW`
- **Timezone**: `Asia/Hong_Kong`
- **Google Project**: Select your Google Cloud project

### 3. Create Intents
Create the following intents in Dialogflow:

#### Intent: `welcome`
- **Training Phrases**:
  - 你好
  - 我想了解服務
  - 我需要幫助
  - 開始預約
- **Response**: Welcome message with service overview

#### Intent: `service_pricing`
- **Training Phrases**:
  - 服務價格
  - 多少錢
  - 費用
  - 價格表
- **Response**: Detailed pricing information

#### Intent: `booking_process`
- **Training Phrases**:
  - 如何預約
  - 預約流程
  - 怎麼預約
  - 預約步驟
- **Response**: Step-by-step booking process

#### Intent: `service_duration`
- **Training Phrases**:
  - 服務時間
  - 多長時間
  - 時長
  - 需要多久
- **Response**: Service duration information

#### Intent: `cancellation_policy`
- **Training Phrases**:
  - 取消預約
  - 改期
  - 取消政策
  - 退款
- **Response**: Cancellation and rescheduling policy

#### Intent: `discounts_promotions`
- **Training Phrases**:
  - 優惠
  - 折扣
  - 促銷
  - 特價
- **Response**: Available discounts and promotions

#### Intent: `contact_support`
- **Training Phrases**:
  - 聯繫客服
  - 客服電話
  - 人工服務
  - 電話
- **Response**: Contact information

### 4. Enable Webhook (Optional)
For advanced features, enable webhook integration:
1. Go to **Fulfillment** in Dialogflow console
2. Enable **Webhook**
3. Add your webhook URL (if you have a backend service)

### 5. Get API Credentials
1. Go to **Settings** → **General**
2. Note your **Project ID**
3. Create a service account:
   - Go to Google Cloud Console → IAM & Admin → Service Accounts
   - Create new service account
   - Download JSON key file
   - Grant Dialogflow API access

### 6. Update Code Configuration
In `booking.html`, update the Dialogflow configuration:

```javascript
// Dialogflow Configuration
const DIALOGFLOW_CONFIG = {
    projectId: 'your-project-id', // Replace with your actual project ID
    languageCode: 'zh-TW',
    sessionId: sessionId
};
```

### 7. Enable Real API Integration
Uncomment and configure the real Dialogflow API call in the code:

```javascript
// Replace the simulated response with real API call
async function sendToDialogflow(message) {
    try {
        const response = await fetch(`https://dialogflow.googleapis.com/v2/projects/${DIALOGFLOW_CONFIG.projectId}/agent/sessions/${DIALOGFLOW_CONFIG.sessionId}:detectIntent`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${YOUR_ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                queryInput: {
                    text: {
                        text: message,
                        languageCode: DIALOGFLOW_CONFIG.languageCode
                    }
                }
            })
        });
        
        const data = await response.json();
        return data.queryResult.fulfillmentText;
    } catch (error) {
        console.error('Dialogflow API Error:', error);
        return '抱歉，我暫時無法回應。請稍後再試或聯繫我們的客服。';
    }
}
```

## Security Considerations

### 1. API Key Management
- **Never expose API keys in client-side code**
- Use environment variables or server-side proxy
- Implement proper authentication

### 2. Rate Limiting
- Dialogflow has usage limits
- Implement client-side rate limiting
- Consider caching responses

### 3. CORS Configuration
- Configure CORS headers properly
- Use HTTPS in production
- Validate requests server-side

## Testing the Integration

### 1. Test Intents
- Test each intent with various phrases
- Verify responses are appropriate
- Check fallback responses

### 2. Test User Experience
- Verify chat interface works smoothly
- Test on different devices
- Check loading states and error handling

### 3. Performance Testing
- Test response times
- Check memory usage
- Verify no memory leaks

## Advanced Features

### 1. Context Management
- Maintain conversation context
- Remember user preferences
- Handle multi-turn conversations

### 2. Rich Responses
- Add images and cards
- Include buttons and links
- Support multimedia content

### 3. Analytics Integration
- Track conversation metrics
- Monitor user satisfaction
- Analyze common questions

## Troubleshooting

### Common Issues
1. **CORS Errors**: Configure proper CORS headers
2. **Authentication**: Verify API credentials
3. **Rate Limits**: Implement proper throttling
4. **Response Format**: Check JSON structure

### Debug Mode
Enable debug logging:
```javascript
const DEBUG_MODE = true;
if (DEBUG_MODE) {
    console.log('Dialogflow Request:', request);
    console.log('Dialogflow Response:', response);
}
```

## Production Deployment

### 1. Environment Setup
- Use production Dialogflow project
- Configure proper authentication
- Set up monitoring and logging

### 2. Performance Optimization
- Implement response caching
- Optimize bundle size
- Use CDN for static assets

### 3. Monitoring
- Set up error tracking
- Monitor API usage
- Track user engagement

## Support and Resources

- [Dialogflow Documentation](https://cloud.google.com/dialogflow/docs)
- [Dialogflow Console](https://dialogflow.cloud.google.com/)
- [Google Cloud Console](https://console.cloud.google.com/)
- [Dialogflow Community](https://cloud.google.com/dialogflow/community)

## Current Status
✅ **UI Implementation**: Complete
✅ **Simulated Responses**: Working
⏳ **Dialogflow Integration**: Ready for configuration
⏳ **Production Deployment**: Pending API setup

The chatbot is fully functional with simulated responses. Follow the setup steps above to connect to actual Dialogflow for production use.
