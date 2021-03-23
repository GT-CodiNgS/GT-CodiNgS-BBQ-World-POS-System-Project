//save
function saveCustomer(id, name, city, contact, bd, gender, salary) {
    $('#tblCustomer>tr').off('click');

    let customer = new CustomerDTO(id, name, city, contact, bd, gender, salary);
    let result=0;
    result = customerDB.push(customer);// cust aded
    console.log(result);
    let option1 = confirm(`Customer was Saved`);
    if (option1) {
        clearAllCustomerText();
        $('#modalSaveCustomer').modal('hide');
    }

    loadAllCustomerToTheTable();

    $('#tblCustomer>tr').click(function () {
        alert("Hello! I am an alert box!!");
    });

    return result;
}

// search customer
function searchCustomer(id) {
    for (var i in customerDB) {
        if (customerDB[i].getCustomerID() == id) return customerDB[i];
    }
    return null;
}

//update
function updateCustomer(id, name, city, contact, bd, gender, salary) {
    let customer = searchCustomer(id);
    if (customer != null) {
        customer.setCustomerID(id)
        customer.setCustomerName(name)
        customer.setCustomerCity(city)
        customer.setCustomerContact(contact)
        customer.setCustomerBD(bd)
        customer.setCustomerGender(gender)
        customer.setCustomerSalary(salary);

        return true;
    } else {
        return false;
    }
}

//delete
function deleteCustomer(id) {
    let customer = searchCustomer(id);
    if (customer != null) {
        let indexNumber = customerDB.indexOf(customer);
        customerDB.splice(indexNumber, 1);
        return true;
    } else {
        return false;
    }
}

//get all customers
function getAllCustomers() {
    return customerDB;
}

// load
function loadAllCustomerToTheTable() {
    let allCustomers = getAllCustomers();
    $('#tblCustomer').empty();
    for (var i in allCustomers) {
        let id = allCustomers[i].getCustomerID();
        let name = allCustomers[i].getCustomerName();
        let city = allCustomers[i].getCustomerCity();
        let contact = allCustomers[i].getCustomerContact();
        let bd = allCustomers[i].getCustomerBD();
        let gender = allCustomers[i].getCustomerGender();
        let salary = allCustomers[i].getCustomerSalary();

        var row = `<tr><td>${id}</td><td>${name}</td><td>${city}</td><td>${contact}</td><td>${bd}</td><td>${gender}</td><td>${salary}</td></tr>`;
        $('#tblCustomer').append(row);
    }
}

function clearAllCustomerText() {
    $("#cusID").val("");
    $("#cusName").val("");
    $("#cusPW").val("");
    $("#cusContact").val("");
    $("#cusDOB").val("");
    $("#cusGender").val("");
    $("#cusSalary").val("");
}

//search model clear
function clearCustomerText() {
    $("#cusSearchID").val("");
    $("#cusSearchName").val("");
    $("#cusSearchPW").val("");
    $("#cusSearchContact").val("");
    $("#cusSearchDOB").val("");
    $("#cusSearchGender").val("");
    $("#cusSearchSalary").val("");
}


$("#cusID").on('keyup', function (event) {
    if (event.key == "Enter") {
        $("#cusName").focus();
    }
});
$("#cusName").on('keyup', function (event) {
    if (event.key == "Enter") {
        $("#cusPW").focus();
    }
});
$("#cusPW").on('keyup', function (event) {
    if (event.key == "Enter") {
        $("#cusContact").focus();
    }
});
$("#cusContact").on('keyup', function (event) {
    if (event.key == "Enter") {
        $("#cusDOB").focus();
    }
});
$("#cusDOB").on('keyup', function (event) {
    if (event.key == "Enter") {
        $("#cusGender").focus();
    }
});
$("#cusGender").on('keyup', function (event) {
    if (event.key == "Enter") {
        $("#cusSalary").focus();
    }
});
$("#cusSalary").on('keyup', function (event) {
    if (event.key == "Enter") {
        $("#exampleCheck1").focus();
    }
});
$("#exampleCheck1").on('keyup', function (event) {
    if (event.key == "Enter") {
        $("#btnSaveCus").focus();
    }
});


// validation
let cusIdRegEx = /^(C)[0-9]{1,3}$/;
let cusNameRegEx = /^[A-z]{1,}$/;
let cusCityRegEx = /([A-z]|[0-9]){1,}$/;
let cusContactRegEx = /[0-9]{10}/;
let cusDBRegEx = /[]/;
let cusGenderRegEx = /[]/;
let cusSalaryRegEx = /[0-9]{1,}$/;

$('#btnSaveCus').click(function () {
    if (cusIdRegEx.test($("#cusID").val()) && $("#cusID").val() != null) {
        $("#cusID").css('border', '1px solid green');
        $("#lblcusid").text("");

        if (cusNameRegEx.test($("#cusName").val()) && $("#cusName").val() != null) {
            $("#cusName").css('border', '1px solid green');
            $("#lblcusname").text("");

            if (cusCityRegEx.test($("#cusPW").val()) && $("#cusPW").val() != null) {

                $("#cusPW").css('border', '1px solid green');
                $("#lblcuscity").text("");

                if (cusContactRegEx.test($("#cusContact").val()) && $("#cusContact").val() != null) {

                    $("#cusContact").css('border', '1px solid green');
                    $("#lblcuscontact").text("");

                    if ($("#cusDOB").val() != null) {

                        $("#cusDOB").css('border', '1px solid green');
                        $("#lblcusDOB").text("");

                        if ($($("#cusGender").val()) != null) {

                            $("#cusGender").css('border', '1px solid green');
                            $("#lblcusGendr").text("");

                            if (cusSalaryRegEx.test($("#cusSalary").val()) && $("#cusSalary").val() != null) {

                                $("#cusSalary").css('border', '1px solid green');
                                $("#lblcusSalary").text("");

                                ////
                                let cusID = $("#cusID").val();
                                let cusName = $("#cusName").val();
                                let cusCity = $("#cusPW").val();
                                let cusContact = $("#cusContact").val();
                                let cusBd = $("#cusDOB").val();
                                let temp=$("#cusGender").val();
                                let cusGender;
                                if (temp==1){
                                    cusGender="Male";
                                }else if (temp==2){
                                    cusGender="Female";
                                }
                                // let cusGender = $("#cusGender").val();
                                console.log(cusGender);
                                let cusSalary = $("#cusSalary").val();
                                let res = saveCustomer(cusID, cusName, cusCity, cusContact, cusBd, cusGender, cusSalary);
                                if (res>0) {
                                    clearAllCustomerText();
                                }
                                ////

                            } else {
                                $("#cusSalary").css('border', '1px solid red',);
                                $("#lblcusSalary").text('Your Input Data Format is Wrong (ex:5000)').css({
                                    'color': 'red',
                                    'font-size': '12px'
                                });

                            }
                        } else {
                            $("#cusGender").css('border', '1px solid red',);
                            $("#lblcusGendr").text('Please Select Gender').css({
                                'color': 'red',
                                'font-size': '12px'
                            });

                        }

                    } else {
                        $("#cusDOB").css('border', '1px solid red',);
                        $("#lblcusDOB").text('Please Enter birthaday').css({
                            'color': 'red',
                            'font-size': '12px'
                        });

                    }

                } else {
                    $("#cusContact").css('border', '1px solid red',);
                    $("#lblcuscontact").text('Your Input Data Format is Wrong (ex:0767737579)').css({
                        'color': 'red',
                        'font-size': '12px'
                    });

                }

            } else {
                $("#cusPW").css('border', '1px solid red',);
                $("#lblcuscity").text('Your Input Data Format is Wrong (ex:Hikkaduwa)').css({
                    'color': 'red',
                    'font-size': '12px'
                });

            }

        } else {
            $("#cusName").css('border', '1px solid red',);
            $("#lblcusname").text('Your Input Data Format is Wrong (ex:Samarakoon)').css({
                'color': 'red',
                'font-size': '12px'
            });

        }

    } else {
        $("#cusID").css('border', '1px solid red',);
        $("#lblcusid").text('Your Input Data Format is Wrong (ex:C001)').css({
            'color': 'red',
            'font-size': '12px'
        });

    }

});


$("#btnUpdateCus").click(function () {
    let cusID = $("#cusSearchID").val();
    let cusName = $("#cusSearchName").val();
    let cusCity = $("#cusSearchPW").val();
    let cusContact = $("#cusSearchContact").val();
    let cusBD = $("#cusSearchDOB").val();
    let cusGender = $("#cusSearchGender").val();
    let cusSalary = $("#cusSearchSalary").val();

    let option = confirm(`Do you want to Update Customer ID:${cusID}`);
    if (option) {
        let res = updateCustomer(cusID, cusName, cusCity, cusContact, cusBD, cusGender, cusSalary);
        if (res) {
            alert("Customer Updated");
        } else {
            alert("Update Failed");
        }
    }
    loadAllCustomerToTheTable();
    clearCustomerText();

});

$("#btnDeleteCus").click(function () {
    let cusID = $("#cusSearchID").val();
    let option = confirm(`Do you want to delete ID:${cusID}`);
    if (option) {
        let res = deleteCustomer(cusID);
        if (res) {
            alert("Customer Deleted");
        } else {
            alert("Delete Failed")
        }

    }
    loadAllCustomerToTheTable();
    clearCustomerText();
});

$("#cusSearchID").on('keyup', function (eObj) {
    if (eObj.key == "Enter") {
        let customer = searchCustomer($(this).val());
        if (customer != null) {
            $("#cusSearchID").val(customer.getCustomerID());
            $("#cusSearchName").val(customer.getCustomerName());
            $("#cusSearchPW").val(customer.getCustomerCity());
            $("#cusSearchContact").val(customer.getCustomerContact());
            $("#cusSearchDOB").val(customer.getCustomerBD());
            $("#cusSearchGender").val(customer.getCustomerGender());
            $("#cusSearchSalary").val(customer.getCustomerSalary());
        } else {
            alert("not matching data exist! try again");
            clearAllCustomerText();
        }
    }
});
