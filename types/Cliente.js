export default class Client {
    constructor(id, dni, name, surname, email) {
        this.id = id;
        this.dni = dni;

        if (!validate()) {
            throw new Error("DNI o NIE no válido");
        }

        this.name = name;
        this.surname = surname;
        this.email = email;
    }

    validate() {
        if (this.dni.length !== 0) {
            const dniNie = this.dni.trim().toUpperCase();

            const regexDniNie = /^[0-9XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$/;

            if (!regexDniNie.test(dniNie)) {
                this.mostrarAlerta("DNI o NIE no válido", "error");
                return false;
            }

            const valor = dniNie.replace(/^[XYZ]/, letra => {
                return letra === "X" ? "0" : letra === "Y" ? "1" : letra === "Z" ? "2" : letra;
            });

            const numero = parseInt(valor.slice(0, 9), 10);
            let letraCalculada = "TRWAGMYFPDXBNJZSQVHLCKE".charAt(numero % 23);

            if (letraCalculada !== dniNie.charAt(8)) {
                this.mostrarAlerta("DNI o NIE no válido", "error");
                return false;
            }
            return true;
        }
        return false;
    }
}