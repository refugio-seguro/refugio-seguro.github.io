function sesionSistema() {
    return {
      salirCuenta() {
        // Eliminar el elemento 'orientador' del localStorage
        localStorage.removeItem('orientador');
        
        // Redirigir a index.html
        window.location.href = 'index.html';
    }    
}}