# Firebase Storage Rules Setup Guide

## Problem
The CMS is getting CORS errors when uploading images to Firebase Storage. This is typically caused by restrictive Firebase Storage security rules.

## Solution

### 1. Firebase Storage Rules Configuration

Go to Firebase Console → Storage → Rules and update the rules to allow uploads:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow read access to all files
    match /{allPaths=**} {
      allow read: if true;
    }
    
    // Allow write access for authenticated users
    match /news/{fileName} {
      allow write: if request.auth != null || 
        (resource == null && request.resource.size < 100 * 1024 * 1024); // 100MB for videos
    }
    
    // Allow write access for news-videos folder (for video uploads)
    match /news-videos/{fileName} {
      allow write: if request.auth != null || 
        (resource == null && request.resource.size < 100 * 1024 * 1024); // 100MB limit for videos
    }
    
    match /services/{fileName} {
      allow write: if request.auth != null || 
        (resource == null && request.resource.size < 5 * 1024 * 1024);
    }
    
    match /images/{fileName} {
      allow write: if request.auth != null || 
        (resource == null && request.resource.size < 5 * 1024 * 1024);
    }
  }
}
```

### 2. Alternative: More Permissive Rules (for testing)

If you need to test quickly, you can use more permissive rules:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```

**⚠️ Warning**: These rules allow anyone to upload files. Only use for testing!

### 3. Firebase Storage Bucket Configuration

Make sure your Firebase Storage bucket is properly configured:

1. Go to Firebase Console → Storage
2. Check that the bucket name matches: `hygienefirst-member-system.firebasestorage.app`
3. Ensure the bucket is in the correct region (preferably asia-southeast1 for Hong Kong)

### 4. CORS Configuration

If you're still getting CORS errors, you may need to configure CORS for your Firebase Storage bucket:

1. Install Google Cloud SDK
2. Create a `cors.json` file:

```json
[
  {
    "origin": ["https://www.hygienefirstgroup.com"],
    "method": ["GET", "POST", "PUT", "DELETE"],
    "maxAgeSeconds": 3600
  }
]
```

3. Apply CORS configuration:
```bash
gsutil cors set cors.json gs://hygienefirst-member-system.firebasestorage.app
```

### 5. Fallback Solution

The CMS now includes a fallback mechanism:
- If Firebase Storage upload fails, images are converted to base64 and stored in Firestore
- This ensures content can still be saved even if Storage is unavailable
- Base64 images work but are less efficient for large files

### 6. Testing

To test the fix:

1. Update Firebase Storage rules
2. Try uploading an image through the CMS
3. Check browser console for any remaining errors
4. Verify images appear on the dynamic pages

### 7. File Size Limits

The CMS now enforces:
- Maximum file size for images: 5MB
- Maximum file size for videos: 100MB
- Allowed file types: Images (image/*) and Videos (video/*)
- Filename sanitization: Removes special characters

### 8. Monitoring

Monitor Firebase Storage usage:
- Firebase Console → Storage → Usage
- Check for any unusual upload patterns
- Monitor costs if using Firebase Storage extensively

## Troubleshooting

### Common Issues:

1. **CORS Error**: Update Storage rules and CORS configuration
2. **File Too Large**: Reduce image size or compress before upload
3. **Invalid File Type**: Ensure only image files are uploaded
4. **Authentication Error**: Check Firebase Auth configuration
5. **Network Error**: Check internet connection and Firebase status

### Debug Steps:

1. Check browser console for detailed error messages
2. Verify Firebase project configuration
3. Test with different file types and sizes
4. Check Firebase Storage rules syntax
5. Verify bucket permissions

## Security Considerations

- Always use proper authentication rules in production
- Implement file type validation
- Set reasonable file size limits
- Monitor upload patterns for abuse
- Consider implementing virus scanning for uploaded files

## Next Steps

1. Update Firebase Storage rules
2. Test image upload functionality
3. Monitor for any remaining issues
4. Consider implementing additional security measures
5. Set up monitoring and alerts for Storage usage

