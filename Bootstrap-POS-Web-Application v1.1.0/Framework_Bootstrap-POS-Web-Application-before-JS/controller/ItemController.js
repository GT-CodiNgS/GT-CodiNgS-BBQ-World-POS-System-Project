//read image
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#imageResult').attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);

        $(function () {
            $('#upload').on('change', function () {
                readURL(input);
            });
        });


        var input = document.getElementById('upload');
        var infoArea = document.getElementById('upload-label');

        input.addEventListener('change', showFileName);

        function showFileName(event) {
            var input = event.srcElement;
            var fileName = input.files[0].name;
            infoArea.textContent = 'File name: ' + fileName;
        }
    }
}

function readURLnew(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#imageResultNew').attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);

        $(function () {
            $('#upload').on('change', function () {
                readURL(input);
            });
        });


        var input = document.getElementById('uploadNew');
        var infoArea = document.getElementById('upload-label');

        input.addEventListener('change', showFileName);

        function showFileName(event) {
            var input = event.srcElement;
            var fileName = input.files[0].name;
            infoArea.textContent = 'File name: ' + fileName;
        }
    }
}

// store validation
let itemIdRegEx = /^(I)[0-9]{1,3}$/;
let itemNameRegEx = /^[A-z]{1,}$/;
let itemQtyRegEx = /^([0-9]){1,4}$/;
let itemPriceRegEx = /[0-9]{1,}$/;
// save
$('#btnSaveItem').click(function () {

    if (itemIdRegEx.test($("#itemID").val()) && $('#itemID').val() != null) {

        $("#itemID").css('border', '1px solid green');
        $("#lblitemid").text("");

        if (itemNameRegEx.test($("#itemName").val()) && $("#itemName").val() != null) {

            $("#itemName").css('border', '1px solid green');
            $("#lblitemname").text("");

            if (itemQtyRegEx.test($("#itemQuantity").val()) && $("#itemQuantity").val() != null) {

                $("#itemQuantity").css('border', '1px solid green');
                $("#lblitemqty").text("");

                if (itemPriceRegEx.test($("#itemPrice").val()) && $("#itemPrice").val() != null) {

                    $("#itemPrice").css('border', '1px solid green');
                    $("#lblitemprice").text("");

                    ///
                    let itemId = $('#itemID').val();
                    let itemName = $('#itemName').val();
                    let itemQuantity = $('#itemQuantity').val();
                    let itemDesc = $('#itemDescription').val();
                    let itemUnitPrice = $('#itemPrice').val();
                    let itemImg = $('#imageResult').attr('src');
                    let res = saveItem(itemId, itemName, itemQuantity, itemDesc, itemUnitPrice, itemImg)
                    if (res > 0) {
                        loadAllItemsToTheTable();
                        clearAllItemText();
                    }
                    ///

                } else {
                    $("#itemPrice").css('border', '1px solid red',);
                    $("#lblitemprice").text('Your Input Data Format is Wrong (ex:750)').css({
                        'color': 'red',
                        'font-size': '12px'
                    });

                }

            } else {
                $("#itemQuantity").css('border', '1px solid red',);
                $("#lblitemqty").text('Your Input Data Format is Wrong (ex:100)').css({
                    'color': 'red',
                    'font-size': '12px'
                });

            }

        } else {
            $("#itemName").css('border', '1px solid red',);
            $("#lblitemname").text('Your Input Data Format is Wrong (ex:BBQ Grill)').css({
                'color': 'red',
                'font-size': '12px'
            });

        }

    } else {
        $("#itemID").css('border', '1px solid red',);
        $("#lblitemid").text('Your Input Data Format is Wrong (ex:I001)').css({
            'color': 'red',
            'font-size': '12px'
        });

    }


});
    function saveItem(id, name, quantity, desc, price, imgUrl) {
        let item = new ItemDTO(id, name, quantity, desc, price, imgUrl)
        let result = itemDB.push(item);

        let option = confirm(`Item was Saved`);
        if (option) {
            clearAllItemText();
            $('#modalSaveItem').modal('hide');
        }
        return result;
    }

    function clearAllItemText() {
        $('#itemID').val("");
        $('#itemName').val("");
        $('#itemQuantity').val("");
        $('#itemDescription').val("");
        $('#itemPrice').val("");
        $('#imageResult').removeAttr('src');
    }

    function getAllItems() {
        return itemDB;
    }

    function loadAllItemsToTheTable() {
        let allitems = getAllItems();
        $('#tblItem').empty();
        for (var i in allitems) {
            let id = allitems[i].getItemID();
            let name = allitems[i].getItemName();
            let quantity = allitems[i].getItemQuantity();
            let desc = allitems[i].getItemDesc();
            let price = allitems[i].getItemPrice();

            var raw = `<tr><td>${id}</td><td>${name}</td><td>${quantity}</td><td>${desc}</td><td>${price}</td></tr>`;
            $('#tblItem').append(raw);

        }
    }

// search
    function searchItem(id) {
        var allItems = getAllItems();
        for (var i in allItems) {
            if (allItems[i].getItemID() == id) return allItems[i];
        }
        return null;

    }

// update
    function updateItem(id, name, quantity, desc, price, imgUrl) {
        let item = searchItem(id);
        if (item != null) {
            item.setItemID(id);
            item.setItemName(name);
            item.setItemQuantity(quantity);
            item.setItemDesc(desc);
            item.setItemPrice(price);
            item.setItemImgUrl(imgUrl);
            return true;

        } else {
            clearAllItemText();
            return false;
        }

    }

// delete
    function deleteItem(id) {
        let item = searchItem(id);
        if (item != null) {
            let indexNumber = itemDB.indexOf(item);
            itemDB.splice(indexNumber, 1);
            return true;
        } else {
            return false;
        }
    }

    function clearAllSearchItem() {
        $('#itemSearchID').val("");
        $('#itemSearchName').val("");
        $('#itemSearchQuantity').val("");
        $('#itemSearchPrice').val("");
        $('#itemSearchDescription').val("");
        $('#imageResultNew').removeAttr('src');

    }


    $("#btnDeleteItem").click(function () {
        let itemID = $("#itemSearchID").val();
        let option = confirm(`Do you want to delete ID:${itemID}`);
        if (option) {
            let res = deleteItem(itemID);
            if (res) {
                alert("Item Deleted");
            } else {
                alert("Delete Failed")
            }

        }
        loadAllItemsToTheTable();
        clearAllSearchItem();
    });

    $('#itemSearchID').on('keyup', function (eObj) {
        if (eObj.key == "Enter") {
            let item = searchItem($(this).val());
            if (item != null) {
                $('#itemSearchID').val(item.getItemID());
                $('#itemSearchName').val(item.getItemName());
                $('#itemSearchQuantity').val(item.getItemQuantity());
                $('#itemSearchPrice').val(item.getItemPrice());
                $('#itemSearchDescription').val(item.getItemDesc());
                $('#imageResultNew').attr("src", item.getItemImgUrl());
            } else {
                alert("not matching data exist! try again");
                clearAllSearchItem();
            }

        }

    });


    $('#btnUpdateItem').click(function () {
        let itemID = $('#itemSearchID').val();
        let itemName = $('#itemSearchName').val();
        let itemQuantity = $('#itemSearchQuantity').val();
        let itemPrice = $('#itemSearchPrice').val();
        let itemDescription = $('#itemSearchDescription').val();
        let itemImgUrl = $('#imageResultNew').attr('src');

        let option = confirm(`Do you want to Update Item ID:${itemID}`);
        if (option) {
            let res = updateItem(itemID, itemName, itemQuantity, itemDescription, itemPrice, itemImgUrl);
            if (res) {
                alert("Item Updated");
            } else {
                alert("Update Failed");
            }
        }
        loadAllItemsToTheTable();
        clearAllSearchItem();

    });


    $("#itemID").on('keyup', function (event) {
        if (event.key == "Enter") {
            $("#itemName").focus();
        }
    });


    $("#itemName").on('keyup', function (event) {
        if (event.key == "Enter") {
            $("#itemQuantity").focus();
        }
    });


    $("#itemQuantity").on('keyup', function (event) {
        if (event.key == "Enter") {
            $("#itemDescription").focus();
        }
    });


    $("#itemDescription").on('keyup', function (event) {
        if (event.key == "Enter") {
            $("#itemPrice").focus();
        }

    });
    $("#itemPrice").on('keyup', function (event) {
        if (event.key == "Enter") {
            $("#upload").focus();
        }

    });








