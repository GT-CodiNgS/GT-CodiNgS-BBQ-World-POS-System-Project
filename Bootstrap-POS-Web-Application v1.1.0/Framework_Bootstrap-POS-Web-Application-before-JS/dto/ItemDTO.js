function ItemDTO(id, name, quantity, desc, price, imgUrl) {
    var __id = id;
    var __name = name;
    var __quantity = quantity;
    var __desc = desc;
    var __price = price;
    var __imageUrl = imgUrl;

    this.getItemID = function () {
        return __id;
    }
    this.setItemID = function (newID) {
        __id=newID;
    }
    this.setItemName = function (newID) {
        __id = newID;
    }
    this.getItemName = function () {
        return __name;
    }

    this.setItemName = function (newName) {
        __name = newName;
    }
    this.getItemQuantity = function () {
        return __quantity;
    }
    this.setItemQuantity = function (newQuantity) {
        __quantity = newQuantity
    }
    this.getItemDesc = function () {
        return __desc;
    }
    this.setItemDesc = function (newDesc) {
        __desc = newDesc;
    }
    this.getItemPrice = function () {
        return __price;
    }
    this.setItemPrice = function (newPrice) {
        __price = newPrice;
    }
    this.getItemImgUrl = function () {
        return __imageUrl;
    }
    this.setItemImgUrl = function (newUrl) {
        __imageUrl = newUrl;
    }

}