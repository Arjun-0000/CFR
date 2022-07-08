 alert("Shipping-Forecast Report shall be generated and mailed to the forwarders shortly.");
    container = $('#PendingShipments');
    url = cgipath + "w/wshipping-master.p";
    data = 'part=pendingshipments&forecast=shipping-forecast';
    $('#PendingShipments').javraAjax({
        'container': container,
        url: url,
        data: data,
        type: 'post',
        afterLoad: 'initialiseColorbox()'
    });
    var myAjax = $('#PendingShipments').data('objMyJavraAjax');
    myAjax.loadRequest();

    