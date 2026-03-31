
# 🎯 Quick Reference Guide - Form & Utilities

## 📋 Form Components Usage

### Basic Form Structure
```typescript
import { MyFormWrapper, MyFormInput } from "@/components/Common/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Invalid email"),
});

export function MyForm() {
  const onSubmit = (data) => console.log(data);

  return (
    <MyFormWrapper 
      onSubmit={onSubmit}
      resolver={zodResolver(schema)}
      defaultValues={{ name: "", email: "" }}
    >
      <MyFormInput name="name" label="Name" required />
      <MyFormInput name="email" type="email" label="Email" required />
      <button type="submit">Submit</button>
    </MyFormWrapper>
  );
}
```

---

## 🔧 Form Components Cheat Sheet

| Component | Type | Key Props |
|-----------|------|-----------|
| **Input** | Text, Email, Password | `type`, `placeholder`, `required` |
| **Select** | Dropdown | `options`, `setSelectedState` |
| **TextArea** | Multi-line text | `rows`, `maxLength`, `hint` |
| **Checkbox** | Boolean | `consentText`, `required` |
| **ImageUpload** | File | `multiple`, `maxFileSize` |

---

## 🚨 Alert & Notifications

```typescript
// Direct notifications (non-blocking)
import { toastSuccess, toastError, notify } from "@/utils/alertService";

toastSuccess("Done!");
notify.error("Something went wrong");

// Modal dialogs (blocking)
import { alertSuccess, confirmDelete } from "@/utils/alertService";

await alertSuccess("Success!", "Your changes were saved");

const result = await confirmDelete("user ABC");
if (result.isConfirmed) {
  // User confirmed deletion
}
```

---

## ✅ Validation Quick Start

```typescript
import { validators, loginSchema, registerSchema } from "@/utils/validators";

// Quick validation
validators.isValidEmail("test@example.com") // true
validators.isStrongPassword("Pass@123") // { isStrong: true, feedback: [] }

// Using in forms with Zod
import { zodResolver } from "@hookform/resolvers/zod";

<MyFormWrapper resolver={zodResolver(loginSchema)}>
  {/* Form fields */}
</MyFormWrapper>

// Custom validation function
import { PATTERNS } from "@/utils/validators";

if (!PATTERNS.EMAIL.test(email)) {
  notify.error("Invalid email format");
}
```

---

## 🔐 Token Management

```typescript
import {
  verifyToken,
  isTokenExpired,
  formatTokenExpiration,
  saveTokenToCookie,
  getTokenFromCookie,
  validateToken,
} from "@/utils/verifyToken";

// Check if authenticated
const token = getTokenFromCookie();
if (!isTokenExpired(token)) {
  console.log(formatTokenExpiration(token)); // "expires in 2 hours"
}

// Full validation with error handling
const { isValid, error } = validateToken(token);
if (!isValid) {
  console.error(error);
  // Redirect to login
}

// Get user info from token
const decoded = verifyToken(token);
console.log(decoded.email, decoded.role);
```

---

## 🎣 Form Hooks

```typescript
// Submission state
import { useFormSubmit } from "@/hooks/useFormHooks";

const { isSubmitting, startSubmit, endSubmit } = useFormSubmit();

// Error handling
import { useFormError } from "@/hooks/useFormHooks";

const { handleApiError } = useFormError(setError);
try {
  await apiCall();
} catch (error) {
  handleApiError(error, "Failed");
}

// Form persistence
import { useFormPersist } from "@/hooks/useFormHooks";

const { saveFormState, getFormState } = useFormPersist("myForm");
// Auto-save form data to localStorage

// File upload
import { useFileUpload } from "@/hooks/useFormHooks";

const { validateFile, getFilePreview, errors } = useFileUpload(5); // 5MB max
if (validateFile(file)) {
  const preview = getFilePreview(file);
}
```

---

## 📡 Redux Setup

### Using Selectors
```typescript
import {
  selectCurrentUser,
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
} from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";

export function MyComponent() {
  const user = useAppSelector(selectCurrentUser);
  const isLoading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <div>Welcome {user?.email}</div>;
}
```

### Dispatching Actions
```typescript
import { setUser, logout, setError } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";

const dispatch = useAppDispatch();

// When login succeeds
dispatch(setUser({ user: userData, token: tokenData }));

// On logout
dispatch(logout());

// On error
dispatch(setError("Authentication failed"));
```

---

## 📝 Common Form Patterns

### Pattern 1: Login Form
```typescript
<MyFormWrapper 
  onSubmit={handleLogin}
  resolver={zodResolver(loginSchema)}
>
  <MyFormInput type="email" name="email" label="Email" required />
  <MyFormInput type="password" name="password" label="Password" required />
  <button type="submit">Sign In</button>
</MyFormWrapper>
```

### Pattern 2: Profile Form with Image
```typescript
<MyFormWrapper onSubmit={handleSubmit}>
  <MyFormInput name="firstName" label="First Name" required />
  <MyFormInput name="lastName" label="Last Name" required />
  <MyFormImageUpload name="avatar" label="Profile Picture" />
  <MyFormTextArea name="bio" label="About" rows={3} maxLength={500} />
  <button type="submit">Save</button>
</MyFormWrapper>
```

### Pattern 3: Settings Form
```typescript
<MyFormWrapper onSubmit={handleSubmit}>
  <MyFormCheckbox name="emailNotifications" consentText="Email Notifications" />
  <MyFormCheckbox name="smsNotifications" consentText="SMS Notifications" />
  <MyFormSelect 
    name="theme" 
    label="Theme" 
    options={[
      { label: "Light", value: "light", keyOption: "light" },
      { label: "Dark", value: "dark", keyOption: "dark" },
    ]}
  />
  <button type="submit">Save Settings</button>
</MyFormWrapper>
```

---

## 🛡️ Error Handling Pattern

```typescript
const handleSubmit = async (data) => {
  startSubmit();
  try {
    const result = await createUser(data).unwrap();
    toastSuccess("User created!");
    navigate("/users");
  } catch (error) {
    handleApiError(error, "Failed to create user");
  } finally {
    endSubmit();
  }
};
```

---

## 🔄 Redux Query Integration

```typescript
import { useCreateUserMutation } from "@/redux/features/auth/authApi";

export function RegisterForm() {
  const [createUser, { isLoading }] = useCreateUserMutation();

  const handleSubmit = async (data) => {
    try {
      const result = await createUser(data).unwrap();
      toastSuccess("Account created!");
    } catch (error) {
      notify.error(error.data.message);
    }
  };

  return (
    <MyFormWrapper onSubmit={handleSubmit}>
      {/* Form fields */}
      <button disabled={isLoading} type="submit">
        {isLoading ? "Creating..." : "Create Account"}
      </button>
    </MyFormWrapper>
  );
}
```

---

## 🎨 Styling Form Components

```typescript
// Custom styling
<MyFormInput
  name="email"
  label="Email"
  labelClassName="font-bold text-lg"
  inputClassName="bg-blue-50 border-blue-300"
  className="mb-6"
/>

// Custom select icons
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";

<MyFormSelect
  name="category"
  upIcon={<MdArrowDropUp />}
  downIcon={<MdArrowDropDown />}
/>
```

---

## 🧪 Testing Form Helpers

```typescript
import { validators } from "@/utils/validators";

// Test email validation
expect(validators.isValidEmail("test@example.com")).toBe(true);
expect(validators.isValidEmail("invalid")).toBe(false);

// Test password strength
const result = validators.isStrongPassword("weak");
expect(result.isStrong).toBe(false);
expect(result.feedback.length).toBeGreaterThan(0);
```

---

## 📖 Documentation Links

- **Forms:** See form component files for JSDoc comments
- **Validators:** `src/utils/validators.ts` - All functions documented
- **Alerts:** `src/utils/alertService.ts` - Complete alert API
- **Token Utils:** `src/utils/verifyToken.ts` - Token management
- **Form Hooks:** `src/hooks/useFormHooks.ts` - Reusable hooks
- **Redux:** `src/redux/features/auth/authSlice.ts` - State management

---

## 🐛 Debugging Tips

1. **Form submission not working?**
   - Check if `MyFormWrapper` is parent
   - Verify resolver/schema
   - Look at console for validation errors

2. **Styling issues?**
   - Use className props for overrides
   - Check Tailwind classes
   - Inspect with browser DevTools

3. **Redux state not updating?**
   - Check if dispatch is called
   - Verify action payload
   - Use Redux DevTools

4. **Token expired?**
   - Check `formatTokenExpiration(token)`
   - Implement refresh logic
   - Clear cookies if needed

---

## 🚀 Performance Tips

- Use `useFormPersist` for auto-save
- Debounce search inputs with `useDebouncedFormWatch`
- Lazy load image previews
- Memoize form callbacks
- Use RTK Query caching

---

**Last Updated:** March 31, 2026
**Version:** 1.0
