function sesionSistema() {
    return {
        mujer_usuario: "",
        mujer_contrasena: "",

        iniciarGestor:function() {
            this.validarMujer()
        },

        validarMujer:function() {
            const datosRecuperados = localStorage.getItem('mujer');
    
            if (datosRecuperados) {
                // Si existen datos en localStorage, redirigimos a ingreso.html
                window.location.href = 'ingreso.html';
            } else {
                // Si no existen datos, nos mantenemos en la página de login
                console.log("No hay datos de orientador en localStorage. Nos quedamos en login.");
            }
        },

        validarAccesosSistema:function() {
            // Verificar si los campos están vacíos o nulos
            if (!this.mujer_usuario || !this.mujer_contrasena) {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Faltan Campos por Llenar",
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Los Datos están siendo Validados",
                    showConfirmButton: false,
                    timer: 1500
                });
                this.ingresarSistema();
            }
        },

        ingresarSistema:function() {
            if (this.mujer_usuario == "Mujer1" && this.mujer_contrasena == "Mujer100") {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Inicio Exitoso",
                    showConfirmButton: false,
                    timer: 20000
                });

                setTimeout(() => {
                    this.guardarDatosMujer(this.mujer_usuario)
                }, 2500);
            } else {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: data.error,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        },

        guardarDatosMujer:function(datos) {
            // Convierte el objeto de datos a un JSON string
            const datosString = JSON.stringify(datos);

            // Guarda el JSON string en localStorage'
            localStorage.setItem('orientador', datosString);

            // Muestra los datos en la consola para verificación
            console.log(datos);
            
            window.location.href = 'ingreso.html';
        }
}}