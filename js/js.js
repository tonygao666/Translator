//关键字段
var q = '我';
var fromL = 'zh';
var toL = 'en';
var appid = '20170105000035330' ;
var salt = '1435660289';
var my = 'r7FwVoXnnNfT5VJIwcbb';


$('#btn').click(function(){
	q = $('#from_txt').val();
	if(q == ''){
		alert('请输入你要翻译的语句');
		return;
	}else{
		doTranslate();
	}
});

function doTranslate(){
	
	//未加密签名字符串
	var str = appid+q+salt+my;

	//将字符串加密成签名
	var sign = MD5(str);

	//将关键字段拼接成JSON
	var sendJson = {
		q:q,
		from:fromL,
		to:toL,
		appid:appid,
		salt:salt,
		sign:sign
	}

	$.ajax({
		type: "POST",
		url: "https://fanyi-api.baidu.com/api/trans/vip/translate",
		data: sendJson,
		dataType:'jsonp',
		success: function(data){
			console.log(data['trans_result'][0]['dst']);
			$('#to_txt').text(data['trans_result'][0]['dst']);
		}
	});
}