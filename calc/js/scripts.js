$(function(){

/* modal wondow */
$(document).on('click','.box-modal', function(event)
{

		$this=$(this);
		$('.cwrap').remove();
		//$('#main').addClass('grey');
		var style=$this.data('style');
		var url=$this.attr('href');
		var datahref=$this.data('href');
		//var active=$this.data('active');
		$('.cwrap').animate({'opacity':'0'},200).remove();
		if (datahref==undefined)
		{
			closeval="<div class='close'>Close</div>";

		}
		else
		{
			closeval="<a href='/"+datahref+"' class='close'></a>";
		}
			if (style==undefined)
				{
				style='';
				}

			if (url==undefined)
				{
				var block=$this.attr('rel');
				var inner=$('#'+block).html();
				var inner_size=$this.data('width');
				}
			else
				{
				var inner='';
				var inner_size=$this.data('width');
				}

			var html="<div class='cwrap' style='opacity:0;'  >"+
			"<div class='modal_block animated fadeInDown ui-widget-content "+style+"' id='draggable' style='width:"+inner_size+"px; '>"+closeval+
			"<div class='inset ajax_modal'>"+
			inner+
			"</div>"+
			"</div>"+
			"</div>";
			$('body').prepend(html);
			if (url!=undefined)
				{
						$('.cwrap').delay(1000).css({'opacity':'1','filter':'alpha(opacity=100)'});
						$(".modal_block > .inner").load(url,function() {
						});
				}
			else {
					$('.cwrap').delay(1000).css({'opacity':'1','filter':'alpha(opacity=100)'});
				}
			$( "#draggable" ).draggable({cursor: "move", handle: ".title"});

			$( "#drag" ).draggable({cursor: "e-resize", axis: "x" ,containment: "parent", drag: function(event, ui)
				{

						var plan=$('.calculate-select').val();
						var data = sw(plan);
						var c=ui.position.left;
						console.clear();
			 			console.log(c);
						var e=parseFloat(data.min)+c*(data.max-data.min)/($(this).parent().width()-$(this).width());
						var output=Math.round(e).toFixed(0)*100/100;
			 			$('.p_before').css({'width': c});
						$(this).children('span').text(output);
			 			$('.calculate-amount').val(output);
						calc(data, output);
				}
			});


		event.preventDefault();
		changecalc();
		/* Act on the event */
});

$('body').on('keypress, keydown', function(event)
{
	var show=$(this).find('.cwrap')[0];
	if (show!=undefined)
	{
		var code = event.keyCode ? event.keyCode : event.which;
		if (code==27)
    	{
    		$('.modal_block').removeClass('fadeInDown').addClass('fadeOutUp');
			$('.cwrap').fadeOut('1000', function(){$('.cwrap').remove();});
			//$('#main').removeClass('grey');
		}
	}
});
$('body').on('click', function(event) {
	if (event.target.className=='close'  || event.target.className=='btn-close')
	{
		$('.modal_block').removeClass('fadeInDown').addClass('fadeOutUp');
		$('.cwrap').fadeOut('1000', function(){$('.cwrap').remove();});
		//$('#main').removeClass('grey');
	}
});




$(document).on('change','.calculate-select',function()
{
	changecalc();
})

function changecalc(){
	var plan=$('.calculate-select').val();
	var data = sw(plan);
	//console.log(plan);
	if (plan>1) { $('.calculate-duration').prop( "disabled", true ); }
	else {  $('.calculate-duration').prop( "disabled", false ); }

			$('.calculate-amount').val(data.min);
			$('.calculate-duration').val(data.duration);
			//$('.compound').val('0');
			$('.drag').children('span').text(data.min);
			$('.drag').animate({'left': '0px'},400);
			$('.p_before').animate({'width': '0'},400);
	calc(data,data.min);
}

$(document).on('change keyup','.calculate-amount', function()
		{
				var amount=$(this).val();
				var duration=$('.calculate-duration').val();
				var plan=$('.calculate-select').val();
				var data = sw(plan);

				if (amount>data.max) amount=data.max;
				$(this).val(amount);
				var position=Math.round((amount-data.min)*($( ".drag" ).parent().width()-$(".drag" ).width())/(data.max-data.min));
				if (position<0) position=0;
				$('.p_before').animate({'width': position},400);
				$(".drag").animate({'left': position+'px'},400);
				calc(data, amount);
		}).on('keypress','.calculate-amount', isNumber);

$(document).on('change keyup','.calculate-duration', function()
		{
				var amount=$('.calculate-amount').val();
				var duration=$(this).val();
				var plan=$('.calculate-select').val();
				var data = sw(plan);
				console.clear();
				data.duration=duration;
				calc(data, amount);
		}).on('keypress','.calculate-duration', isNumber);

function isNumber(event)
{
	var charCode = (event.which) ? event.which : event.keyCode;
	if (charCode > 31 && (charCode < 48 || charCode > 57))
		return false;
	return true;
}
function sw(plan)
{
		data=[];
		amount=$('.calculate-amount').val();
		data.min=10;
		data.max=20000;
		data.percent=101;
		switch (plan)
		{
		case '1':
				data.min = 10;
				data.max = 20000;
				data.plan=1;
				data.duration=1;
				percent=101;

				if(amount>=10&&amount<=7000) { percent=101; }
				else if(amount>=7001&&amount<=10000){ percent=115; }
				else if(amount>=10001&&amount<=15000){ percent=122; }
				else if(amount>=15001&&amount<=20000){ percent=135; }
				else if(amount<10){ percent=101; }
				data.percent=percent;
				break;
		case '2':
				data.min = 100;
				data.max = 50000;
				data.plan=2;
				data.duration=7;
				percent=109;

				if(amount>=100&&amount<=500) { percent=109; }
				else if(amount>=7001&&amount<=15000){ percent=210; }
				else if(amount>=15001&&amount<=25000){ percent=350; }
				else if(amount>=25001&&amount<=50000){ percent=550; }
				else if(amount<100){ percent=109; }
				data.percent=percent;
				break;
		case '3':
				data.min = 1000;
				data.max = 35000;
				data.plan=3;
				data.duration=15;
				percent=122;

				if(amount>=1000&&amount<=10000) { percent=122; }
				else if(amount>=10001&&amount<=18000){ percent=550; }
				else if(amount>=18001&&amount<=25000){ percent=850; }
				else if(amount>=25001&&amount<=35000){ percent=1200; }
				else if(amount<1000){ percent=122; }
				data.percent=percent;
				break;
		case '4':
				data.min = 1500;
				data.max = 40000;
				data.plan=4;
				data.duration=30;
				percent=140;

				if(amount>=1500&&amount<=10000) { percent=145; }
				else if(amount>=10001&&amount<=20000){ percent=850; }
				else if(amount>=20001&&amount<=30000){ percent=1350; }
				else if(amount>=30001&&amount<=40000){ percent=2000; }
				else if(amount<1500){ percent=145; }
				data.percent=percent;
				break;
		case '5':
				data.min = 1500;
				data.max = 50000;
				data.plan=5;
				data.duration=60;
				percent=210;

				if(amount>=1500&&amount<=10000) { percent=210; }
				else if(amount>=10001&&amount<=20000){ percent=2100; }
				else if(amount>=20001&&amount<=30000){ percent=3500; }
				else if(amount>=30001&&amount<=50000){ percent=4200; }
				else if(amount<1500){ percent=210; }
				data.percent=percent;
				break;
		case '6':
				data.min = 3000;
				data.max = 80000;
				data.plan=6;
				data.duration=90;
				percent=400;

				if(amount>=3000&&amount<=15000) { percent=400; }
				else if(amount>=15001&&amount<=25000){ percent=4250; }
				else if(amount>=25001&&amount<=40000){ percent=7500; }
				else if(amount>=40001&&amount<=80000){ percent=10000; }
				else if(amount<3000){ percent=400; }
				data.percent=percent;
				break;
		
		}
		$('.min-value').text(data.min+'$');
		$('.max-value').text(data.max+'$');
		
	return data;
}

function calc(data, amount)
{
	if (jQuery.isEmptyObject(data))
	{
		data = sw();
		amount = data.min;
		$('.amount').val(data.min);
		calculate(amount,data.percent,data.id,103);

	}
	calculate(amount,data.percent,data.plan,data.duration,data.percent);
}

 function calculate(amount,percent,plan,duration,percent)
 {
 	var plan=Number(plan);
 	var amount=Number(amount);

 	var duration=Number(duration);
	var percent=Number(percent);
	if(plan>0)
		{
			var total=Math.round(amount*percent).toFixed(0)/100;
		}
	else
		{
			var total=Math.round(amount*percent*duration).toFixed(0)/100;
		}
	$('.calculate-duration').val(duration);
	$('.depos').val('$'+amount.toFixed(2));
	$('.total').val('$'+(total-amount).toFixed(2));
	$('.summ').val('$'+total.toFixed(2));
	$('.percent').val(percent+'%');
 }

});

