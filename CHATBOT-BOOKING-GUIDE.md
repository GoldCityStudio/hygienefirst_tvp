# Chatbot Booking Procedure Guide

## Overview
The Hygiene First chatbot provides a step-by-step booking flow that mirrors the main booking form. Users can complete their entire booking through the chat interface.

## Step-by-Step Booking Flow

### Step 0: Initial Greeting
**Trigger:** User opens chatbot or says "hi", "hello", "你好"

**Bot Response:**
```
您好！歡迎使用 Hygiene First 預約助手！🤖

我可以幫助您：
• 了解服務項目和價格
• 解答預約相關問題
• 提供服務詳情
• 協助完成預約
• 查看預約狀態
• 安排提醒

請告訴我您需要什麼幫助！
```

**Quick Replies:** `['立即預約', '服務價格', '預約狀態', '聯繫客服']`

**Next Step:** User clicks "立即預約" → Step 1

---

### Step 1: Service Selection
**Trigger:** User says "立即預約", "開始預約", or clicks "立即預約"

**Bot Response:**
```
歡迎使用 Hygiene First 預約服務！🤖

讓我們開始預約流程，請選擇您需要的服務：
```

**Available Services:**
- 🏠 健康評估 - HK$500起 (1-2小時)
- 👴 長者照顧 - HK$300起 (2-4小時)
- 🩹 傷口護理 - HK$400起 (30分鐘-1小時)
- 🧹 家居清潔 - HK$800起 (2-3小時)
- 🚑 陪診護送 - HK$350起 (2-4小時)
- 💊 鼻胃喉管 - HK$450起 (30分鐘-1小時)
- 💪 復康護理 - HK$500起 (1-2小時)
- 🧽 納米消毒 - HK$1200起 (2-3小時)

**Quick Replies:** `['健康評估', '長者照顧', '傷口護理', '家居清潔']`

**User Input Examples:**
- "健康評估"
- "長者照顧"
- "傷口護理"
- "家居清潔"

**Bot Confirmation:**
```
✅ 已選擇服務：健康評估

💰 價格：HK$ 500起
⏰ 時長：1-2小時

請選擇預約日期：
```

**Next Step:** User selects date → Step 2

---

### Step 2: Date Selection
**Trigger:** User selects a service

**Bot Response:**
```
請選擇預約日期：

📅 可選日期：
```

**Quick Replies:** `['明天', '後天', '三天後', '一週後']`

**User Input Examples:**
- "明天"
- "後天"
- "三天後"
- "一週後"

**Bot Confirmation:**
```
✅ 已選擇日期：星期一 (2025-01-20)

請選擇服務時段：
```

**Next Step:** User selects time → Step 3

---

### Step 3: Time Selection
**Trigger:** User selects a date

**Bot Response:**
```
請選擇服務時段：

⏰ 可選時段：
```

**Available Time Slots:**
- 09:00-11:00
- 11:00-13:00
- 14:00-16:00
- 16:00-18:00
- 18:00-20:00

**Quick Replies:** `['09:00-11:00', '11:00-13:00', '14:00-16:00', '16:00-18:00', '18:00-20:00']`

**User Input Examples:**
- "09:00-11:00"
- "11:00-13:00"
- "14:00-16:00"

**Bot Confirmation:**
```
✅ 已選擇時段：09:00-11:00

📋 預約摘要：
• 服務：健康評估
• 日期：星期一 (2025-01-20)
• 時間：09:00-11:00
• 價格：HK$ 500起

請提供您的聯絡資料：
```

**Next Step:** User provides customer info → Step 4

---

### Step 4: Customer Information
**Trigger:** User selects time slot

**Bot Response:**
```
請提供您的聯絡資料：

📝 請輸入：
• 姓名
• 電話號碼
• 服務地址

（請在聊天中直接輸入，例如：
姓名：陳大文
電話：9123 4567
地址：香港九龍旺角彌敦道123號）
```

**Quick Replies:** `['填寫資料', '使用上次資料', '返回修改']`

**User Input Options:**

#### Option 1: Use Previous Data
**User:** "使用上次資料"
**Bot:** 
```
✅ 已使用上次資料

📋 預約確認：
• 服務：健康評估
• 日期：星期一 (2025-01-20)
• 時間：09:00-11:00
• 姓名：陳大文
• 電話：9123 4567
• 地址：香港九龍旺角彌敦道123號

確認預約嗎？
```

#### Option 2: Fill New Data
**User:** "填寫資料"
**Bot:** Shows instructions for structured input

**User Input Format:**
```
姓名：陳大文
電話：9123 4567
地址：香港九龍旺角彌敦道123號
```

**Bot Confirmation:**
```
✅ 資料已收集完成

📋 預約確認：
• 服務：健康評估
• 日期：星期一 (2025-01-20)
• 時間：09:00-11:00
• 姓名：陳大文
• 電話：9123 4567
• 地址：香港九龍旺角彌敦道123號

確認預約嗎？
```

**Next Step:** User confirms → Step 5

---

### Step 5: Confirmation
**Trigger:** User provides customer information

**Bot Response:**
```
請確認您的預約：
```

**Quick Replies:** `['確認預約', '返回修改', '取消預約']`

**User Input Options:**

#### Option 1: Confirm Booking
**User:** "確認預約"

**Bot Response:**
```
🎉 預約成功！

📋 預約編號：BK1705123456789
• 服務：健康評估
• 日期：星期一 (2025-01-20)
• 時間：09:00-11:00
• 狀態：待確認

我們會盡快與您聯繫確認預約詳情。

感謝您選擇 Hygiene First！
```

**Quick Replies:** `['新預約', '查看預約', '聯繫客服']`

#### Option 2: Return to Modify
**User:** "返回修改"

**Bot Response:**
```
好的，讓我們重新開始預約流程。

請選擇您需要的服務：
```

**Quick Replies:** `['健康評估', '長者照顧', '傷口護理', '家居清潔']`

#### Option 3: Cancel Booking
**User:** "取消預約"

**Bot Response:**
```
預約已取消。

如果您需要其他協助，請告訴我！
```

**Quick Replies:** `['新預約', '服務價格', '聯繫客服']`

---

## Additional Features

### Service Information
**Trigger:** User asks about services, prices, or duration

**Bot Response:**
```
我們的服務價格如下：

🏠 健康評估：HK$500起
👴 長者照顧：HK$300起
🩹 傷口護理：HK$400起
🧹 家居清潔：HK$800起
🚑 陪診護送：HK$350起
💊 鼻胃喉管：HK$450起
💪 復康護理：HK$500起
🧽 納米消毒：HK$1200起

*實際價格會根據服務內容和時間長度調整
*我們提供多種優惠方案，歡迎詢問！
```

### Booking Status Check
**Trigger:** User says "預約狀態", "查看預約"

**Bot Response:**
```
📋 最近的預約記錄：

1. 預約編號：BK1705123456789
   服務：健康評估
   日期：2025-01-20 09:00-11:00
   狀態：待確認

2. 預約編號：BK1705123456790
   服務：長者照顧
   日期：2025-01-18 14:00-16:00
   狀態：已確認
```

### Contact Information
**Trigger:** User says "聯繫客服", "客服", "電話"

**Bot Response:**
```
聯繫我們：

📞 客服熱線：+852 9676 9157
📧 電郵：info@hygienefirst.hk
💬 WhatsApp：+852 9676 9157
🌐 網站：www.hygienefirst.hk

服務時間：週一至週日 9:00-18:00
我們隨時為您提供專業服務！
```

## Technical Implementation

### State Management
```javascript
let chatbotBookingData = {
    service: null,
    date: null,
    time: null,
    customer: {}
};
let chatbotStep = 0; // 0: greeting, 1: service, 2: date, 3: time, 4: customer info, 5: confirmation
```

### Data Storage
- **Bookings:** `localStorage.getItem('hygiene_bookings')`
- **Customer Data:** `localStorage.getItem('last_customer_data')`
- **Activity Tracking:** Firebase integration

### Booking ID Format
- **Format:** `BK` + timestamp
- **Example:** `BK1705123456789`

### Error Handling
- Invalid service selection → Show service list
- Invalid date → Show date options
- Invalid time → Show time slots
- Missing customer info → Request required fields
- Invalid input → Provide examples

## User Experience Tips

### For Users
1. **Use Quick Replies:** Click buttons for faster input
2. **Structured Input:** Use format "姓名：", "電話：", "地址："
3. **Previous Data:** Use "使用上次資料" for repeat bookings
4. **Navigation:** Use "返回修改" to go back steps
5. **Help:** Ask "如何預約" for guidance

### For Developers
1. **State Reset:** Chatbot resets when opened
2. **Data Persistence:** Customer data saved for next booking
3. **Validation:** Required fields checked before confirmation
4. **Integration:** Matches form data structure
5. **Analytics:** All interactions tracked

## Testing Scenarios

### Complete Booking Flow
1. Open chatbot
2. Click "立即預約"
3. Select "健康評估"
4. Choose "明天"
5. Pick "09:00-11:00"
6. Use "使用上次資料" or fill new data
7. Click "確認預約"
8. Verify booking ID generated

### Error Handling
1. Try invalid service name
2. Try invalid date format
3. Try invalid time slot
4. Try incomplete customer info
5. Test "返回修改" functionality

### Edge Cases
1. No previous customer data
2. Invalid date selection
3. Service not available
4. Network connectivity issues
5. Browser compatibility

## Integration Points

### Form Integration
- Same services and prices
- Same time slots
- Same data structure
- Same localStorage keys

### Analytics Integration
- Google Analytics tracking
- Firebase activity logging
- User interaction metrics
- Conversion tracking

### Customer Support
- Booking status queries
- Contact information
- Service details
- Pricing information

This chatbot provides a complete booking experience that matches the main form while offering the convenience of chat-based interaction.
