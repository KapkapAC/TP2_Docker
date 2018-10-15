function getinfoorders() {
	var soldetotal;
	var base_url = "http://localhost:8000/https://api.binance.com/api/v3/openOrders?";
	var apikey ="slI98Ngdp18P737IRwNhP3tsdENxQ4NFF7RFyW7dDj9qSFhQc5KHsnZw1Rv1i7Em";
	var secretkey ="RG29NszaL9MATcYwAcpQmCJTaNUSImGl30Up6nahSO26qV2TEzdN6O5kev1smiwr";
	var timestamp = Date.now()-3000;
	var recvWindow = 5000;
	var postmessage = "timestamp="+timestamp+"&recvWindow="+recvWindow;//+"&symbol="+currencyselect; //= totalParams uniquememnt du query car le body est vide
	var signature = CryptoJS.HmacSHA256(postmessage,secretkey);
	var querystring = postmessage +"&signature=" + signature;
	var url = base_url + querystring;
	var mydata;
	console.log("info order"); 
	$.ajax({

         url: url,
         type: "GET",
         beforeSend: function(xhr){xhr.setRequestHeader("X-MBX-APIKEY", apikey);},
         success: function(data) { 
         	mydata =data;

         	console.log(mydata);
         	if(mydata != ""){

         		for(var i=0; i<mydata.balances.length;i++) {
         			var dateordre =new Date(mydata[i].time)
        	    	var heure = dateordre.getHours();
			    	var minute = dateordre.getMinutes();
			    	var second = dateordre.getSeconds();
        		//soldetotal = parseFloat(mydata.balances[i].free) +parseFloat( mydata.balances[i].locked);
        		document.getElementById('table_ordreouvert').innerHTML += "<tr> <td>"+mydata[i].symbol+"</td> <td>"+mydata[i].side+"</td><td>"+mydata[i].origQty+"</td><td>"+mydata[i].price+"</td><td>"+mydata[i].status+"</td><td>"+ (heure<10 ? '0' : '') + heure + ':' + (minute<10 ? '0' : '') + minute + ':' + (second<10 ? '0' : '') + second +"</td></tr>"
        		sorttable.makeSortable(document.getElementById('table_ordreouvert'));
        		}
        	}
        }
     });
	document.getElementById('table_ordreouvert' ).innerHTML = "";
	document.getElementById('table_ordreouvert' ).innerHTML += "<tr id='spetr'> <td> Monnaies</td> <td>Type</td> <td>Quantité</td> <td>Prix</td><td>Statut</td><td>Date</td></tr>";
}

function getinfohistorique() {
	var soldetotal;
	var base_url = "http://localhost:8000/https://api.binance.com/api/v3/allOrders?";
	var apikey ="slI98Ngdp18P737IRwNhP3tsdENxQ4NFF7RFyW7dDj9qSFhQc5KHsnZw1Rv1i7Em";
	var secretkey ="RG29NszaL9MATcYwAcpQmCJTaNUSImGl30Up6nahSO26qV2TEzdN6O5kev1smiwr";
	var timestamp = Date.now()-3000;
	var recvWindow = 5000;
	var postmessage = "timestamp="+timestamp+"&recvWindow="+recvWindow+"&symbol=" + currencyselect; //= totalParams uniquememnt du query car le body est vide
	var signature = CryptoJS.HmacSHA256(postmessage,secretkey);
	var querystring = postmessage +"&signature=" + signature;
	var url = base_url + querystring;
	var mydata;
	console.log("info order"); 
	$.ajax({

         url: url,
         type: "GET",
         beforeSend: function(xhr){xhr.setRequestHeader("X-MBX-APIKEY", apikey);},
         success: function(data) { 
         	mydata =data;

         	console.log(mydata);
         	if(mydata != ""){

         		for(var i=0; i<mydata.length;i++) {
         			var dateordre =new Date(mydata[i].time)
        	    	var heure = dateordre.getHours();
			    	var minute = dateordre.getMinutes();
			    	var second = dateordre.getSeconds();
        		//soldetotal = parseFloat(mydata.balances[i].free) +parseFloat( mydata.balances[i].locked);
        		document.getElementById('table_ordreprog').innerHTML += "<tr> <td>"+mydata[i].symbol+"</td> <td>"+mydata[i].side+"</td><td>"+mydata[i].origQty+"</td><td>"+mydata[i].price+"</td><td>"+mydata[i].status+"</td><td>"+ (heure<10 ? '0' : '') + heure + ':' + (minute<10 ? '0' : '') + minute + ':' + (second<10 ? '0' : '') + second +"</td></tr>"
        		sorttable.makeSortable(document.getElementById('table_ordreprog'));
        		}
        	}
        }
     });
	document.getElementById('table_ordreprog' ).innerHTML = "";
	document.getElementById('table_ordreprog' ).innerHTML += "<tr id='spetr'> <td> Monnaies</td> <td>Type</td> <td>Quantité</td> <td>Prix</td><td>Statut</td><td>Date</td></tr>";
}
