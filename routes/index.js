
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

var ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/534.57.2 (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2';

var fromCountry = 'United States';



request({
        url : xoomURL,
        headers : {
            "User-Agent" : ua
        }
    }, function(err, resp, body) 
							{
							        if (err)
							            throw err;

									 $ = cheerio.load(body);
	
									xoomText=$('.xcma-fx-rate').text();
									xoomText=xoomText.replace("Current locked-in exchange rate*","");
					
							});

var remit2IndiaURL = 'https://www.remit2india.com/sendmoneytoindia/UnitedStates/index.jsp';
request({
        url : remit2IndiaURL,
        headers : {
            "User-Agent" : ua
        }
    }, function(err, resp, body) 
								{
								        if (err)
								            throw err;

										 $ = cheerio.load(body);
		//console.log($.html())
										
										remit2IndiaText=$('.exRate').text()+" INR";
										


									
});


var money2IndiaURL = 'https://m2inet.icicibank.co.in/m2iNet/m2iNetLoginForm.jsp?site=m2ilogin'
request({
        url : money2IndiaURL,
        headers : {
            "User-Agent" : ua
        }
    }, function(err, resp, body) 
								{
								        if (err)
								            throw err;

										 $ = cheerio.load(body);
		
										money2IndiaText='1 USD ='+$('.bigfon').text();
										
 //money2IndiaText=money2IndiaText.replace("USA","1 USD");
						
								});
var axisRemitURL = 'https://axisremit.axisbank.co.in/remittance/showExchangeRates.action';
request.post({
        url : axisRemitURL,
        headers : {
            "User-Agent" : ua,
            "content-type": 'application/x-www-form-urlencoded' 
        },
        body: require('querystring').stringify(fromCountry)
    }, function(err, resp, body) 
								{
								        if (err)
								            throw err;

										 $ = cheerio.load(body);
		
		console.log($.html())
		
										// 	$('#dispExchangeRate').each(function() {
										//     $(this).find('td').each(function(index) {

										//     axisRemitText[index]=$(this).text();
										//         // console.log('index_'+index+" is "+axisRemitText[index]);
										//     });
										// });
						

								});

exports.index = function(req, res){
  res.render('index', { XoomText: xoomText, remit2IndiaText: remit2IndiaText, money2IndiaText:money2IndiaText, axisRemitText: axisRemitText  });
};