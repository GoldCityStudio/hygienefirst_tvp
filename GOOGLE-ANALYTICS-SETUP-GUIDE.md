# Google Analytics Setup Guide for Hygiene First

## Overview
This guide explains how to set up Google Analytics 4 (GA4) for the Hygiene First website, including enhanced ecommerce tracking, custom events, and conversion tracking for the booking system.

## Prerequisites
- Google Analytics account
- Google Tag Manager account (optional but recommended)
- Access to website files
- Basic understanding of web analytics

## Step 1: Create Google Analytics 4 Property

### 1.1 Create New Property
1. Go to [Google Analytics](https://analytics.google.com/)
2. Click "Admin" (gear icon)
3. Select your account
4. Click "Create Property"
5. Enter property details:
   - **Property name**: "Hygiene First Website"
   - **Reporting time zone**: "Hong Kong"
   - **Currency**: "Hong Kong Dollar (HKD)"

### 1.2 Configure Data Stream
1. Click "Data Streams" → "Add stream" → "Web"
2. Enter website details:
   - **Website URL**: "https://www.hygienefirstgroup.com"
   - **Stream name**: "Hygiene First Website"
3. Click "Create stream"
4. Copy the **Measurement ID** (format: G-XXXXXXXXXX)

## Step 2: Configure Custom Dimensions

### 2.1 Set Up Custom Dimensions
In Google Analytics Admin → Data display → Custom definitions → Custom dimensions:

1. **User Type** (dimension1)
   - Name: "User Type"
   - Scope: "User"
   - Description: "Type of user (new, returning, member)"

2. **Service Category** (dimension2)
   - Name: "Service Category"
   - Scope: "Event"
   - Description: "Category of healthcare service"

3. **Booking Step** (dimension3)
   - Name: "Booking Step"
   - Scope: "Event"
   - Description: "Current step in booking process"

4. **User Location** (dimension4)
   - Name: "User Location"
   - Scope: "User"
   - Description: "Geographic location of user"

5. **Device Type** (dimension5)
   - Name: "Device Type"
   - Scope: "Event"
   - Description: "Type of device used"

### 2.2 Set Up Custom Metrics
In Google Analytics Admin → Data display → Custom definitions → Custom metrics:

1. **Booking Completion Time** (metric1)
   - Name: "Booking Completion Time"
   - Scope: "Event"
   - Description: "Time taken to complete booking"

2. **Service Price** (metric2)
   - Name: "Service Price"
   - Scope: "Event"
   - Description: "Price of selected service"

3. **Page Engagement Time** (metric3)
   - Name: "Page Engagement Time"
   - Scope: "Event"
   - Description: "Time spent on page"

## Step 3: Configure Enhanced Ecommerce

### 3.1 Enable Enhanced Ecommerce
1. Go to Admin → Data display → Events
2. Click "Create event"
3. Set up conversion events:
   - **purchase**: Booking completion
   - **select_item**: Service selection
   - **begin_checkout**: Booking start

### 3.2 Set Up Conversion Tracking
1. Go to Admin → Data display → Conversions
2. Mark these events as conversions:
   - `purchase` (Booking completion)
   - `service_inquiry` (Service inquiry)
   - `chatbot_interaction` (Chatbot engagement)

## Step 4: Update Website Configuration

### 4.1 Update Tracking ID
1. Open `google-analytics-config.js`
2. Replace `G-XXXXXXXXXX` with your actual Measurement ID
3. Save the file

### 4.2 Update Meta Tag Generator
1. Open `meta-tag-generator.js`
2. Replace `G-XXXXXXXXXX` with your actual Measurement ID
3. Save the file

### 4.3 Regenerate Meta Tags
```bash
npm run meta:all
```

## Step 5: Test Implementation

### 5.1 Real-Time Testing
1. Open your website
2. Go to Google Analytics → Reports → Realtime
3. Perform test actions:
   - Visit different pages
   - Select a service
   - Complete booking process
   - Use chatbot

### 5.2 Debug Mode
1. Install Google Analytics Debugger Chrome extension
2. Enable debug mode
3. Check browser console for GA events
4. Verify events are firing correctly

### 5.3 Validation Tools
- [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna)
- [GA4 Event Builder](https://ga-dev-tools.google/ga4/event-builder/)
- [Google Tag Assistant](https://tagassistant.google.com/)

## Step 6: Set Up Goals and Funnels

### 6.1 Conversion Goals
1. **Primary Goal**: Booking completion
   - Event: `purchase`
   - Value: Service price
   - Currency: HKD

2. **Secondary Goals**:
   - Service selection
   - Chatbot engagement
   - Contact form submission

### 6.2 Funnel Analysis
1. **Booking Funnel**:
   - Step 1: Service selection
   - Step 2: Date/time selection
   - Step 3: Customer information
   - Step 4: Booking confirmation

2. **User Journey**:
   - Homepage → Services → Booking → Completion

## Step 7: Advanced Configuration

### 7.1 Custom Events
The following custom events are automatically tracked:

```javascript
// Service selection
trackServiceSelection(serviceId, serviceName, servicePrice);

// Booking steps
trackBookingStep(step, stepName, additionalData);

// Booking completion
trackBookingCompletion(bookingData);

// Chatbot interactions
trackChatbotInteraction(action, message);

// Service inquiries
trackServiceInquiry(serviceType, inquiryMethod);

// User engagement
trackUserEngagement(action, element);

// Error tracking
trackError(errorType, errorMessage, errorLocation);
```

### 7.2 Enhanced Ecommerce Events
```javascript
// Purchase event
gtag('event', 'purchase', {
    transaction_id: 'BK123456',
    value: 500,
    currency: 'HKD',
    items: [{
        item_id: 'health-assessment',
        item_name: '上門健康評估',
        item_category: 'health_assessment',
        price: 500,
        quantity: 1
    }]
});
```

## Step 8: Reporting and Analysis

### 8.1 Key Metrics to Monitor
1. **Conversion Rate**: Bookings completed / Total visitors
2. **Booking Funnel**: Drop-off rates at each step
3. **Service Popularity**: Most selected services
4. **User Behavior**: Time on site, page views
5. **Device Usage**: Mobile vs desktop performance
6. **Geographic Data**: User locations

### 8.2 Custom Reports
1. **Booking Performance Report**
   - Service selection rates
   - Booking completion rates
   - Average booking value
   - Booking abandonment points

2. **User Journey Report**
   - Entry points
   - Navigation paths
   - Exit points
   - Return visitor behavior

3. **Service Analytics Report**
   - Service popularity
   - Price sensitivity
   - Seasonal trends
   - User preferences

### 8.3 Automated Reports
Set up automated reports for:
- Daily booking summary
- Weekly performance review
- Monthly trends analysis
- Quarterly business insights

## Step 9: Privacy and Compliance

### 9.1 GDPR Compliance
1. Add cookie consent banner
2. Implement data retention policies
3. Provide opt-out mechanisms
4. Update privacy policy

### 9.2 Data Retention
- Configure data retention settings
- Set up data deletion requests
- Implement anonymization
- Regular compliance audits

## Step 10: Maintenance and Optimization

### 10.1 Regular Monitoring
- Check tracking accuracy weekly
- Monitor conversion rates
- Review user feedback
- Update configurations as needed

### 10.2 Performance Optimization
- Optimize page load times
- Improve user experience
- A/B test different approaches
- Continuously improve conversion rates

### 10.3 Troubleshooting
Common issues and solutions:

1. **Events not firing**
   - Check tracking ID
   - Verify script loading
   - Check browser console for errors

2. **Incorrect data**
   - Validate custom dimensions
   - Check event parameters
   - Review data processing delays

3. **Missing conversions**
   - Verify conversion setup
   - Check event names
   - Ensure proper event parameters

## Support and Resources

### Documentation
- [Google Analytics 4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [Enhanced Ecommerce Guide](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce)
- [Custom Dimensions Guide](https://support.google.com/analytics/answer/10075209)

### Tools
- [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna)
- [GA4 Event Builder](https://ga-dev-tools.google/ga4/event-builder/)
- [Google Tag Assistant](https://tagassistant.google.com/)

### Community
- [Google Analytics Community](https://support.google.com/analytics/community)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/google-analytics-4)
- [Reddit r/analytics](https://www.reddit.com/r/analytics/)

---

**Last Updated**: January 27, 2025  
**Version**: 1.0.0  
**Tracking ID**: G-NFT58KR02S (Configured)
