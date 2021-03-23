function saveOrder(id, date, cusID, itemID, psc, total) {
    let order = new orderDTO(id, date, cusID, itemID, psc, total);
    let result = orderDB.push(order);
    loadAllOrdersToTheTable();
    let option = confirm(`Order was Placed`);
    if (option) {
        clearAllOrderText();
        $('#modalNewOrder').modal('hide');
    }

    return result;

}

function getAllOrders() {
    return orderDB;
}

function clearAllOrderText() {
    $("#orderID").val("");
    $("#orderDate").val("");
    $("#cusOrderID").val("");
    $("#itemOrderID").val("");
    $("#orderOnePcsPrice").val("");
    $("#orderDiscount").val("");
    $("#orderQuantity").val("");
    $("#orderTotal").val("");

}

function loadAllOrdersToTheTable() {
    let allOrders = getAllOrders();
    $('#tblOrder').empty();
    for (var i in allOrders) {
        let id = allOrders[i].getOrderID();
        let date = allOrders[i].getOrderDate();
        let cutID = allOrders[i].getOrdercustID();
        let itemID = allOrders[i].getOrderItemID();
        let psc = allOrders[i].getOrderPsc();
        let tot = allOrders[i].getOrderTotal();

        var raw = `<tr><td>${id}</td><td>${date}</td><td>${cutID}</td><td>${itemID}</td><td>${psc}</td><td>${tot}</td></tr>`;
        $('#tblOrder').append(raw);

    }
}

function searchOrder(id) {
    for (var i in orderDB) {
        if (orderDB[i].getOrderID() == id) return orderDB[i];
    }
    return null;
}

function clearAllOrderSearchText() {
    $("#orderSearchID").val("");
    $("#orderSearchDate").val("");
    $("#cusOrderSeachID").val("");
    $("#itemOrderSearchID").val("");
    $("#orderSearchQuantity").val("");
    $("#orderSearchTotal").val("");

}

function getTotal() {
    let pscPrice = parseFloat($('#orderOnePcsPrice').val());
    let discountPrice = parseFloat($('#orderDiscount').val());
    let psc = parseFloat($('#orderQuantity').val());
    let tempTot = pscPrice * psc;

    if (tempTot >= 2000 && tempTot < 5000) {
        $('#orderDiscount').val("10");
        let tot = tempTot - (pscPrice * psc) * (discountPrice / 100);
        $('#orderTotal').val(tot);
        $('#orderTotal').css({
            'color': 'red',
            'font-size': '50px'
        });
    } else if ((tempTot) >= 5000) {
        $('#orderDiscount').val("20");
        let tot = tempTot - (pscPrice * psc) * (discountPrice / 100);
        $('#orderTotal').val(tot);
        $('#orderTotal').css({
            'color': 'red',
            'font-size': '50px'
        });


    } else {
        $('#orderDiscount').val("");
        $('#orderTotal').val("");
        let tot2 = tempTot;
        $('#orderTotal').val(tot2);
        $('#orderTotal').css({
            'color': 'red',
            'font-size': '50px'
        });
        $('#orderDiscount').css({
            'color': 'orange',

        });
    }


}


$("#itemOrderID").click(function () {
    let ItemIDTemp = $('#itemOrderID').val();
    for (var i = 0; i < itemDB.length; i++) {
        if (itemDB[i].getItemID() === ItemIDTemp) {
            $('#orderOnePcsPrice').val(itemDB[i].getItemPrice());
            $('#orderQuantity').val("1");
        }
    }
});

$('#orderDiscount').on('keyup', function () {
    getTotal();

});

$('#orderQuantity').on('keyup', function () {
    getTotal();
});

let orderIdRegEx = /^(O)[0-9]{1,3}$/;
let orderPscRegEx = /^(O)[0-9]{1,3}$/;

$('#btnsaveOrder').click(function () {

    if (orderIdRegEx.test($("#orderID").val()) && $("#orderID").val() != null) {

        $("#orderID").css('border', '1px solid green');
        $("#lblOrderid").text("");

        if ( $('#orderDate').val() != null) {

            $("#orderDate").css('border', '1px solid green');
            $("#lblOrderdate").text("");

            if ( $("#cusOrderID").val() != null) {

                $("#cusOrderID").css('border', '1px solid green');
                $("#lblOrdercusid").text("");

                if ( $("#itemOrderID").val() != null) {

                    $("#itemOrderID").css('border', '1px solid green');
                    $("#lblOrderitemid").text("");

                        ///
                        let oID = $('#orderID').val();
                        let oDate = $('#orderDate').val();
                        let OcustID = $('#cusOrderID').val();
                        let oItemID = $('#itemOrderID').val();
                        let oPsc = $('#orderQuantity').val();
                        let oTotal = $('#orderTotal').val();
                        let res = saveOrder(oID, oDate, OcustID, oItemID, oPsc, oTotal);

                        if (res > 1) {
                            loadAllOrdersToTheTable();
                            clearAllOrderText();
                        }
                        ///


                } else {
                    $("#itemOrderID").css('border', '1px solid red',);
                    $("#lblOrderitemid").text('Please select Item ID').css({
                        'color': 'red',
                        'font-size': '12px'
                    });

                }

            } else {
                $("#cusOrderID").css('border', '1px solid red',);
                $("#lblOrdercusid").text('Please select Customer ID').css({
                    'color': 'red',
                    'font-size': '12px'
                });

            }

        } else {
            $("#orderDate").css('border', '1px solid red',);
            $("#lblOrderdate").text('Please select current date').css({
                'color': 'red',
                'font-size': '12px'
            });

        }

    } else {
        $("#orderID").css('border', '1px solid red',);
        $("#lblOrderid").text('Your Input Data Format is Wrong (ex:O001)').css({
            'color': 'red',
            'font-size': '12px'
        });

    }

});

$("#orderSearchID").on('keyup', function (eObj) {
    if (eObj.key == "Enter") {
        let order = searchOrder($(this).val());
        console.log(order);
        if (order != null) {
            $("#orderSearchDate").val(order.getOrderDate());
            $("#cusOrderSeachID").val(order.getOrdercustID());
            $("#itemOrderSearchID").val(order.getOrderItemID());
            $("#orderSearchQuantity").val(order.getOrderPsc());
            $("#orderSearchTotal").val(order.getOrderTotal());

        } else {
            alert("not matching data exist! try again");
            clearAllOrderSearchText();
        }
    }
});


$("#orderID").on('keyup', function (event) {
    if (event.key == "Enter") {
        $("#orderDate").focus();
    }

});
$("#orderDate").on('keyup', function (event) {
    if (event.key == "Enter") {
        $("#cusOrderID").focus();
    }

});
$("#cusOrderID").on('keyup', function (event) {
    if (event.key == "Enter") {
        $("#itemOrderID").focus();
    }

});
$("#itemOrderID").on('keyup', function (event) {
    if (event.key == "Enter") {
        $("#orderOnePcsPrice").focus();
    }

});
$("#orderOnePcsPrice").on('keyup', function (event) {
    if (event.key == "Enter") {
        $("#orderQuantity").focus();
    }

});
$("#orderQuantity").on('keyup', function (event) {
    if (event.key == "Enter") {
        $("#exampleCheck7").focus();
    }

});
$("#exampleCheck7").on('keyup', function (event) {
    if (event.key == "Enter") {
        $("#btnsaveOrder").focus();
    }

});



























