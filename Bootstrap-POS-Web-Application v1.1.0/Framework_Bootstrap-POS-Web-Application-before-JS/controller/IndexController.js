hideAll();
$("#dashboard").css('display', 'block');
$("#nav")


$('#lnkHome').click(function () {
    hideAll();
    $("#dashboard").css('display', 'block');
    $("#nav")
});

$('#lnkCust').click(function () {
    hideAll();
    $("#customer").css('display', 'block');

});
$('#lnkItem').click(function () {
    hideAll();
    $("#item").css('display', 'block');

});
$('#lnkOrder').click(function () {
    hideAll();
    $("#order").css('display', 'block');

});

function hideAll() {
    $("#dashboard,#customer,#item,#order").css('display', 'none');
}

function loadAllCus() {


    $('#cusOrderID').empty();

    for (var i = 0; i < customerDB.length; i++) {
        data = `<option value="${customerDB[i].getCustomerID()}">${customerDB[i].getCustomerID()}</option>`;
        $('#cusOrderID').append(data);
    }
}

function loadAllItem() {


    $('#itemOrderID').empty();

    for (var i = 0; i < itemDB.length; i++) {
        data = `<option value="${itemDB[i].getItemID()}">${itemDB[i].getItemID()}</option>`;

        $('#itemOrderID').append(data);
    }
}

$('#btnNewOrder').click(function () {
    loadAllCus();
    loadAllItem();

});


$('#btnmainSearch').click(function () {

    let search = $('#mainSearchInput').val();

    for (var i = 0; i < itemDB.length; i++) {
        if (itemDB[i].getItemID() == search) {
            console.log(itemDB[i]);
        }
    }
    for (var i = 0; i < customerDB.length; i++) {
        if (customerDB[i].getItemID() == search) {
            console.log(customerDB[i]);
        }
    }
    $("#mainSearchInput").css({
        'color': 'red',
        'border':'1px solid red'
    });

});