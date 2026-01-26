/**
 * Generates a random password with length between 6 and 12 characters
 * Includes uppercase, lowercase, numbers, and special characters
 * @returns A randomly generated password string
 */
export function generatePassword(): string {
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const numberChars = '0123456789';
  const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  const allChars = uppercaseChars + lowercaseChars + numberChars + specialChars;
  
  // Random length between 6 and 12
  const passwordLength = Math.floor(Math.random() * 7) + 6; // 6 to 12
  
  let password = '';
  
  // Ensure password has at least one character from each category
  password += uppercaseChars.charAt(Math.floor(Math.random() * uppercaseChars.length));
  password += lowercaseChars.charAt(Math.floor(Math.random() * lowercaseChars.length));
  password += numberChars.charAt(Math.floor(Math.random() * numberChars.length));
  password += specialChars.charAt(Math.floor(Math.random() * specialChars.length));
  
  // Fill remaining length with random characters
  for (let i = password.length; i < passwordLength; i++) {
    password += allChars.charAt(Math.floor(Math.random() * allChars.length));
  }
  
  // Shuffle the password to avoid predictable patterns
  password = password.split('').sort(() => Math.random() - 0.5).join('');
  
  return password;
}
