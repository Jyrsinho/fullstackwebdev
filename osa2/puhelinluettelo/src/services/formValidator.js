/**
 * Validates the given form inputs and returns Object with fields message and code. If there is no error,
 * error code is 0 and message string is empty. Code 1 indicates that there is an issue with the name input.
 * Code 2 indicates that there is an issue with number input. Code 3 indicates that the user has given a
 * name that already exists with new number.
 * @param newName
 * @param persons
 * @param newNumber
 */
function validateForm(newName, persons, newNumber) {
    let error = {
        code: 0,
        message: ""
    }

    const names = persons.map(person => person.name.toLowerCase());

    if (newName === "write new name here") {
        error.message = "Add a new name, please";
        error.code = 1;
        return error;
    }

    if (newName.trim() === '') {

        error.message = ('New name cannot be empty string');
        error.code = 1;
        return error;
    }

    if (newNumber.trim().length < 1) {
        error.code = 2;
        error.message = ("Number cannot be empty");
        return error;
    }

    const allowed = /^[0-9 -]+$/;
    if (!allowed.test(newNumber)) {
        error.code = 2;
        error.message = ("Invalid number");
        return error;
    }

    if (names.includes(newName.trim().toLowerCase()) && newNumber.trim().length < 1) {
        error.code = 1;
        error.message = ("Given name already exists");
        return error
    }

    if (names.includes(newName.trim().toLowerCase()) && newNumber.trim().length > 1) {
        error.code = 3;
        error.message = ("Given name already exists");
        return error;
    }

    return error;
}

export default validateForm
