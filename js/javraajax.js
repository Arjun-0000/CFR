function f_removedomesticpo(e){	
	var selectedpo;
	if(confirm("Are you sure you want to remove this PO delivery line?")){
		$(".checkpo").each(function() {
		if (this.checked) 
			selectedpo = this.id.split("_")[1]+","+selectedpo;
		});		

    	searchstring = $("#divSearch4 *").serialize();
		var data = "rowidlist="+selectedpo+"&part=preadvice&filterby2=" + fby + "&pgmode=removepo&" + searchstring;	
    	e.preventDefault();
    	jQuery.ajax({
	        method:"post",
	        url: cgipath + "w/wshippingarrangement.p",
	        data: data,
	        processData: false,
	        success: function(response){
	        	var returns = response.split("-");
	        	if(returns[0] == "cannotremove"){
	        		alert(returns[1]+" has already been shipped, PO cannot be removed");
	        	}
	        	$("#filterby-loadingreport").click();	        }
	    });
	}
	else{
		$("#filterby-loadingreport").click();
		return false;
	}
	
}