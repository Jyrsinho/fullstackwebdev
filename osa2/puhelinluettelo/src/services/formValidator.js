/**
 * Validates the given form inputs and returns possible error. If there is no error,
 * returns null.
 * @param newName
 * @param persons
 * @param newNumber
 */
function validateForm(newName, persons, newNumber) {
    let error = isValidName(newName, persons);
    if (error !== null) return error;
    error = isValidNumber(newNumber)
    if (error !== null) return error;
    return error;

}

function isValidName(newName, persons) {
    const names = persons.map(person => person.name.toLowerCase());

    if (newName === "write new name here") {
        return("Add a new name, please");

    }

    if (newName.trim() === '') {
        return ('New name cannot be empty string');
    }

    if (names.includes(newName.trim().toLowerCase())) {
        return (`${newName} already exist`);
    }

    return null;
}

function isValidNumber(newNumber ) {
    if (newNumber.trim().length < 1) {
        return("Number cannot be empty")
    }

    const allowed = /^[0-9 -]+$/;
    if (!allowed.test(newNumber)) {
        return ("Invalid number");
    }

    return null;
}

export default validateForm
