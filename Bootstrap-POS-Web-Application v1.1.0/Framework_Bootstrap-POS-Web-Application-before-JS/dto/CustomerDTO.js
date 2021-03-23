function CustomerDTO(id, name, city,contact, bd,gender,salary) {
    var __id = id;
    var __name = name;
    var __city = city;
    var __contact=contact
    var __bd=bd;
    var __gender=gender;
    var __salary=salary;

    this.getCustomerID = function () {
        return __id;
    }
    this.setCustomerID = function (newID) {
        __id = newID;
    }

    this.getCustomerName = function () {
        return __name;
    }
    this.setCustomerName = function (newName) {
        __name = newName;
    }

    this.getCustomerCity = function () {
        return __city;
    }
    this.setCustomerCity = function (newCity) {
        __city = newCity;
    }

    this.getCustomerContact = function () {
        return __contact;
    }
    this.setCustomerContact = function (newContact) {
        __contact = newContact;
    }

    this.getCustomerBD = function () {
        return __bd;
    }
    this.setCustomerBD = function (newBD) {
        __bd = newBD;
    }

    this.getCustomerGender = function () {
        return __gender;
    }
    this.setCustomerGender = function (newGender) {
        __gender = newGender;
    }

    this.getCustomerSalary = function () {
        return __salary;
    }
    this.setCustomerSalary = function (newSalary) {
        __salary = newSalary;
    }


}