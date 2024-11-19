function sesionSistema() {
    return {
        camaras: [], // Lista de cámaras disponibles
        camaraSeleccionada: null, // Cámara seleccionada por el usuario
        escaneando: false, // Control del estado del escaneo
        resultadoEscaneo: '', // Almacena el resultado del escaneo
        qrCodeScanner: null, // Instancia del escáner

        // Inicialización: obtiene las cámaras disponibles
        async iniciarSistema() {
            try {
                const dispositivos = await Html5Qrcode.getCameras();
                this.camaras = dispositivos; // Guarda las cámaras en el estado
                console.log(dispositivos)
            } catch (error) {
                console.error("Error al obtener las cámaras: ", error);
                Swal.fire({
                title: "Error!", text: "Error con los Permisos de la App!", icon: "error", confirmButtonText: "Aceptar", 
                customClass: { confirmButton: 'modal-boton-confirmacion' }
                });
            }
        },

        // Selección de cámara
        seleccionarCamara(event) {
            this.camaraSeleccionada = event.target.value;
            console.log("Cámara seleccionada: ", this.camaraSeleccionada);
            this.iniciarEscaneo();
        },

        // Iniciar el escaneo de QR
        iniciarEscaneo() {
        if (this.camaraSeleccionada) {
            this.qrCodeScanner = new Html5Qrcode("qr-reader");

            // Comienza el escaneo
            this.qrCodeScanner.start(
                this.camaraSeleccionada,
                { 
                    fps: 10, qrbox: { width: 250, height: 250 }  
                }, (decodedText, decodedResult) => {
                    // Si se escanea correctamente un código QR
                    console.log(`Código QR escaneado: ${decodedText}`);
                    this.resultadoEscaneo = decodedText; // Muestra el resultado
                    this.curpDetectado();
                }, (errorMessage) => {
                    // Ocurre un error o no se encuentra un código QR
                    console.warn(`Error de escaneo: ${errorMessage}`);
                }
            ).then(() => {
                this.escaneando = true; // Cambia el estado a escaneando
            }).catch((error) => {
                console.error("Error al iniciar el escaneo: ", error);
            });
        } else {
            Swal.fire({ 
            position: "top-end", icon: "error", title: "Por favor, selecciona una cámara primero", showConfirmButton: false, timer: 1500
            });
        }
        },

        // Detener el escaneo
        detenerEscaneo() {
            if (this.qrCodeScanner) {
                this.qrCodeScanner.stop().then(() => {
                this.qrCodeScanner.clear(); // Limpia la interfaz de la cámara
                this.escaneando = false; // Cambia el estado
                this.resultadoEscaneo = ''; // Resetea el resultado
                }).catch((err) => {
                console.error("Error al detener el escaneo: ", err);
                });
            }
        },

        curpDetectado() {
            this.curpValidacion(this.resultadoEscaneo)
            this.detenerEscaneo();
            // Reactivar despues de 5 segundos
            setTimeout(() => {
            this.iniciarEscaneo();
            }, 2000);
        },

        curpValidacion(curp) {
            // Verifica si el CURP tiene una longitud de 18 caracteres
            if (curp.length !== 18) {
                Swal.fire({ // Formato Invalido
                position: "top-end", icon: "error", title: "Por favor, escanea un CURP válido", showConfirmButton: false, timer: 1500
                });
            } else {
                Swal.fire({ // CURP válido
                position: "top-end", icon: "success", title: `CURP: ${curp}`, showConfirmButton: false, timer: 2000
                });
                this.enviarNotificacionPush(curp);
            }
        },

        ingresoManualCurp() {
        Swal.fire({
            title: "Ingresa CURP del alumno",
            input: "text",
            inputAttributes: { autocapitalize: "off" },
            showCancelButton: true,
            confirmButtonText: "Enviar",
            cancelButtonText: "Cancelar",
            showLoaderOnConfirm: false,
            customClass: {
                confirmButton: 'modal-boton-confirmacion',
                cancelButton: 'modal-boton-cancelacion'
          }
          }).then((result) => {
                // Verificar que se presionó el botón de confirmación
                if (result.isConfirmed) {
                    this.resultadoEscaneo = result.value
                    this.curpValidacion(this.resultadoEscaneo); // Llamar a la función de validación
                }
          });
        },

        enviarNotificacionPush:function(curp) {
            const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                estudiante_curp: curp,
                orientador_id: this.orientador_id
            })
            };

            fetch(`https://api.sisedugob.com/ingreso-notificacion`, options)
            .then(response => { return response.json(); }) // Convertir la respuesta a JSON
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                } else if (data.exito) {
                    console.log(data.exito)
                }
            })
            .catch(error => { console.error('Error:', error); });
        },
}}