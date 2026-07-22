# Authentication Debugging Guide

## Problem
User successfully logs in, but gets redirected to login page when accessing protected pages (Subzones, Brands, etc.)

## Steps to Debug

### 1. Open Browser Developer Tools (F12)
- Go to **Console** tab
- Clear console with `console.clear()`
- Look for authentication logs starting with emojis (✅, ❌, 🔐, 📋, etc.)

### 2. Login and Monitor Console Logs

You should see this sequence:

**LOGIN PHASE:**
```
🔐 Attempting login with email: user@example.com
🔐 Making API request to /auth/login
✅ Login response received (token exists)
✅ Token stored in localStorage
```

**REDIRECT PHASE (after login, when clicking to Subzones):**
```
Checking authentication: hasToken: true, isAuth: true
📋 Subzones Loading - Auth Check: hasToken: true, tokenLength: [number]
📡 Making API call to /subzones
API Request: url: /subzones, method: GET, hasToken: true
Authorization header set: Bearer [token]...
```

### 3. Check Backend Console

**Look for these logs when page loads:**

```
🔍 AuthTokenFilter - Processing request to: /subzones
📍 JWT extracted: ✅ found (length: [number])
✅ JWT validation passed
✅ Username extracted: user@example.com
✅ UserDetails loaded
✅ Authentication added to SecurityContext
```

### 4. Common Issues to Check

#### Issue 1: Token Not in localStorage
- **Sign**: Console shows `hasToken: false` during API call
- **Cause**: Login response didn't include token or token wasn't stored
- **Fix**: Check login response in Network tab (XHR) - should have `token` field

#### Issue 2: Token Not Being Sent
- **Sign**: Console shows `hasToken: false` in request interceptor
- **Cause**: Token exists in storage but interceptor can't find it
- **Fix**: Check if localStorage is being cleared, or if API interceptor is broken

#### Issue 3: Invalid Token on Backend
- **Sign**: Console shows token being sent, but backend logs show JWT validation failed
- **Cause**: Token generation or validation issue on backend
- **Fix**: Check jwtSecret in application.properties matches generation/validation

#### Issue 4: 401 Redirect Loop
- **Sign**: Token sent successfully, but 401 response received
- **Cause**: Backend security doesn't recognize the token
- **Fix**: Check SecurityConfig endpoints and JWT validation

### 5. Network Tab Debugging

1. Go to **Network** tab in DevTools
2. Filter by XHR requests
3. Click on `/auth/login` request:
   - **Response**: Should show `token` and `userDto` fields
   - **Status**: Should be 200
4. Click on `/subzones` request:
   - **Request Headers**: Should have `Authorization: Bearer [token]`
   - **Response Status**: Should be 200, not 401

### 6. Application Tab - localStorage

1. Go to **Application** tab
2. Click on **Local Storage**
3. Select your localhost origin
4. Check for:
   - `token`: Should have a long JWT string
   - `user`: Should have user object

### 7. Backend Logs (Console Output)

When running backend, you'll see:

**During Login:**
```
🔐 Login attempt for email: user@example.com
✅ Authentication successful
✅ JWT token generated, length: [number]
✅ Login response prepared
```

**During Subzones API Call:**
```
🔍 AuthTokenFilter - Processing request to: /subzones
📍 JWT extracted: ✅ found
✅ JWT validation passed
✅ Username extracted: user@example.com
```

### 8. If Still Failing - Additional Checks

1. **Check token expiration**:
   - In application.properties: `spring.app.jwtExpirationMs=172800000` (2 days)
   - Is token older than this?

2. **Check JWT Secret**:
   - Must be BASE64 encoded
   - Must match between generation and validation
   - Check: `spring.app.jwtSecret=...`

3. **Check CORS**:
   - Frontend URL must be in allowed origins: `http://localhost:5173`
   - Backend has `@CrossOrigin` annotation

4. **Clear Cache**:
   - Hard refresh browser: `Ctrl+Shift+R`
   - Clear localStorage: DevTools > Application > Clear Site Data

### 9. Test Scenario

1. **Clear everything**: 
   - Stop backend
   - Clear browser storage
   - Stop frontend

2. **Restart backend** (port 8080)

3. **Restart frontend** (port 5173)

4. **Clear localStorage**: F12 > Application > Clear All

5. **Login**: 
   - Monitor console logs
   - Note all ✅ and ❌ marks

6. **Go to Subzones**:
   - Monitor console logs
   - Should see "✅ Subzones loaded and state updated"

## Key Console Indicators

| Indicator | Meaning |
|-----------|---------|
| ✅ | Success - expected flow |
| ❌ | Failure - check error details |
| 🔐 | Authentication-related |
| 📋 | Data loading |
| 📡 | API request |
| 🔍 | Backend processing |
| ⚠️ | Warning - not critical |
| 🚨 | Critical error - immediate issue |

## If Problem Persists

1. Open both console windows (Frontend + Backend)
2. Clear both consoles
3. Perform login in sequence:
   - Watch frontend login logs
   - Verify backend received credentials
   - Check token generation logs
4. Navigate to Subzones:
   - Watch full request/response flow
   - Take screenshot of all console logs
5. Share the logs for diagnosis
