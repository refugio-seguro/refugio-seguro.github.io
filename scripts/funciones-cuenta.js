function sesionSistema() {
  return {
      ubicacionActual: null,
      ubicacionWatcher: null,

      iniciarRastreoUbicacion() {
          // Verificar si la geolocalización está disponible
          if ("geolocation" in navigator) {
              console.log("Iniciando rastreo de ubicación...");
              this.ubicacionWatcher = navigator.geolocation.watchPosition(
                  (position) => {
                      // Actualizar la ubicación actual
                      this.ubicacionActual = {
                          latitud: position.coords.latitude,
                          longitud: position.coords.longitude,
                      };
                      console.log("Ubicación actualizada:", this.ubicacionActual);

                      // (Opcional) Enviar la ubicación al servidor
                      // fetch('/actualizarUbicacion', {
                      //     method: 'POST',
                      //     headers: { 'Content-Type': 'application/json' },
                      //     body: JSON.stringify(this.ubicacionActual),
                      // });
                  },
                  (error) => {
                      console.error("Error al obtener la ubicación:", error);
                  },
                  {
                      enableHighAccuracy: true,
                      maximumAge: 10000,
                      timeout: 5000,
                  }
              );
          } else {
              console.warn("La geolocalización no está soportada en este navegador.");
          }
      },

      detenerRastreoUbicacion() {
          if (this.ubicacionWatcher !== null) {
              console.log("Deteniendo rastreo de ubicación...");
              navigator.geolocation.clearWatch(this.ubicacionWatcher);
              this.ubicacionWatcher = null;
          }
      },

      salirCuenta() {
          // Detener el rastreo de ubicación antes de cerrar sesión
          this.detenerRastreoUbicacion();

          // Eliminar el elemento 'orientador' del localStorage
          localStorage.removeItem('orientador');

          // Redirigir a index.html
          window.location.href = 'index.html';
      },
  };
}