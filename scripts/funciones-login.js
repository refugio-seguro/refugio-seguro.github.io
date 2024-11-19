function sesionSistema() {
    return {
        orientador_usuario: "",
        orientador_contrasena: "",

        iniciarGestor:function() {
            this.validarOrientador()
        },

        validarOrientador:function() {
            const datosRecuperados = localStorage.getItem('orientador');
    
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
            if (!this.orientador_usuario || !this.orientador_contrasena) {
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
            const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                orientador_usuario: this.orientador_usuario,
                orientador_contrasena: this.orientador_contrasena
            })
            };

            fetch(`https://api.sisedugob.com/inciar-sesion-orientador`, options)
            .then(response => { return response.json(); }) // Convertir la respuesta a JSON
            .then(data => {
                if (data.error) {
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: data.error,
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else if (data.exito) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Inicio Exitoso",
                        showConfirmButton: false,
                        timer: 20000
                    });

                    setTimeout(() => {
                        this.guardarDatosOrientador(data.datos)
                    }, 2500);
                }
            })
            .catch(error => { console.error('Error:', error); });
        },

        guardarDatosOrientador:function(datos) {
            // Convierte el objeto de datos a un JSON string
            const datosString = JSON.stringify(datos);

            // Guarda el JSON string en localStorage'
            localStorage.setItem('orientador', datosString);

            // Muestra los datos en la consola para verificación
            console.log(datos);
            
            window.location.href = 'ingreso.html';
        }
}}