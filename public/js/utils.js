export function validateForm(formData) {
  // Basic validation for required fields
  const errors = {};
  for (const field of Object.keys(formData)) {
    if (!formData[field]) {
      errors[field] = 'Este campo es requerido';
    }
  }
  return errors;
}

// Helper to handle JWT from cookies
export function getJWTFromCookie() {
  const jwtCookie = document.cookie.split('; ').find(c => c.startsWith('jwt='));
  return jwtCookie ? jwtCookie.split('=')[1] : null;
}

// Simple alert handler
export function showAlert(message, type = 'error') {
  const alert = document.createElement('div');
  alert.className = `alert alert-${type}`;
  alert.textContent = message;
  document.body.appendChild(alert);
  setTimeout(() => alert.remove(), 5000);
}