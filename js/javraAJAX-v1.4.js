/*    AJAX standards (based on jquery-1.4.2) */

/* Update log:
(C) www.polyconceptgbs.com, September 2012

Version 1.0, September 11th - 2012 - Improvement Project Version

*/

(function($) {
    var javraajax = function(element, options) {
        var elem = $(element);
        var obj = this;
        var ret_value = {};
        var curr_action; // current action of the element       
        // object properties
        var _type;
        var _url;
        var _dataType;
        var _data;
        var _container;
        var _afterLoad;
        var _overlay;
        // default settings
        var defaults = { type: 'POST', url: 'javra_xml.xml', dataType: '', data: '', container: '', afterLoad: '', overlay: true };
        var config = $.extend(defaults, options || {});
        // initialize properties
        _type = config.type;
        _url = config.url;
        _dataType = config.dataType;
        _data = config.data;
        _container = config.container;
        _afterLoad = config.afterLoad;
        _overlay = config.overlay;
        //get and set properties
        this.setType = function(type) { _type = type; };
        this.getType = function() { return _type; };
        this.setUrl = function(url) { _url = url; };
        this.getUrl = function() { return _url; };
        this.setDataType = function(dataType) { _dataType = dataType; };
        this.getDataType = function() { return _dataType; };
        this.setData = function(dataType) { _data = data; };
        this.getData = function() { return _data; };
        this.setContainer = function(container) { _container = container; };
        this.getContainer = function() { return _container; };
        this.setAfterLoad = function(afterLoad) { _afterLoad = afterLoad; };
        this.getAfterLoad = function() { return _afterLoad; };
        this.createXMLDocument = function(string) {
            var browserName = navigator.appName;
            var xml;
            var isIE11 = !!navigator.userAgent.match(/Trident.*rv[ :]*11\./);
            if (browserName == 'Microsoft Internet Explorer' || isIE11) {
                xml = new ActiveXObject('Microsoft.XMLDOM');
                xml.async = 'false';
                xml.loadXML(string);
            } else {
                xml = (new DOMParser()).parseFromString(string, 'text/xml');
            }
            return xml;
        };
        this.sendRequest = function() {
            beforeSendRequest();
            $.ajax({
                type: this.getType(),
                url: this.getUrl(),
                cache: false,
                data: this.getData(),
                dataType: this.getDataType(),
                error: function() {
                    alert('Error loading page');
                    afterSendRequest();
                },
                success: function(data) {
                    xml = obj.createXMLDocument(data);
                    var objReturns = {};
                    $(xml).find('return').each(function() {
                        objReturns[$(this).find('name').text()] = $(this).find('value').text();
                    });
                    // save return value (json)
                    ret_value = objReturns;

                    // call back functions            
                    $(xml).find('actions').each(function() {
                        $(this).find('function').each(function() {
                            var callBkFunction = $(this).attr('name');
                            eval(callBkFunction);
                        });
                    });
                    // enable buttons here
                    afterSendRequest();
                } // end success function           
            }); // end ajax                                                
        }; // end function sendRequest()
        this.loadWidgets = function() {
            beforeSendRequest();
            $.ajax({
                type: this.getType(),
                url: this.getUrl(),
                data: this.getData(),
                dataType: this.getDataType(),
                error: function() {
                    alert('Error loading page');
                    afterSendRequest();
                },
                success: function(data) {
                    xml = obj.createXMLDocument(data);
                    //var objReturns = new Array();
                    var objReturns = {};
                    $(xml).find('container').each(function() {
                        objReturns[$(this).attr('id')] = $(this).attr('value');
                        //objReturns.push({id: $(this).attr('id'), value: $(this).attr('value')});
                    });
                    // save return value (json)
                    ret_value = objReturns;
                    loadWidgetData(ret_value);
                    // call back functions            
                    $(xml).find('actions').each(function() {
                        $(this).find('function').each(function() {
                            var callBkFunction = $(this).attr('name');
                            eval(callBkFunction);
                        });
                    });
                    // enable buttons here
                    afterSendRequest();
                } // end success function           
            }); // end ajax                                                
        }; // end function loadWidgets()
        this.loadRequest = function() {
            beforeSendRequest();
            cont = this.getContainer();
            $(cont).load(
                this.getUrl(),
                this.getData(),
                function(response, status, xhr) {
                    if (status == "error") {
                        var msg = "Sorry but there was an error: ";
                        $(cont).html(msg + xhr.status + " " + xhr.statusText);

                        afterSendRequest();
                    } else {
                        afterSendRequest();
                        func_afterLoad = obj.getAfterLoad();
                        //alert(func_afterLoad);
                        eval(func_afterLoad);
                    }
                });
        };
        var beforeSendRequest = function() {
            // disable button or link 
            if ($(elem).get(0).tagName == 'BUTTON') {
                $(elem).attr('disabled', 'disabled');
                $(elem).addClass("disabled");
            } else if ($(elem).get(0).tagName == 'A') {
                curr_action = element.onclick;
                element.onclick = "";
                $(elem).addClass("disabled");
            }
            // loading image
            vertPos = $(window).scrollTop() - 25 + $(window).height() / 2;
            leftPos = $(window).scrollLeft() - 25 + $(window).width() / 2;
            var div = $('<div></div>').addClass('divloader-wrap').css({ 'position': 'absolute', 'top': vertPos, 'left': leftPos, 'z-index': '9999' });
            div = div.append('<div class="divloader"></div>');
            $('body').append(div);
            $(window).scroll(function() {
                certerheight = $(window).scrollTop() - 25 + $(window).height() / 2;
                certerwidth = $(window).scrollLeft() - 25 + $(window).width() / 2;
                $(".divloader-wrap").css("top", certerheight).css("left", certerwidth);
            });
            $(window).resize(function() {
                certerheight = $(window).scrollTop() - 25 + $(window).height() / 2;
                certerwidth = $(window).scrollLeft() - 25 + $(window).width() / 2;
                $(".divloader-wrap").css("top", certerheight).css("left", certerwidth);
            });
        };
        // this is private function
        var afterSendRequest = function() { // enable button or link after the request is been completed
            if ($(elem).get(0).tagName == 'BUTTON') {
                $(elem).removeAttr('disabled');
                $(elem).removeClass("disabled");
            } else if ($(elem).get(0).tagName == 'A') {
                //$(elem).attr('onClick', curr_action);
                element.onclick = curr_action;
                $(elem).removeClass("disabled");
            }
            // remove loading image
            $('.divloader-wrap').remove();
        };
        // load Widget Data
        var loadWidgetData = function(widgt) {

            for (var key in widgt) {
                if (widgt.hasOwnProperty(key)) {
                    widgid = "#" + key;
                    widgval = widgt[key];

                    if ($(widgid).is("input")) {
                        $(widgid).val(widgval);
                        if (($(widgid).attr('type')) == "text") {}
                    } else {
                        //alert($(widgid).attr('tagName'));
                        $(widgid).html(widgval);
                    }

                }
            }
        };
    };
    $.fn.javraAjax = function(options) {
        return this.each(function() {
            var element = $(this);
            // Remove if this element already has a plugin instance
            if (element.data('objMyJavraAjax')) element.removeData('objMyJavraAjax');
            // pass options to plugin constructor
            var objMyJavraAjax = new javraajax(this, options);
            // Store plugin object in this element's data
            element.data('objMyJavraAjax', objMyJavraAjax);
        });
    };
})(jQuery);