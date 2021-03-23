function orderDTO(id,date,cusID,itemID,psc,total) {
    var __id =id;
    var __date =date;
    var __cusId=cusID;
    var __itemID=itemID;
    var __psc=psc;
    var __total=total;

    this.getOrderID=function () {
        return __id;
    }
    this.setOrderID=function (newID) {
        __id=newID;
    }

    this.getOrderDate=function () {
        return __date;
    }
    this.setOrderDate=function (newDate) {
        __date=newDate;
    }


    this.getOrdercustID=function () {
        return __cusId;
    }
    this.setOrdercustID=function (newcusID) {
        __cusId=newcusID;

    }
    this.getOrderItemID=function () {
        return __itemID;
    }
    this.setOrderItemID=function (newItemID) {
        __itemID=newItemID
    }
    this.getOrderPsc=function () {
        return __psc;
    }
    this.setOrderPsc=function (newPsc) {
        __psc=newPsc;

    }
    this.getOrderTotal=function () {
        return __total;
    }
    this.setOrder=function (newTotal) {
        __total=newTotal
    }
}