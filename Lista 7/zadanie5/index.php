<!DOCTYPE html
PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	<title>Autouzupełnianie</title>
	<style>
		body{width:610px;}
		.frmSearch {border: 1px solid #F0F0F0;background-color:#C8EEFD;margin: 2px 0px;padding:40px;}
		#names-list{float:left;list-style:none;margin:0;padding:0;width:190px;}
		#names-list li{padding: 10px; background:#FAFAFA;border-bottom:#F0F0F0 1px solid;}
		#names-list li:hover{background:#F0F0F0;}
		#search-box{padding: 10px;border: #F0F0F0 1px solid;}
	</style>
	<script src="https://code.jquery.com/jquery-2.1.1.min.js" type="text/javascript"></script>
	<script>
	$(document).ready(function(){
		$("#search-box").keyup(function(){
			$.ajax({
			type: "POST",
			url: "readName.php",
			data:'keyword='+$(this).val(),
			beforeSend: function(){
				$("#search-box").css("background","#FFF url(LoaderIcon.gif) no-repeat 165px");
			},
			success: function(data){
				$("#suggesstion-box").show();
				$("#suggesstion-box").html(data);
				$("#search-box").css("background","#FFF");
			}
			});
		});
	});

	function selectName(val) {
	$("#search-box").val(val);
	$("#suggesstion-box").hide();
	}
	</script>
</head>
<body>
<div class="frmSearch">
<input type="text" id="search-box" placeholder="Imię" />
<div id="suggesstion-box"></div>
</div>
</body>
</html>