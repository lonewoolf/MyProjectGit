
/*
 * GET home page.
 */
var xoomText="LOADING....";
var remit2IndiaText="LOADING....";
var money2IndiaText="LOADING....";
var axisRemitNewText;
var xoomURL = 'https://www.xoom.com/india';
var axisRemitText=new Array();
var cheerio = require('cheerio');
var request = require('request');
request(xoomURL, function(err, resp, body) 
							{
							        if (err)
							            throw err;

									 $ = cheerio.load(body);
	
									xoomText=$('#top p').text();
									xoomText=xoomText.replace("Current locked-in exchange rate*","");
					
							});

var remit2IndiaURL = 'https://www.remit2india.com/sendmoneytoindia/UnitedStates/index.jsp';
request(remit2IndiaURL, function(err, resp, body) 
								{
								        if (err)
								            throw err;

										 $ = cheerio.load(body);
		//console.log($.html())
										
										remit2IndiaText=$('.exRate').text()+" INR";


									
});


var money2IndiaURL = 'http://www.icicibank.com/nri-banking/money_transfer/exchange-rate/iframe_exchange_rate.html'
request(money2IndiaURL, function(err, resp, body) 
								{
								        if (err)
								            throw err;

										 $ = cheerio.load(body);
		
										money2IndiaText=$('body marquee strong').text();
										
 money2IndiaText=money2IndiaText.replace("USA","1 USD");
						
								});
var axisRemitURL = 'http://www.timesofmoney.com/remittance/axisremit/secure/axisremitExchangeRate.jsp?partnerId=AXISREMIT&uiId=AXISREMIT&defaultMenu=exchangeRate';
request(axisRemitURL, function(err, resp, body) 
								{
								        if (err)
								            throw err;

										 $ = cheerio.load(body);
		
											$('#dispExchangeRate').each(function() {
										    $(this).find('td').each(function(index) {

										    axisRemitText[index]=$(this).text();
										        // console.log('index_'+index+" is "+axisRemitText[index]);
										    });
										});
						

								});

exports.index = function(req, res){
  res.render('index', { XoomText: xoomText, remit2IndiaText: remit2IndiaText, money2IndiaText:money2IndiaText, axisRemitText: axisRemitText  });
};