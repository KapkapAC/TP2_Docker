
//variables globales
var timegraph = "1d";
var scrolleron = false;
var dejacharger = 0;
var typegraphactual;
var datag = [];
var macd2 = false;
var interBTC;
var interETH;
var interBNB;
var interUSDT;
var clicks =0;
var currencyselect = "BTCUSDT";
var types = ["line", "stackedline", "fullstackedline"];
var Monnaie_echange;
var Monnaie_voulu;
var ongletinfoselected ="fond";

var robotCurrency = 0;
var robotMonney = 8400;
var robotAchat = true;
var robotVente = false;
var LastPrice = null;
var LastVolume = null;
var robotInter;
var apikey ="";
var secretkey ="";

//main
$(function(){


	//Les listeners
	$("#Imputbuttonvendreprog").click(function(){
		console.log("clikou");
        Venteprogrammation();
    });
	$("#Imputbuttonacheterprog").click(function(){
		console.log("clikou");
        Achatprogrammation();
    });
    $("#Imputbuttonacheterperso").click(function(){
		console.log("clikou");
        Achatprixperso();
    });
    $("#Imputbuttonvendreperso").click(function(){
		console.log("clikou");
        Venteprixperso();
    });
	$("#Imputbuttonacheter").click(function(){
        AchatMarket();
    });
    $("#Imputbuttonvendre").click(function(){
        VenteMarket();
	});
	$("#crypto").click(function(){
		if(clicks == 0) {
			clicks++;
			$("#containertable").show();
			$("#containertable").animate({height:145},200);
		}
		else{
			$("#containertable").animate({height:2},200);
			setTimeout(function(){
				$("#containertable").hide();
			}, 200);
			clicks--;
		}


	});

	$("#typechart").mouseenter(function(){
		$("#sousonglettype").show();
		$("#sousonglettype").animate({height:145},200);

	});

	$("#typechart").mouseleave(function(){
		$("#sousonglettype").animate({height:2},200);
		setTimeout(function(){
			$("#sousonglettype").hide();
		}, 200);
	});
	$("#indicateur").mouseenter(function(){
		$("#sousongletindicateur").show();
		$("#sousongletindicateur").animate({height:145},200);

	});

	$("#indicateur").mouseleave(function(){
		$("#sousongletindicateur").animate({height:2},200);
		setTimeout(function(){
			$("#sousongletindicateur").hide();
		}, 200);
	});
	$("#outils").mouseenter(function(){
		$("#sousongletoutils").show();
		$("#sousongletoutils").animate({height:145},200);

	});

	$("#outils").mouseleave(function(){
		$("#sousongletoutils").animate({height:2},200);
		setTimeout(function(){
			$("#sousongletoutils").hide();
		}, 200);
	});



	$("#ongletbtc").click(function(){
		clearInterval(interBTC);
		clearInterval(interBNB);
		clearInterval(interUSDT);
		clearInterval(interETH);
		getInfoByDevise('BTC');
		interBTC = setInterval("getInfoByDevise('BTC')", 30000);

	});
	$("#ongletusdt").click(function(){
		clearInterval(interBTC);
		clearInterval(interBNB);
		clearInterval(interUSDT);
		clearInterval(interETH);
		getInfoByDevise('USDT');
		interUSDT = setInterval("getInfoByDevise('USDT')", 30000);
	});
	$("#ongleteth").click(function(){
		clearInterval(interBTC);
		clearInterval(interBNB);
		clearInterval(interUSDT);
		clearInterval(interETH);
		getInfoByDevise('ETH');
		interETH= setInterval("getInfoByDevise('ETH')", 30000);

	});
	$("#ongletbnb").click(function(){
		clearInterval(interBTC);
		clearInterval(interBNB);
		clearInterval(interUSDT);
		clearInterval(interETH);
		getInfoByDevise('BNB');
		interBNB= setInterval("getInfoByDevise('BNB')", 30000);
	});
	$("#bougies").click(function(){
		$("#Courbes").css("color","white");
		$("#bougies").css("color","#1D70B5");
		$("#ohlc").css("color","white");
		dejacharger = 0;
		candlestickgraph(currencyselect);
	});
	$("#Courbes").click(function(){
		$("#bougies").css("color","white");
		$("#Courbes").css("color","#1D70B5");
		$("#ohlc").css("color","white");
		dejacharger = 0;
		courbesgraph(currencyselect);
	});
	$("#ohlc").click(function(){
		$("#Courbes").css("color","white");
		$("#ohlc").css("color","#1D70B5");
		$("#bougies").css("color","white");
		dejacharger = 0;
		ohlcgraph(currencyselect);
	});
	$("#macd").click(function(){
		if(!macd2) {
			macd2 = true;
			$("#macd").css("color","#1D70B5");
		}
		else {
			macd2 = false;
			$("#macd").css("color","white");
		}

		if(typegraphactual == "candle"){
			candlestickgraph(currencyselect);
		}
		if(typegraphactual == "line") {
			courbesgraph(currencyselect);
		}
		if(typegraphactual == "ohlc") {
			ohlcgraph(currencyselect);
		}

	});
	$("#scroller").click(function(){
		if(!scrolleron) {
			scrolleron = true;
			$("#scroller").css("color","#1D70B5");
		}
		else {
			scrolleron = false;
			$("#scroller").css("color","white");
		}

		if(typegraphactual == "candle"){
			candlestickgraph(currencyselect);
		}
		if(typegraphactual == "line") {
			courbesgraph(currencyselect);
		}
		if(typegraphactual == "ohlc") {
			ohlcgraph(currencyselect);
		}

	});
	$("#D").click(function(){
		$("#D").css("color","#1D70B5");
		$("#W").css("color","white");
		$("#Hour").css("color","white");
		timegraph ="1d";
		dejacharger=0;
		if(typegraphactual == "candle"){
			candlestickgraph(currencyselect);
		}
		if(typegraphactual == "line") {
			courbesgraph(currencyselect);
		}
		if(typegraphactual == "ohlc") {
			ohlcgraph(currencyselect);
		}

	});
	$("#W").click(function(){
		$("#D").css("color","white");
		$("#W").css("color","#1D70B5");
		$("#Hour").css("color","white");
		timegraph ="1w";
		dejacharger=0;
		if(typegraphactual == "candle"){
			candlestickgraph(currencyselect);
		}
		if(typegraphactual == "line") {
			courbesgraph(currencyselect);
		}
		if(typegraphactual == "ohlc") {
			ohlcgraph(currencyselect);
		}

	});
	$("#Hour").click(function(){
		$("#D").css("color","white");
		$("#Hour").css("color","#1D70B5");
		$("#W").css("color","white");
		timegraph ="1h";
		dejacharger=0;
		if(typegraphactual == "candle"){
			candlestickgraph(currencyselect);
		}
		if(typegraphactual == "line") {
			courbesgraph(currencyselect);
		}
		if(typegraphactual == "ohlc") {
			ohlcgraph(currencyselect);
		}

	});



	$("#fond").click(function(){
		console.log("click");
		$("#fond").css("color","#1D70B5");
		$("#ordreouvert").css("color","white");
		$("#ordreprog").css("color","white");
		$("#table_ordreouvert").css("display","none");
		$("#table_info").css("display","block");
		$("#table_ordreprog").css("display","none");});
	$("#ordreouvert").click(function(){
		console.log("click");
		$("#ordreouvert").css("color","#1D70B5");
		$("#fond").css("color","white");
		$("#ordreprog").css("color","white");
		$("#table_ordreouvert").css("display","block");
		$("#table_info").css("display","none");
		$("#table_ordreprog").css("display","none");

	});
	$("#ordreprog").click(function(){
		console.log("click");
		$("#ordreprog").css("color","#1D70B5");
		$("#fond").css("color","white");
		$("#ordreouvert").css("color","white");
		$("#table_ordreouvert").css("display","none");
		$("#table_info").css("display","none");
		$("#table_ordreprog").css("display","block");


	});
	$("#ongletmarket").click(function(){
		console.log("click");
		$("#ongletmarket").css("color","#1D70B5");
		$("#ongletmarket").css("background-color","#333");
		$("#ongletpersonnalise").css("background-color","#444");
		$("#botstoplose").css("background-color","#444");
		$("#ongletmarket").css("height","78%");
		$("#ongletpersonnalise").css("height","71%");
		$("#botstoplose").css("height","71%");
		$("#ongletpersonnalise").css("color","white");
		$("#botstoplose").css("color","white");
		$("#divmarket").css("display","block");
		$("#divprixperso").css("display","none");
		$("#divprogrammation").css("display","none");
		$("#ongletrobot").css("background-color","#444");
		$("#ongletrobot").css("color","white");
		$("#divrobot").css("display","none");
		$("#ongletrobot").css("height","71%");


	});
	$("#ongletpersonnalise").click(function(){
		console.log("click");
		$("#ongletmarket").css("color","white");
		$("#ongletmarket").css("background-color","#444");
		$("#ongletpersonnalise").css("background-color","#333");
		$("#botstoplose").css("background-color","#444");
		$("#ongletmarket").css("height","71%");
		$("#ongletpersonnalise").css("height","78%");
		$("#botstoplose").css("height","71%");
		$("#ongletpersonnalise").css("color","#1D70B5");
		$("#botstoplose").css("color","white");
		$("#divmarket").css("display","none");
		$("#divprixperso").css("display","block");
		$("#divprogrammation").css("display","none");
		$("#ongletrobot").css("background-color","#444");
		$("#ongletrobot").css("color","white");
		$("#divrobot").css("display","none");
		$("#ongletrobot").css("height","71%");

	});
	$("#botstoplose").click(function(){
		console.log("click");
		$("#ongletmarket").css("color","white");
		$("#ongletmarket").css("background-color","#444");
		$("#ongletpersonnalise").css("background-color","#444");
		$("#botstoplose").css("background-color","#333");
		$("#ongletmarket").css("height","71%");
		$("#ongletpersonnalise").css("height","71%");
		$("#botstoplose").css("height","78%");
		$("#ongletpersonnalise").css("color","white");
		$("#botstoplose").css("color","#1D70B5");
		$("#divmarket").css("display","none");
		$("#divprixperso").css("display","none");
		$("#divprogrammation").css("display","block");
		$("#ongletrobot").css("background-color","#444");
		$("#ongletrobot").css("color","white");
		$("#divrobot").css("display","none");
		$("#ongletrobot").css("height","71%");
	});
	$("#ongletrobot").click(function(){
		console.log("click");
		$("#ongletmarket").css("color","white");
		$("#ongletmarket").css("background-color","#444");
		$("#ongletpersonnalise").css("background-color","#444");
		$("#botstoplose").css("background-color","#444");
		$("#ongletmarket").css("height","71%");
		$("#ongletpersonnalise").css("height","71%");
		$("#botstoplose").css("height","71%");
		$("#ongletpersonnalise").css("color","white");
		$("#botstoplose").css("color","white");
		$("#divmarket").css("display","none");
		$("#divprixperso").css("display","none");
		$("#divprogrammation").css("display","none");
		$("#ongletrobot").css("background-color","#333");
		$("#ongletrobot").css("color","#1D70B5");
		$("#divrobot").css("display","block");
		$("#ongletrobot").css("height","78%");
	});
	$('#refreshacc').click(function(){
		resfreshinfoaccount();
		rotate(1);
	});

	$("#Imputstartrobot").click(function(){
		$("#Imputstoprobot").prop("disabled", false);
		$("#Imputstartrobot").prop("disabled", true);
		StartRobot();
		robotInter=setInterval("StartRobot()",500);
	});

	$("#Imputstoprobot").click(function(){
		$("#Imputstoprobot").prop("disabled", true);
		$("#Imputstartrobot").prop("disabled", false);
		StopRobot();
	});

	$("#Imputstoprobot").prop("disabled", true);



	//appels des fonctions/ Main
	//Initialisation par défaut : USDT
	datejour();
	separationcurrencyselect();
	affichermarket();
	var intervalID = setInterval(datejour,1000);
	getInfoByDevise('USDT');
	interUSDT = setInterval("getInfoByDevise('USDT')", 30000);
	courbesgraph(currencyselect);
	getinfoaccount();
	setInterval(getinfomarketorder,500);
	getinfoorders();
	getinfohistorique();

});

function rotate(degree) {
	$("#refreshacc").css({
	'-webkit-transform': 'rotate(' + degree + 'deg)',
	'-moz-transform': 'rotate(' + degree + 'deg)',
	'-o-transform': 'rotate(' + degree + 'deg)',
	'-ms-transform': 'rotate(' + degree + 'deg)',
	'transform': 'rotate(' + degree + 'deg)'
	});
	//console.log(degree);
	if (degree < 180) {
		timer = setTimeout(function() {
    rotate(++degree)
	}, 1);
}}

//fonctions utilisant l'API
function getInfoByDevise(devise){
	var ourData;
	var ourResquest = new XMLHttpRequest();
	ourResquest.open('GET', 'http://localhost:8000/https://api.binance.com/api/v1/ticker/24hr');
	ourResquest.onload = function() {
		ourData =JSON.parse(ourResquest.responseText);

		ourData = ourData.filter(function(element){
			if(element.symbol.indexOf(devise ,element.symbol.length - devise.length) != -1)
			{
				return true;
			}
			else
			{
				return false;
			}
		});
		document.getElementById('table_USDT' ).innerHTML = "";
		document.getElementById('table_USDT' ).innerHTML += "<tr id='spetr'> <td> Symbole </td> <td> Prix </td> <td> Variation sur 24h </td> <td> 24h haut </td> <td> 24h bas </td> </tr>";
		for(var i =0 ; i< ourData.length; i++)
		{
			document.getElementById('table_USDT').innerHTML += "<tr class='tabclick'> <td>"+ourData[i].symbol+"</td> <td>"+ourData[i].bidPrice +"</td><td>"+ourData[i].priceChangePercent+"</td><td>"+ourData[i].highPrice+"</td><td>"+ourData[i].lowPrice+"</td></tr>"
		//onsole.log(ourData[i].symbol + "      " +"Prix : " + ourData[i].bidPrice + "      " + "Variation : " + ourData[i].priceChangePercent + "      " + "24 heure haut : " + ourData[i].highPrice + "      " + "24 heure bas : " + ourData[i].lowPrice );
		}
		$('.tabclick').click(function(){
			currencyselect = $(this.cells[0]).text();
			dejacharger = 0;
			separationcurrencyselect();
			document.getElementById('crypto').innerHTML ="";
			document.getElementById('crypto').innerHTML= currencyselect +"&#8693;";

			$("#containertable").animate({height:2},200);
				setTimeout(function(){
				$("#containertable").hide();
			}, 200);

			clicks--;

			if(typegraphactual == "candle"){
				candlestickgraph(currencyselect);
			}
			if(typegraphactual == "line") {
				courbesgraph(currencyselect);
			}
			if(typegraphactual == "ohlc") {
				ohlcgraph(currencyselect);
			}
			affichermarket();
		})

	}
	ourResquest.send();
}

function candlestickgraph(currency) {
	$("#chart").empty();
	var datagraph = [];
	var url = "http://localhost:8000/https://api.binance.com/api/v1/klines?symbol="+currency+"&interval="+timegraph+"&limit=500";
	if(dejacharger == 0) {
		$.get(url ,function(dps) {
			for (var i = 0; i < dps.length; i++) {
				datagraph[i] = [ new Date(dps[i][0]), parseFloat(dps[i][1]), parseFloat(dps[i][2]), parseFloat(dps[i][3]), parseFloat(dps[i][4])];

			};
			dejacharger = 1;
			console.log(dejacharger);
			datag = datagraph;

			anychart.onDocumentReady(function () {

				table = anychart.data.table();
				table.addData(datagraph);
				//map the data
				mapping =table.mapAs();
				mapping.addField('open',1);
				mapping.addField('high',2);
				mapping.addField('low',3);
				mapping.addField('close',4);
				//chart type
				var chart = anychart.stock();
				chart.background().fill("#444");

				//set the series

				var series = chart.plot(0).candlestick(mapping);
				series.normal().fallingFill("#EB4D5C", 1);
				series.name("Valeur du " + Monnaie_voulu +" "+ "en  " + Monnaie_echange );
				if(macd2) {
									// create MACD indicator with fast period 12, slow period 26 and signal period 9
				var secondPlot = chart.plot(1);
				var macd = secondPlot.macd(mapping, 12, 26, 9);
				macd.macdSeries().stroke('#bf360c');
				macd.signalSeries().stroke('#ff6d00');
				macd.histogramSeries().fill('#ffe082')

				secondPlot.height('30%');

				}
				if(scrolleron){
					chart.scroller().enabled(true);
				}
				else{
					chart.scroller().enabled(false);
				}

				chart.container("chart");
				chart.draw();
				typegraphactual ="candle";

			})

		});
	}
		else{
			console.log("c'est deja charger");
			anychart.onDocumentReady(function () {

				table = anychart.data.table();
				table.addData(datag);
				//map the data
				mapping =table.mapAs();
				mapping.addField('open',1);
				mapping.addField('high',2);
				mapping.addField('low',3);
				mapping.addField('close',4);
				//chart type
				var chart = anychart.stock();
				chart.background().fill("#444");

				//set the series

				var series = chart.plot(0).candlestick(mapping);
				if(macd2) {
									// create MACD indicator with fast period 12, slow period 26 and signal period 9
				var secondPlot = chart.plot(1);
				var macd = secondPlot.macd(mapping, 12, 26, 9);
				macd.macdSeries().stroke('#bf360c');
				macd.signalSeries().stroke('#ff6d00');
				macd.histogramSeries().fill('#ffe082')

				secondPlot.height('30%');

				}

				series.normal().fallingFill("#EB4D5C", 1);
				series.name("Valeur du " + Monnaie_voulu +" "+ "en  " + Monnaie_echange );
				if(scrolleron){
					chart.scroller().enabled(true);
				}
				else{
					chart.scroller().enabled(false);
				}
				chart.container("chart");
				chart.draw();
			})
		}
}

function ohlcgraph(currency) {
	$("#chart").empty();
	var datagraph = [];
	var url = "http://localhost:8000/https://api.binance.com/api/v1/klines?symbol="+currency+"&interval="+timegraph+"&limit=500";
	if(dejacharger == 0) {
		$.get(url ,function(dps) {
			for (var i = 0; i < dps.length; i++) {
				datagraph[i] = [ new Date(dps[i][0]), parseFloat(dps[i][1]), parseFloat(dps[i][2]), parseFloat(dps[i][3]), parseFloat(dps[i][4])];

			};
			dejacharger = 1;
			console.log(dejacharger);
			datag = datagraph;

			anychart.onDocumentReady(function () {

				table = anychart.data.table();
				table.addData(datagraph);
				//map the data
				mapping =table.mapAs();
				mapping.addField('open',1, 'first');
				mapping.addField('high',2, 'max');
				mapping.addField('low',3, 'min');
				mapping.addField('close',4, 'last');
				mapping.addField('value',4, 'close');
				//chart type
				var chart = anychart.stock();
				chart.background().fill("#444");

				//set the series

				var series = chart.plot(0).ohlc(mapping);
				series.normal().fallingFill("#EB4D5C", 1);
				series.name("Valeur du " + Monnaie_voulu +" "+ "en  " + Monnaie_echange );
				if(macd2) {
									// create MACD indicator with fast period 12, slow period 26 and signal period 9
				var secondPlot = chart.plot(1);
				var macd = secondPlot.macd(mapping, 12, 26, 9);
				macd.macdSeries().stroke('#bf360c');
				macd.signalSeries().stroke('#ff6d00');
				macd.histogramSeries().fill('#ffe082')

				secondPlot.height('30%');

				}

				if(scrolleron){
					chart.scroller().enabled(true);
				}
				else{
					chart.scroller().enabled(false);
				}
				chart.container("chart");
				chart.draw();
				typegraphactual ="ohlc";

			})

		});
	}
		else{
			console.log("c'est deja charger");
			anychart.onDocumentReady(function () {

				table = anychart.data.table();
				table.addData(datag);
				//map the data
				mapping =table.mapAs();
				mapping.addField('open',1, 'first');
				mapping.addField('high',2, 'max');
				mapping.addField('low',3, 'min');
				mapping.addField('close',4, 'last');
				mapping.addField('value',4, 'close');
				//chart type
				var chart = anychart.stock();
				chart.background().fill("#444");

				//set the series

				var series = chart.plot(0).ohlc(mapping);
				if(macd2) {
									// create MACD indicator with fast period 12, slow period 26 and signal period 9
				var secondPlot = chart.plot(1);
				var macd = secondPlot.macd(mapping, 12, 26, 9);
				macd.macdSeries().stroke('#bf360c');
				macd.signalSeries().stroke('#ff6d00');
				macd.histogramSeries().fill('#ffe082')

				secondPlot.height('30%');

				}

				series.normal().fallingFill("#EB4D5C", 1);
				series.name("Valeur du " + Monnaie_voulu +" "+ "en  " + Monnaie_echange );
				if(scrolleron){
					chart.scroller().enabled(true);
				}
				else{
					chart.scroller().enabled(false);
				}
				chart.container("chart");
				chart.draw();
			})
		}
}

function courbesgraph(currency) {

		$("#chart").empty();
		var datagraph = [];
		var url = "http://localhost:8000/https://api.binance.com/api/v1/klines?symbol="+currency+"&interval="+timegraph+"&limit=500";
		if(dejacharger == 0) {
			$.get(url ,function(dps) {
				for (var i = 0; i < dps.length; i++) {
					 datagraph[i] = [new Date(dps[i][0]), parseFloat(dps[i][4])]

				};
				dejacharger = 1;
				console.log(dejacharger);
				datag = datagraph;
				anychart.onDocumentReady(function () {

					table = anychart.data.table();
					table.addData(datagraph);
					//map the data
					mapping =table.mapAs();
					mapping.addField('value',1);
					//chart type
					var chart = anychart.stock();
					chart.background().fill("#444");

					//set the series

					var firstplot = chart.plot(0).line(mapping);
					//firstplot.normal().fallingFill("#EB4D5C", 1);
					firstplot.name("Valeur du " + Monnaie_voulu +" "+ "en  " + Monnaie_echange );

					if(macd2) {
										// create MACD indicator with fast period 12, slow period 26 and signal period 9
					var secondPlot = chart.plot(1);
					var macd = secondPlot.macd(mapping, 12, 26, 9);
					macd.macdSeries().stroke('#bf360c');
					macd.signalSeries().stroke('#ff6d00');
					macd.histogramSeries().fill('#ffe082')

					secondPlot.height('30%');

					}
					if(scrolleron){
						chart.scroller().enabled(true);
					}
					else{
						chart.scroller().enabled(false);
					}
					chart.container('chart');
					chart.draw();
					typegraphactual ="line";
				})


			});
		}
		else{
			console.log("deja charger !");
			anychart.onDocumentReady(function () {

				table = anychart.data.table();
				table.addData(datag);
				//map the data
				mapping =table.mapAs();
				mapping.addField('value',1);
				//chart type
				var chart = anychart.stock();
				chart.background().fill("#444");

				//set the series

				var firstplot = chart.plot(0).line(mapping);
				//firstplot.normal().fallingFill("#EB4D5C", 1);
				firstplot.name("Valeur du " + Monnaie_voulu +" "+ "en  " + Monnaie_echange );

				if(macd2) {
				// create MACD indicator with fast period 12, slow period 26 and signal period 9
				var secondPlot = chart.plot(1);
				var macd = secondPlot.macd(mapping, 12, 26, 9);
				macd.macdSeries().stroke('#bf360c');
				macd.signalSeries().stroke('#ff6d00');
				macd.histogramSeries().fill('#ffe082');
				console.log(macd.macdSeries());

				secondPlot.height('30%');

				}
				if(scrolleron){
					chart.scroller().enabled(true);
				}
				else{
					chart.scroller().enabled(false);
				}
				chart.container('chart');
				chart.draw();
				typegraphactual ="line";
			})
		}
}


function AchatMarket(){
	var regex = /^[0-9]+(.[0-9])?[0-9]*$/;
    var montant = $("#Imputmontant").val();
	var symbolecurrency = currencyselect;
	var side = "BUY" ;
	var type = "MARKET";
	var base_url = "http://localhost:8000/https://api.binance.com/api/v3/order?";
	
	
	var timestamp = Date.now()-3000;
	var recvWindow = 5000;
	var postmessage = "timestamp="+timestamp+"&recvWindow="+recvWindow+"&symbol="+symbolecurrency+"&side="+side+"&type="+type+"&quantity="+montant; //= totalParams uniquememnt du query car le body est vide
	console.log(postmessage);
	var signature = CryptoJS.HmacSHA256(postmessage,secretkey);
	var querystring = postmessage +"&signature=" + signature;
	var url = base_url + querystring;



    if((regex.test(montant) & (montant != 0)))
    {
		$.ajax({
	         url: url,
	         type: "POST",
	         beforeSend: function(xhr){xhr.setRequestHeader("X-MBX-APIKEY", apikey);},
	         success: function(data) {
	         		mydata =data;
	         		window.alert("vous avez acheté "+($("#prixmarchelabelvaleur").html()*montant)+"!");
	         		//console.log($("#prixmarchelabelvaleur").html());

	         },
	         error: function(err){
	         	if(err.responseJSON.code == "-2010"){

	         		window.alert("Fonds insuffisants !");
	         	}
	         	else{
	         		window.alert("Une erreur a eu lieu durant la mise en ligne de la transaction et n'a pas pu aboutir.");
	         	}
	         }
	     });



    }
    else {
    	window.alert("Erreur dans la saisie des champs.")
    }
}
function VenteMarket(){
	var regex = /^[0-9]+(.[0-9])?[0-9]*$/;
    var montant = $("#Imputmontant2").val();
	var symbolecurrency = currencyselect;
	var side = "SELL" ;
	var type = "MARKET";
	var base_url = "http://localhost:8000/https://api.binance.com/api/v3/order?";
	
	
	var timestamp = Date.now()-3000;
	var recvWindow = 5000;
	var postmessage = "timestamp="+timestamp+"&recvWindow="+recvWindow+"&symbol="+symbolecurrency+"&side="+side+"&type="+type+"&quantity="+montant; //= totalParams uniquememnt du query car le body est vide
	console.log(postmessage);
	var signature = CryptoJS.HmacSHA256(postmessage,secretkey);
	var querystring = postmessage +"&signature=" + signature;
	var url = base_url + querystring;



    if((regex.test(montant) & (montant != 0)))
    {
		$.ajax({
	         url: url,
	         type: "POST",
	         beforeSend: function(xhr){xhr.setRequestHeader("X-MBX-APIKEY", apikey);},
	         success: function(data) {
	         		mydata =data;
	         		window.alert("vous avez acheté "+($("#prixmarchelabelvaleur").html()*montant)+"!");
	         		//console.log($("#prixmarchelabelvaleur").html());

	         },
	         error: function(err){
	         	if(err.responseJSON.code == "-2010"){

	         		window.alert("Fonds insuffisants !");
	         	}
	         	else{
	         		window.alert("Une erreur a eu lieu durant la mise en ligne de la transaction et n'a pas pu aboutir.");
	         	}
	         }
	     });



    }
    else {
    	window.alert("Erreur dans la saisie des champs.")
    }
}

function Achatprixperso()
{
	var regex = /^[0-9]+(.[0-9])?[0-9]*$/;
    var montant = $("#Imputmontantperso").val();
    var prix =$("#Imputprixperso").val();
    console.log(prix);
    var timeInForce ="GTC";
	var symbolecurrency = currencyselect;
	var side = "BUY" ;
	var type = "LIMIT";
	var base_url = "http://localhost:8000/https://api.binance.com/api/v3/order?";
	
	
	var timestamp = Date.now()-3000;
	var recvWindow = 5000;
	var postmessage = "timestamp="+timestamp+"&timeInForce="+timeInForce+"&recvWindow="+recvWindow+"&symbol="+symbolecurrency+"&side="+side+"&type="+type+"&quantity="+montant+"&price="+prix; //= totalParams uniquememnt du query car le body est vide
	console.log(postmessage);
	var signature = CryptoJS.HmacSHA256(postmessage,secretkey);
	var querystring = postmessage +"&signature=" + signature;
	var url = base_url + querystring;


    if((regex.test(montant)) & (montant != 0) &(regex.test(prix)) & (prix != 0))
    {
		$.ajax({
	         url: url,
	         type: "POST",
	         beforeSend: function(xhr){xhr.setRequestHeader("X-MBX-APIKEY", apikey);},
	         success: function(data) {
					window.alert("vous avez envoyé un ordre d'achat d'un montant de  "+(prix*montant)+"!");

	         },
	         error: function(err){
	         	if(err.responseJSON.code == "-2010"){

	         		window.alert("Fonds insuffisants !");
	         	}
	         	else{
	         		window.alert("Une erreur a eu lieu durant la mise en ligne de la transaction et n'a pas pu aboutir.");
	         	}
	         }
	     });



    }
    else
    {
        window.alert("Erreur dans la saisie des champs.");
    }
}

function Venteprixperso()
{
	var regex = /^[0-9]+(.[0-9])?[0-9]*$/;
    var montant = $("#Imputmontantperso2").val();
    var prix =$("#Imputprixperso2").val();
    console.log(prix);
    var timeInForce ="GTC";
	var symbolecurrency = currencyselect;
	var side = "SELL" ;
	var type = "LIMIT";
	var base_url = "http://localhost:8000/https://api.binance.com/api/v3/order?";
	
	
	var timestamp = Date.now()-3000;
	var recvWindow = 5000;
	var postmessage = "timestamp="+timestamp+"&timeInForce="+timeInForce+"&recvWindow="+recvWindow+"&symbol="+symbolecurrency+"&side="+side+"&type="+type+"&quantity="+montant+"&price="+prix; //= totalParams uniquememnt du query car le body est vide
	console.log(postmessage);
	var signature = CryptoJS.HmacSHA256(postmessage,secretkey);
	var querystring = postmessage +"&signature=" + signature;
	var url = base_url + querystring;


    if((regex.test(montant)) & (montant != 0) &(regex.test(prix)) & (prix != 0))
    {
		$.ajax({
	         url: url,
	         type: "POST",
	         beforeSend: function(xhr){xhr.setRequestHeader("X-MBX-APIKEY", apikey);},
	         success: function(data) {
					window.alert("vous avez envoyé un ordre de vente d'un montant de "+(prix*montant)+"!");

	         },
	         error: function(err){
	         	if(err.responseJSON.code == "-2010"){

	         		window.alert("Fonds insuffisants !");
	         	}
	         	else{
	         		window.alert("Une erreur a eu lieu durant la mise en ligne de la transaction et n'a pas pu aboutir.");
	         	}
	         }
	     });



    }
    else
    {
        window.alert("Erreur dans la saisie des champs.");
    }
}

function Venteprogrammation(){
	var regex = /^[0-9]+(.[0-9])?[0-9]*$/;
	var montant = $("#Imputmontantprog2").val();
    var prix =$("#Imputprixprog2").val();
    var seuil = $("#Imputseuilprog2").val();

	    if((regex.test(montant)) & (montant != 0) &(regex.test(prix))&(prix !=0 ) &(regex.test(seuil)) & (seuil != 0))
	    {
	    	console.log($("#prixmarchelabelvaleur").html());
	    	if ((seuil < $("#prixmarchelabelvaleur").html())&(prix == "")) {
	    		console.log("seuil<prixmarchelabelvaleuret prix=marché");
			    var timeInForce ="GTC";
				var symbolecurrency = currencyselect;
				var side = "SELL" ;
				var type = "STOP_LOSS";
				var base_url = "http://localhost:8000/https://api.binance.com/api/v3/order?";
				
				
				var timestamp = Date.now()-3000;
				var recvWindow = 5000;
				var postmessage = "timestamp="+timestamp+"&timeInForce="+timeInForce+"&recvWindow="+recvWindow+"&symbol="+symbolecurrency+"&side="+side+"&type="+type+"&quantity="+montant+"&stopPrice="+seuil; //= totalParams uniquememnt du query car le body est vide
				console.log(postmessage);
				var signature = CryptoJS.HmacSHA256(postmessage,secretkey);
				var querystring = postmessage +"&signature=" + signature;
				var url = base_url + querystring;
				$.ajax({
		         url: url,
		         type: "POST",
		         beforeSend: function(xhr){xhr.setRequestHeader("X-MBX-APIKEY", apikey);},
		         success: function(data) {
						window.alert("vous avez programmé un ordre de vente d'un montant de "+(prix*montant)+"!");

		         },
		         error: function(err){
		         	if(err.responseJSON.code == "-2010"){

		         		window.alert("Fonds insuffisants !");
		         	}
		         	else{
		         		window.alert("Une erreur a eu lieu durant la mise en ligne de la transaction et n'a pas pu aboutir.");
		         	}
		         }
		    	});
	    	}
	    	if ((seuil < $("#prixmarchelabelvaleur").html())&(prix != "")) {
 				 var timeInForce ="GTC";
 				console.log("seuil<prixmarchelabelvaleuret prix=XXX");
				var symbolecurrency = currencyselect;
				var side = "SELL" ;
				var type = "STOP_LOSS_LIMIT";
				var base_url = "http://localhost:8000/https://api.binance.com/api/v3/order?";
				
				
				var timestamp = Date.now()-3000;
				var recvWindow = 5000;
				var postmessage = "timestamp="+timestamp+"&timeInForce="+timeInForce+"&recvWindow="+recvWindow+"&symbol="+symbolecurrency+"&side="+side+"&type="+type+"&price="+prix+"&quantity="+montant+"&stopPrice="+seuil; //= totalParams uniquememnt du query car le body est vide
				console.log(postmessage);
				var signature = CryptoJS.HmacSHA256(postmessage,secretkey);
				var querystring = postmessage +"&signature=" + signature;
				var url = base_url + querystring;
				$.ajax({
		         url: url,
		         type: "POST",
		         beforeSend: function(xhr){xhr.setRequestHeader("X-MBX-APIKEY", apikey);},
		         success: function(data) {
						window.alert("vous avez programmé un ordre de vente d'un montant de "+(prix*montant)+"!");

		         },
		         error: function(err){
		         	if(err.responseJSON.code == "-2010"){

		         		window.alert("Fonds insuffisants !");
		         	}
		         	else{
		         		window.alert("Une erreur a eu lieu durant la mise en ligne de la transaction et n'a pas pu aboutir.");
		         	}
		         }
		     	});
		    }
			if ((seuil > $("#prixmarchelabelvaleur").html())&(prix == "")) {
			    var timeInForce ="GTC";
				var symbolecurrency = currencyselect;
				var side = "SELL" ;
				var type = "TAKE_PROFIT";
				var base_url = "http://localhost:8000/https://api.binance.com/api/v3/order?";
				
				
				var timestamp = Date.now()-3000;
				var recvWindow = 5000;
				var postmessage = "timestamp="+timestamp+"&timeInForce="+timeInForce+"&recvWindow="+recvWindow+"&symbol="+symbolecurrency+"&side="+side+"&type="+type+"&quantity="+montant+"&stopPrice="+seuil; //= totalParams uniquememnt du query car le body est vide
				console.log(postmessage);
				var signature = CryptoJS.HmacSHA256(postmessage,secretkey);
				var querystring = postmessage +"&signature=" + signature;
				var url = base_url + querystring;
				$.ajax({
		         url: url,
		         type: "POST",
		         beforeSend: function(xhr){xhr.setRequestHeader("X-MBX-APIKEY", apikey);},
		         success: function(data) {
						window.alert("vous avez programmé un ordre de vente d'un montant de "+(prix*montant)+"!");

		         },
		         error: function(err){
		         	if(err.responseJSON.code == "-2010"){

		         		window.alert("Fonds insuffisants !");
		         	}
		         	else{
		         		window.alert("Une erreur a eu lieu durant la mise en ligne de la transaction et n'a pas pu aboutir.");
		         	}
		         }
		    	});
	    	}
	    	if ((seuil > $("#prixmarchelabelvaleur").html())&(prix != "")) {
 			    var timeInForce ="GTC";
				var symbolecurrency = currencyselect;
				var side = "SELL" ;
				var type = "TAKE_PROFIT_LIMIT";
				var base_url = "http://localhost:8000/https://api.binance.com/api/v3/order?";
				
				
				var timestamp = Date.now()-3000;
				var recvWindow = 5000;
				var postmessage = "timestamp="+timestamp+"&timeInForce="+timeInForce+"&recvWindow="+recvWindow+"&symbol="+symbolecurrency+"&side="+side+"&type="+type+"&price="+prix+"&quantity="+montant+"&stopPrice="+seuil; //= totalParams uniquememnt du query car le body est vide
				console.log(postmessage);
				var signature = CryptoJS.HmacSHA256(postmessage,secretkey);
				var querystring = postmessage +"&signature=" + signature;
				var url = base_url + querystring;
				$.ajax({
		         url: url,
		         type: "POST",
		         beforeSend: function(xhr){xhr.setRequestHeader("X-MBX-APIKEY", apikey);},
		         success: function(data) {
						window.alert("vous avez programmé un ordre de vente d'un montant de "+(prix*montant)+"!");

		         },
		         error: function(err){
		         	if(err.responseJSON.code == "-2010"){

		         		window.alert("Fonds insuffisants !");
		         	}
		         	else{
		         		window.alert("Une erreur a eu lieu durant la mise en ligne de la transaction et n'a pas pu aboutir.");
		         	}
		         }
		     	});
		    }
	    }
	   	else
	    {
	       window.alert("Erreur dans la saisie des champs.");
	    }


}

function Achatprogrammation(){
	var regex = /^[0-9]+(.[0-9])?[0-9]*$/;
	var montant = $("#Imputmontantprog").val();
    var prix =$("#Imputprixprog").val();
    var seuil = $("#Imputseuilprog").val();
    	console.log("ca marche");

	    if((regex.test(montant)) & (montant != 0) &(regex.test(prix))&(prix !=0 ) &(regex.test(seuil)) & (seuil != 0))
	    {
	    	if ((seuil < $("#prixmarchelabelvaleur").html())&(prix == "")) {
			    var timeInForce ="GTC";
				var symbolecurrency = currencyselect;
				var side = "BUY" ;
				var type = "TAKE_PROFIT";
				var base_url = "http://localhost:8000/https://api.binance.com/api/v3/order?";
				
				
				var timestamp = Date.now()-3000;
				var recvWindow = 5000;
				var postmessage = "timestamp="+timestamp+"&timeInForce="+timeInForce+"&recvWindow="+recvWindow+"&symbol="+symbolecurrency+"&side="+side+"&type="+type+"&quantity="+montant+"&stopPrice="+seuil; //= totalParams uniquememnt du query car le body est vide
				console.log(postmessage);
				var signature = CryptoJS.HmacSHA256(postmessage,secretkey);
				var querystring = postmessage +"&signature=" + signature;
				var url = base_url + querystring;
				$.ajax({
		         url: url,
		         type: "POST",
		         beforeSend: function(xhr){xhr.setRequestHeader("X-MBX-APIKEY", apikey);},
		         success: function(data) {
						window.alert("vous avez programmé un ordre de vente d'un montant de "+(prix*montant)+"!");

		         },
		         error: function(err){
		         	if(err.responseJSON.code == "-2010"){

		         		window.alert("Fonds insuffisants !");
		         	}
		         	else{
		         		window.alert("Une erreur a eu lieu durant la mise en ligne de la transaction et n'a pas pu aboutir.");
		         	}
		         }
		    	});
	    	}
	    	if ((seuil < $("#prixmarchelabelvaleur").html())&(prix != "")) {
 				var timeInForce ="GTC";
				var symbolecurrency = currencyselect;
				var side = "BUY" ;
				var type = "TAKE_PROFIT_LIMIT";
				var base_url = "http://localhost:8000/https://api.binance.com/api/v3/order?";
				
				
				var timestamp = Date.now()-3000;
				var recvWindow = 5000;
				var postmessage = "timestamp="+timestamp+"&timeInForce="+timeInForce+"&recvWindow="+recvWindow+"&symbol="+symbolecurrency+"&side="+side+"&type="+type+"&price="+prix+"&quantity="+montant+"&stopPrice="+seuil; //= totalParams uniquememnt du query car le body est vide
				console.log(postmessage);
				var signature = CryptoJS.HmacSHA256(postmessage,secretkey);
				var querystring = postmessage +"&signature=" + signature;
				var url = base_url + querystring;
				$.ajax({
		         url: url,
		         type: "POST",
		         beforeSend: function(xhr){xhr.setRequestHeader("X-MBX-APIKEY", apikey);},
		         success: function(data) {
						window.alert("vous avez programmé un ordre de vente d'un montant de "+(prix*montant)+"!");

		         },
		         error: function(err){
		         	if(err.responseJSON.code == "-2010"){

		         		window.alert("Fonds insuffisants !");
		         	}
		         	else{
		         		window.alert("Une erreur a eu lieu durant la mise en ligne de la transaction et n'a pas pu aboutir.");
		         	}
		         }
		     	});
		    }
			if ((seuil > $("#prixmarchelabelvaleur").html())&(prix == "")) {
			    var timeInForce ="GTC";
				var symbolecurrency = currencyselect;
				var side = "BUY" ;
				var type = "STOP_LOSS";
				var base_url = "http://localhost:8000/https://api.binance.com/api/v3/order?";
				
				
				var timestamp = Date.now()-3000;
				var recvWindow = 5000;
				var postmessage = "timestamp="+timestamp+"&timeInForce="+timeInForce+"&recvWindow="+recvWindow+"&symbol="+symbolecurrency+"&side="+side+"&type="+type+"&quantity="+montant+"&stopPrice="+seuil; //= totalParams uniquememnt du query car le body est vide
				console.log(postmessage);
				var signature = CryptoJS.HmacSHA256(postmessage,secretkey);
				var querystring = postmessage +"&signature=" + signature;
				var url = base_url + querystring;
				$.ajax({
		         url: url,
		         type: "POST",
		         beforeSend: function(xhr){xhr.setRequestHeader("X-MBX-APIKEY", apikey);},
		         success: function(data) {
						window.alert("vous avez programmé un ordre de vente d'un montant de "+(prix*montant)+"!");

		         },
		         error: function(err){
		         	if(err.responseJSON.code == "-2010"){

		         		window.alert("Fonds insuffisants !");
		         	}
		         	else{
		         		window.alert("Une erreur a eu lieu durant la mise en ligne de la transaction et n'a pas pu aboutir.");
		         	}
		         }
		    	});
	    	}
	    	if ((seuil > $("#prixmarchelabelvaleur").html())&(prix != "")) {
 			    var timeInForce ="GTC";
				var symbolecurrency = currencyselect;
				var side = "BUY" ;
				var type = "STOP_LOSS_LIMIT";
				var base_url = "http://localhost:8000/https://api.binance.com/api/v3/order?";
				
				
				var timestamp = Date.now()-3000;
				var recvWindow = 5000;
				var postmessage = "timestamp="+timestamp+"&timeInForce="+timeInForce+"&recvWindow="+recvWindow+"&symbol="+symbolecurrency+"&side="+side+"&type="+type+"&price="+prix+"&quantity="+montant+"&stopPrice="+seuil; //= totalParams uniquememnt du query car le body est vide
				console.log(postmessage);
				var signature = CryptoJS.HmacSHA256(postmessage,secretkey);
				var querystring = postmessage +"&signature=" + signature;
				var url = base_url + querystring;
				$.ajax({
		         url: url,
		         type: "POST",
		         beforeSend: function(xhr){xhr.setRequestHeader("X-MBX-APIKEY", apikey);},
		         success: function(data) {
						window.alert("vous avez programmé un ordre de vente d'un montant de "+(prix*montant)+"!");

		         },
		         error: function(err){
		         	if(err.responseJSON.code == "-2010"){

		         		window.alert("Fonds insuffisants !");
		         	}
		         	else{
		         		window.alert("Une erreur a eu lieu durant la mise en ligne de la transaction et n'a pas pu aboutir.");
		         	}
		         }
		     	});
		    }
	    }
	    else
	    {
	        window.alert("Erreur dans la saisie des champs.");
	    }


}


function getinfoaccount() {
	var soldetotal;
	var base_url = "http://localhost:8000/https://api.binance.com/api/v3/account?";
	
	
	var timestamp = Date.now()-3000;
	var recvWindow = 5000;
	var postmessage = "timestamp="+timestamp+"&recvWindow="+recvWindow; //= totalParams uniquememnt du query car le body est vide
	var signature = CryptoJS.HmacSHA256(postmessage,secretkey);
	var querystring = postmessage +"&signature=" + signature;
	var url = base_url + querystring;
	var mydata;
	$.ajax({
         url: url,
         type: "GET",
         beforeSend: function(xhr){xhr.setRequestHeader("X-MBX-APIKEY", apikey);},
         success: function(data) {
         	mydata =data;

         	console.log(mydata.balances);
         	for(var i=0; i<mydata.balances.length;i++) {
        		soldetotal = parseFloat(mydata.balances[i].free) +parseFloat( mydata.balances[i].locked);
        		document.getElementById('table_info').innerHTML += "<tr> <td>"+mydata.balances[i].asset+"</td> <td>"+mydata.balances[i].free+"</td><td>"+mydata.balances[i].locked+"</td><td>"+soldetotal+"</td></tr>"
        		sorttable.makeSortable(document.getElementById('table_info'));

			}
         }
     });
	document.getElementById('table_info' ).innerHTML = "";
	document.getElementById('table_info' ).innerHTML += "<tr id='spetr'> <td> Monnaies</td> <td> Solde disponible</td> <td>Solde bloqué</td>  <td> Solde Total</td></tr>";
}

function getinfoorders() {
	var soldetotal;
	var base_url = "http://localhost:8000/https://api.binance.com/api/v3/openOrders?";
	
	
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

function getinfomarketorder(){
	var base_url = "http://localhost:8000/https://api.binance.com/api/v1/trades?";
	var postmessage="symbol="+currencyselect+"&limit=50";
	var url= base_url+postmessage;
	$.ajax({
         url: url,
         type: "GET",
         //beforeSend: function(xhr){xhr.setRequestHeader("X-MBX-APIKEY", apikey);},
         success: function(data) {
         	var mydata =data;
         	document.getElementById('table_market' ).innerHTML = "";
			document.getElementById('table_market' ).innerHTML += "<tr id='spetr2'> <td>"+"Prix("+Monnaie_echange+")"+"</td>"+"<td>"+"Montant("+Monnaie_voulu+")"+"</td>"+"<td>Type</td>"+"<td>Total("+Monnaie_echange+")"+"</td><td>Date</td></tr>";


         	$("#prixmarchelabelvaleur").html(mydata[mydata.length-1].price);
         	for(var i=mydata.length-1; i>0;i--) {
        		var total=(mydata[i].price)*(mydata[i].qty);
        		var dateordre =new Date(mydata[i].time)
        		var heure = dateordre.getHours();
				var minute = dateordre.getMinutes();
				var second = dateordre.getSeconds();
        		if(mydata[i].isBuyerMaker == true){
        			document.getElementById('table_market').innerHTML += "<tr > <td>"+mydata[i].price+"</td> <td>"+mydata[i].qty+"</td><td class='Vente'>"+"Vente"+"</td><td>"+total+"</td><td>"+ (heure<10 ? '0' : '') + heure + ':' + (minute<10 ? '0' : '') + minute + ':' + (second<10 ? '0' : '') + second +"</td></tr>"
        			sorttable.makeSortable(document.getElementById('table_market'));
        		}
        		else{
        			document.getElementById('table_market').innerHTML += "<tr > <td>"+mydata[i].price+"</td> <td>"+mydata[i].qty+"</td><td class='Achat'>"+"Achat"+"</td><td>"+total+"</td><td>"+ (heure<10 ? '0' : '') + heure + ':' + (minute<10 ? '0' : '') + minute + ':' + (second<10 ? '0' : '') + second +"</td></tr>"
        		}

			}
         }
     });
	}

//fonction utile/ pas de rapport avec l'api
function datejour() {
  		var d = new Date();

		var month = d.getMonth()+1;
		var day = d.getDate();
		var heure = d.getHours();
		var minute = d.getMinutes();
		var second = d.getSeconds();

		var today = d.getFullYear() + '-' +
    	(month<10 ? '0' : '') + month + '-' +
    	(day<10 ? '0' : '') + day + ' ' + (heure<10 ? '0' : '') + heure + ':' + (minute<10 ? '0' : '') + minute + ':' + (second<10 ? '0' : '') + second;
    	$("#heure").empty().append(today);
}

function affichermarket() {
	document.getElementById('achetermonnaie').innerHTML = " ";
	document.getElementById('achetermonnaie').innerHTML = "Acheter " + Monnaie_voulu +"              en "+ Monnaie_echange ;
	document.getElementById('vendremonnaie').innerHTML = " ";
	document.getElementById('vendremonnaie').innerHTML = "Vendre " + Monnaie_voulu +"              en "+ Monnaie_echange ;
	document.getElementById('achetermonnaieprog').innerHTML = " ";
	document.getElementById('achetermonnaieprog').innerHTML = "Acheter " + Monnaie_voulu +"              en "+ Monnaie_echange ;
	document.getElementById('vendremonnaieprog').innerHTML = " ";
	document.getElementById('vendremonnaieprog').innerHTML = "Vendre " + Monnaie_voulu +"              en "+ Monnaie_echange ;
	document.getElementById('achetermonnaieperso').innerHTML = " ";
	document.getElementById('achetermonnaieperso').innerHTML = "Acheter " + Monnaie_voulu +"              en "+ Monnaie_echange ;
	document.getElementById('vendremonnaieperso').innerHTML = " ";
	document.getElementById('vendremonnaieperso').innerHTML = "Vendre " + Monnaie_voulu +"              en "+ Monnaie_echange ;
}

function separationcurrencyselect() {
	//USDTBTC
	if (currencyselect.indexOf("USDT",2) !=-1){
		var index = currencyselect.indexOf("USDT",2);
		Monnaie_echange = currencyselect.slice(index, currencyselect.length);
		Monnaie_voulu = currencyselect.slice(0, index);
		console.log(Monnaie_echange);
		console.log(Monnaie_voulu);
	}
	if (currencyselect.indexOf("BTC",2) !=-1){
		var index = currencyselect.indexOf("BTC",2);
		Monnaie_echange = currencyselect.slice(index, currencyselect.length);
		Monnaie_voulu = currencyselect.slice(0, index);
		console.log(Monnaie_echange);
		console.log(Monnaie_voulu);
	}
	if (currencyselect.indexOf("ETH",2) !=-1){
		var index = currencyselect.indexOf("ETH",2);
		Monnaie_echange = currencyselect.slice(index, currencyselect.length);
		Monnaie_voulu = currencyselect.slice(0, index);
		console.log(Monnaie_echange);
		console.log(Monnaie_voulu);
	}
	if (currencyselect.indexOf("BNB",2) !=-1){
		var index = currencyselect.indexOf("BNB",2);
		Monnaie_echange = currencyselect.slice(index, currencyselect.length);
		Monnaie_voulu = currencyselect.slice(0, index);
		console.log(Monnaie_echange);
		console.log(Monnaie_voulu);
	}
}

function resfreshinfoaccount(){//bouton refresh des informations du compte //à completer
	console.log("coucou");
	if(ongletinfoselected == "fond"){
		getinfoaccount();
	};
	if(ongletinfoselected == "Ordresouverts"){

	};
	if(ongletinfoselected =="Ordreprog"){

	};
}

function StartRobot(){

	if(LastVolume == null && LastPrice == null)
	{
		var url = "http://localhost:8000/https://api.binance.com/api/v1/klines?symbol="+currencyselect+"&interval=1m"+"&limit=2";
		robotEtat = "init";
	}
	else
	{
		var url = "http://localhost:8000/https://api.binance.com/api/v1/klines?symbol="+currencyselect+"&interval=1m"+"&limit=1";
		robotEtat = "calcul";
	}

	var Price;
	var Volume;
	var tendance ;


	$.get(url ,function(data) {

		if(robotEtat == "init")
		{
			LastPrice = parseFloat(data[0][4]);
			LastVolume = parseFloat(data[0][5]);
			Price = parseFloat(data[1][4]);
			Volume= parseFloat(data[1][5]);
		}
		else
		{
			Price = parseFloat(data[0][4]);
			Volume= parseFloat(data[0][5]);
		}



		if(LastPrice < Price)
		{
			if(LastVolume < Volume)
			{
				tendance = "acheter";
				//console.log("Prix = "+Price[i]+" & LastPrice = "+LastPrice +" ***** Volume = "+Volume[i] + " & LastVolume = "+LastVolume+" ******Tendance = "+ tendance);
			}
			else
			{
				tendance = "vendre";
				//console.log("Prix = "+Price[i]+" & LastPrice = "+LastPrice +" ***** Volume = "+Volume[i] + " & LastVolume = "+LastVolume+" ******Tendance = "+ tendance);
			}
		}
		else
		{
			if(LastVolume < Volume)
			{
				tendance = "vendre";
				//console.log("Prix = "+Price[i]+" & LastPrice = "+LastPrice +" ***** Volume = "+Volume[i] + " & LastVolume = "+LastVolume+" ******Tendance = "+ tendance);
			}
			else
			{
				tendance = "acheter";
				//console.log("Prix = "+Price[i]+" & LastPrice = "+LastPrice +" ***** Volume = "+Volume[i] + " & LastVolume = "+LastVolume+" ******Tendance = "+ tendance);
			}
		}
		LastPrice = Price;
		LastVolume = Volume;

		//console.log(tendance);

		if(tendance == "acheter")
		{
			if(robotAchat && robotEtat != "stop")
			{
				robotCurrency = robotCurrency + (robotMonney / $("#prixmarchelabelvaleur").html());
				robotMonney = 0;
				robotAchat = false;
				robotVente = true;

				console.log("**************");
				console.log("TYPE = ACHAT ------- MONTANT_CRYPTO = " + robotCurrency);
				console.log("**************");
			}
		}
		if(tendance == "vendre" && robotEtat != "stop")
		{
			if(robotVente)
			{
				robotMonney = robotMonney + (robotCurrency * $("#prixmarchelabelvaleur").html());
				robotCurrency = 0;
				robotVente = false;
				robotAchat = true;
				console.log("**************");
				console.log("Type = VENTE ------- MONTANT_ARGENT = " + robotMonney);
				console.log("**************");
			}
		}

	});
}



function StopRobot(){

	clearInterval(robotInter);
	robotEtat = "stop";
	LastVolume = null;
	LastPrice = null;
	console.log("**************");
	console.log("RESUME DE SIMULATION");
	console.log("MONTANT_ARGENT = " + robotMonney);
	console.log("MONTANT_CRYPTO = " + robotCurrency);
	console.log("**************");

}



function StartRobotOld(){
	var url = "http://localhost:8000/https://api.binance.com/api/v1/klines?symbol="+currencyselect+"&interval=5m"+"&limit=1";
	var Price = new Array;
	var Volume = new Array;
	var LastPrice;
	var LastVolume;
	var tendance ;


	$.get(url ,function(data) {
		var y =0;
		for( i=0; i<data.length; i++ )
		{
			Price[i] = parseFloat(data[i][4]);
			Volume[i] = parseFloat(data[i][5]);
			y++
			//console.log("Prix = "+data[i][4]+" & Volume = "+data[i][5]);
		}

		LastVolume = Volume[0];
		LastPrice = Price[0];

		for(i=1 ; i<Price.length - 1; i++)
		{
			console.log("test1");
			if(LastPrice < Price[i])
			{
				if(LastVolume < Volume[i])
				{
					tendance = "acheter";
					//console.log("Prix = "+Price[i]+" & LastPrice = "+LastPrice +" ***** Volume = "+Volume[i] + " & LastVolume = "+LastVolume+" ******Tendance = "+ tendance);
				}
				else
				{
					tendance = "vendre";
					//console.log("Prix = "+Price[i]+" & LastPrice = "+LastPrice +" ***** Volume = "+Volume[i] + " & LastVolume = "+LastVolume+" ******Tendance = "+ tendance);
				}
			}
			else
			{
				if(LastVolume < Volume[i])
				{
					tendance = "vendre";
					//console.log("Prix = "+Price[i]+" & LastPrice = "+LastPrice +" ***** Volume = "+Volume[i] + " & LastVolume = "+LastVolume+" ******Tendance = "+ tendance);
				}
				else
				{
					tendance = "acheter";
					//console.log("Prix = "+Price[i]+" & LastPrice = "+LastPrice +" ***** Volume = "+Volume[i] + " & LastVolume = "+LastVolume+" ******Tendance = "+ tendance);
				}
			}
			LastPrice = Price[i];
			LastVolume = Volume[i];
		}
		//console.log(tendance);

		if(tendance == "acheter")
		{
			if(robotAchat)
			{
				robotCurrency = robotCurrency + (robotMonney / $("#prixmarchelabelvaleur").html());
				robotMonney = 0;
				robotAchat = false;
				robotVente = true;

				console.log("**************");
				console.log("TYPE = ACHAT ------- MONTANT_CRYPTO = " + robotCurrency);
				console.log("**************");
			}
		}
		if(tendance == "vendre")
		{
			if(robotVente)
			{
				robotMonney = robotMonney + (robotCurrency * $("#prixmarchelabelvaleur").html());
				robotCurrency = 0;
				robotVente = false;
				robotAchat = true;
				console.log("**************");
				console.log("Type = VENTE ------- MONTANT_ARGENT = " + robotMonney);
				console.log("**************");
			}
		}

	});
}
