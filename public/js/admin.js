// Hacemos la función global para que auth.js la pueda llamar al iniciar sesión
window.cargarUsuarios = async () => {
  const tbody = document.getElementById('users-tbody');
  if (!tbody) return;

  // Recuperamos el token de seguridad que guardamos al hacer login
  const token = localStorage.getItem('token');

  try {
    // Mandamos el token en las cabeceras (Headers) para que el backend nos dé permiso
    const response = await fetch('/api/users', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      console.error('El servidor rechazó la solicitud de usuarios');
      return;
    }

    const users = await response.json();
    tbody.innerHTML = ''; // Limpiamos solo el cuerpo, no los encabezados

    users.forEach(user => {
      const row = document.createElement('tr');
      // Le metemos estilos profesionales de Tailwind CSS a las celdas y botones
      row.innerHTML = `
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${user.nombre}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${user.email}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.rol === 'admin' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}">
            ${user.rol}
          </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
          <button class="text-indigo-600 hover:text-indigo-900 bg-indigo-50 px-3 py-1 rounded" onclick="editarUsuario('${user._id || user.id}')">Editar</button>
          <button class="text-red-600 hover:text-red-900 bg-red-50 px-3 py-1 rounded" onclick="eliminarUsuario('${user._id || user.id}')">Eliminar</button>
        </td>
      `;
      tbody.appendChild(row);
    });
  } catch (error) {
    console.error('Error al cargar usuarios:', error);
  }
};

// Función global para eliminar usuarios
window.eliminarUsuario = async (id) => {
  if (!confirm('¿Estás seguro de eliminar este usuario de la base de datos?')) return;
  
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`/api/users/${id}`, { 
      method: 'DELETE', 
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    const data = await response.json();
    if (response.ok) {
      alert('Usuario eliminado con éxito de MongoDB');
      window.cargarUsuarios(); // Recargamos la tabla en vivo
    } else {
      alert(data.message || 'Error al eliminar');
    }
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    alert('Error en la solicitud');
  }
};

// Función dummy para el botón editar
window.editarUsuario = async (id) => {
  const nuevoNombre = prompt('Introduce el nuevo nombre para este usuario:');
  if (!nuevoNombre) return;

  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`/api/users/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nombre: nuevoNombre })
    });

    const data = await response.json();
    if (response.ok) {
      alert('¡Usuario actualizado con éxito en MongoDB!');
      window.cargarUsuarios(); // Recargamos la tabla en vivo para ver el cambio
    } else {
      alert(data.message || 'Error al actualizar');
    }
  } catch (error) {
    console.error('Error al editar usuario:', error);
    alert('Error en la solicitud de actualización');
  }
};

// Si el usuario ya tiene un token guardado (sesión permanente), cargamos directo
document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  if (token) {
    document.getElementById('login-section').classList.add('hidden');
    document.getElementById('dashboard-section').classList.remove('hidden');
    window.cargarUsuarios();
  }
});
// 🛠️ AGREGA ESTO AL FINAL DE TU ARCHIVO admin.js

document.addEventListener('DOMContentLoaded', () => {
  const btnLogout = document.getElementById('logout-button');
  
  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      // 1. Borramos el token de seguridad del navegador
      localStorage.removeItem('token');
      
      // 2. Ocultamos el panel de administración
      document.getElementById('dashboard-section').classList.add('hidden');
      
      // 3. Volvemos a mostrar el formulario de login limpio
      document.getElementById('login-section').classList.remove('hidden');
      
      // Limpiamos los inputs del formulario por seguridad
      const formLogin = document.getElementById('form-login');
      if (formLogin) formLogin.reset();
      
      alert('Has cerrado sesión correctamente. ¡Vuelve pronto!');
    });
  }
});

