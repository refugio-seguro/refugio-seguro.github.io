function menuOpciones() {
    return {
        orientador_nombre: "",
        orientador_cargo: "",
        orientador_id: "",

        iniciarGestor:function() {
            this.validarOrientador()
        },

        validarOrientador:function() {
          const datosRecuperados = localStorage.getItem('orientador');
          if (datosRecuperados) {
              const orientador = JSON.parse(datosRecuperados);
              this.orientador_nombre = orientador.nombre || "";
              this.orientador_cargo = orientador.cargo || "";
              this.orientador_id = orientador.id || "";
              console.log(`Nombre del Orientador: ${this.orientador_nombre}`);
              console.log(`Cargo del Orientador: ${this.orientador_cargo}`);
              console.log(`Id del Orientador: ${this.orientador_id}`);
          } else {
              window.location.href = 'index.html';
          }
        },

        paginaIngreso:function() {
          window.location.href = 'ingreso.html';
        },
        
        paginaAlertas:function() {
          window.location.href = 'mensajes.html';
        },

        paginaCuenta:function() {
          window.location.href = 'cuenta.html';
        }
}}