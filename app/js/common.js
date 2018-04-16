var marker = true;
var global_parentBox;
var itemBoxFull = document.querySelectorAll('.item_box');

function clatch() {
	marker = false;
}

// Функция кроссбраузерной установка обработчика событий
function addEvent(elem, type, handler){
  if(elem.addEventListener){
    elem.addEventListener(type, handler, false);
  } else {
    elem.attachEvent('on'+type, function(){ handler.call( elem ); });
  }
  return false;
}

$(document).mouseup(function (e) {
    var container = $(".popup_edit");
    if(e.target!=container[0]&&!container.has(e.target).length) { 
    	container.hide(); 
    } 
});
function showRect(elem) {
  var r = elem.getBoundingClientRect()
//  alert("{top:"+r.top+", left:"+r.left+", right:"+r.right+", bottom:"+ r.bottom + "}");
  return {
  	top: 	r.top + pageYOffset + 40
  }
}

function calc_total_sum() {
	var sum = 0,
			sum_item = 0,
			price_item = 0,
			cnt_item = 0,
			nds_sum = 0,
			total_sum = 0;
	var itemBox = document.querySelectorAll('.item_box');

	for ( var i = 0; i < itemBox.length; i++ ) {
		price_item = Number(itemBox[i].querySelector('.goods_price').innerHTML);
		cnt_item = Number(itemBox[i].querySelector('.goods_cnt').innerHTML);
		sum_item = price_item * cnt_item;
		itemBox[i].querySelector('.goods_sum').innerHTML = sum_item;
		sum += sum_item;
	}  
	nds_sum = sum * 0.18;
	total_sum = sum + nds_sum;
	document.querySelector('.tmp_total_sum').innerHTML = sum.toLocaleString('ru');
	document.querySelector('.total_nds_sum').innerHTML = nds_sum.toLocaleString('ru');
	document.querySelector('.total_sum').innerHTML = total_sum.toLocaleString('ru');
}

function	changeSelect() {
	var select_cnt = 0;
	var itemBox = document.querySelectorAll('.item_box');

	for ( var i = 0; i < itemBox.length; i++ ) {
		if (itemBox[i].querySelector('.select_item').checked) {
			select_cnt += 1;
		}
	}
	document.querySelector('.select_cnt').innerHTML = '<b>'+select_cnt+'</b>';
}

function incId() {
	var itemBox = document.querySelectorAll('.item_box');
	for ( var i = 0; i < itemBox.length; i++ ) {
		itemBox[i].querySelector('.cnt_num').innerHTML = i+1;
	}
}

$(document).ready(function() {
	for ( var i = 0; i < itemBoxFull.length; i++ ) {
		addEvent(itemBoxFull[i].querySelector('.select_item'), 'change', changeSelect);
	}
	calc_total_sum();
	$(".goods_cnt").click(function() {
		var pos = showRect(this),
				pop = document.querySelector('.popup_edit'),
				price = 0,
				cnt = 0,
				sum = 0;
		//$('.popup_edit').css('top',pos.top);
		global_parentBox = this.parentNode,
		price = global_parentBox.querySelector('.goods_price').innerHTML,
		cnt = global_parentBox.querySelector('.goods_cnt').innerHTML,
		sum = price * cnt;
		console.log('price = ' + price + '\n cnt = ' + cnt);
		pop.style.top = parseInt(pos.top)+"px";		
		pop.style.right = '20px';
		pop.querySelector('.popup_price').innerHTML = price;
		pop.querySelector('.popup_cnt').value = cnt;
		pop.querySelector('.popup_sum').innerHTML = sum.toLocaleString('ru');
	  $('.popup_edit').toggle();
	});
	$(".popup_munus_item").on('click', function() {
		var parentBox = this.parentNode,
			cnt = Number(parentBox.querySelector('.popup_cnt').value),
			price = Number(parentBox.querySelector('.popup_price').innerHTML);
		if ( cnt > 0 ) {
			cnt -= 1; 
		}
		sum = cnt * price;
		parentBox.querySelector('.popup_cnt').value = cnt;
		parentBox.querySelector('.popup_sum').innerHTML = sum;
		console.log(cnt);
	});
	$(".popup_plus_item").on('click', function() {
		var parentBox = this.parentNode,
				cnt = Number(parentBox.querySelector('.popup_cnt').value),
				price = Number(parentBox.querySelector('.popup_price').innerHTML),
				sum = 0;
		cnt += 1; 
		sum = cnt * price;
		parentBox.querySelector('.popup_cnt').value = cnt;
		parentBox.querySelector('.popup_sum').innerHTML = sum;
		console.log(cnt);
	});
	$('.popup_save').on('click', function() {
		var parentBox = this.closest('.popup_cnt_control'),
				cnt = Number(document.querySelector('.popup_cnt').value);
		global_parentBox.querySelector('.goods_cnt').innerHTML = cnt;
		$('.popup_edit').toggle();
		calc_total_sum();
	});
	$('.popup_cansel').on('click', function() {
		$('.popup_edit').toggle();
	});
	$('.dlt_btn').on('click', function () {
		var table = document.querySelector('table');
		var itemBox = document.querySelectorAll('.item_box');
		for ( var i = 0; i < itemBox.length; i++ ) {
			var check_box = itemBox[i].querySelector('.select_item');
			if (check_box.checked == true) {
        var tr = check_box.parentNode.parentNode;
        table.deleteRow(tr.rowIndex);
    	}
		}
		document.querySelector('.select_cnt').innerHTML = '0';
		incId();
		calc_total_sum();
	})
});