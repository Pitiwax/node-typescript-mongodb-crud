document.addEventListener('DOMContentLoaded', () => {
  const formLogin = document.getElementById('form-login');
  const formRegister = document.getElementById('form-register');
  const alertSuccess = document.getElementById('alert-success');
  const alertError = document.getElementById('alert-error');

  // Función auxiliar para cambiar de pantalla visualmente sin recargar
  const irAlDashboard = (token) => {
    // 1. Guardamos el token en la memoria del navegador para quedar logueados
    localStorage.setItem('token', token);

    // 2. Ocultamos las secciones de Login y Registro (añadiendo la clase 'hidden' de Tailwind)
    document.getElementById('login-section').classList.add('hidden');
    document.getElementById('register-section').classList.add('hidden');

    // 3. Mostramos el Panel de Administración (quitando la clase 'hidden')
    document.getElementById('dashboard-section').classList.remove('hidden');

    // 4. Intentamos ejecutar la carga de usuarios si admin.js ya la tiene lista
    if (typeof cargarUsuarios === 'function') {
      cargarUsuarios();
    } else if (window.cargarUsuarios) {
      window.cargarUsuarios();
    }
  };

  // Formulario de Login
  formLogin.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (response.ok) {
        alertSuccess.classList.remove('hidden');
        setTimeout(() => alertSuccess.classList.add('hidden'), 3000);
        
        // 🚀 CAMBIO: En vez de redirigir a una página 404, cambiamos la vista en vivo
        irAlDashboard(data.token);
      } else {
        alertError.textContent = data.message || 'Error al iniciar sesión';
        alertError.classList.remove('hidden');
        setTimeout(() => alertError.classList.add('hidden'), 5000);
      }
    } catch (error) {
      console.error('Error en login:', error);
      alertError.textContent = 'Error en la solicitud';
      alertError.classList.remove('hidden');
      setTimeout(() => alertError.classList.add('hidden'), 5000);
    }
  });

  // Formulario de Registro
  formRegister.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = e.target.elements.nombre.value;
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, password })
      });

      const data = await response.json();
      if (response.ok) {
        alertSuccess.classList.remove('hidden');
        setTimeout(() => alertSuccess.classList.add('hidden'), 3000);
        
        // 🚀 CAMBIO: Al registrarse con éxito, también pasamos directo al panel
        irAlDashboard(data.token);
      } else {
        alertError.textContent = data.message || 'Error al registrar';
        alertError.classList.remove('hidden');
        setTimeout(() => alertError.classList.add('hidden'), 5000);
      }
    } catch (error) {
      console.error('Error en registro:', error);
      alertError.textContent = 'Error en la solicitud';
      alertError.classList.remove('hidden');
      setTimeout(() => alertError.classList.add('hidden'), 5000);
    }
  });
});
