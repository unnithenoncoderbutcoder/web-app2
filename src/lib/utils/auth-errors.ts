export const AUTH_ERROR_MESSAGES = {
  invalid_credentials: 'Invalid email or password',
  user_not_found: 'No user found with this email',
  email_taken: 'An account with this email already exists',
  username_taken: 'This username is already taken',
  weak_password: 'Password should be at least 6 characters',
  invalid_email: 'Please enter a valid email address',
  duplicate_key: 'Email already registered',
  unexpected_failure: 'An unexpected error occurred. Please try again',
} as const;

export function getAuthErrorMessage(error: any): string {
  if (!error) return AUTH_ERROR_MESSAGES.unexpected_failure;
  
  // Handle specific error messages
  if (error.message?.includes('duplicate key')) {
    return AUTH_ERROR_MESSAGES.email_taken;
  }
  
  if (error.message?.includes('Username already taken')) {
    return AUTH_ERROR_MESSAGES.username_taken;
  }
  
  const code = error.code as keyof typeof AUTH_ERROR_MESSAGES;
  return AUTH_ERROR_MESSAGES[code] || error.message || AUTH_ERROR_MESSAGES.unexpected_failure;
}