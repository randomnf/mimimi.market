/*product count btns*/

const ccw = document.querySelectorAll(".cart-count_wrap");
let item;

for(let i=0;item=ccw[i];i++){
	dec_btn=item.querySelector(".cart_dec-btn");
	inc_btn=item.querySelector(".cart_inc-btn");
	dec_btn.addEventListener("click",function(e){
		e.preventDefault();
		const inp = this.parentNode.querySelector(".add-to-cart-form_input");
		if(inp.value>1)
			inp.value=parseInt(inp.value)-1;
	});
	inc_btn.addEventListener("click",function(e){
		e.preventDefault();
		const inp = this.parentNode.querySelector(".add-to-cart-form_input");
		inp.value=parseInt(inp.value)+1;
	});
}

/*popup windows*/

const popup_wrap = document.querySelector(".popup_wrap");
let opened_popup_window,
	user_region_opened = false;

document.querySelector(".user-region").addEventListener("click",function(e){
	e.preventDefault();
	const crw = document.querySelector(".change-region_wrap");
	crw.classList.toggle("opened");
	user_region_opened = true;
});

document.querySelector(".delivery-and-payment_link").addEventListener("click",function(e){
	e.preventDefault();
	opened_popup_window = document.querySelector(".delivery-popup_wrap");
	popup_wrap.classList.add("opened");
	opened_popup_window.classList.toggle("opened");
});

const close_popup_btn_list=document.querySelectorAll(".close-popup-btn");

for(let i=0;item=close_popup_btn_list[i];i++){
	item.addEventListener("click",function(e){
		e.preventDefault();
		opened_popup_window.classList.remove("opened");
		popup_wrap.classList.remove("opened");
	})
}

document.querySelector(".express-order_btn").addEventListener("click",function(e){
	e.preventDefault();
	opened_popup_window = document.querySelector(".express-order-popup_wrap");
	popup_wrap.classList.add("opened");
	opened_popup_window.classList.toggle("opened");
});

document.querySelector(".user-nav-link_login").addEventListener("click",function(e){
	e.preventDefault();
	opened_popup_window = document.querySelector(".login-popup_wrap");
	popup_wrap.classList.add("opened");
	opened_popup_window.classList.toggle("opened");
});

document.querySelector(".user-nav-link_register").addEventListener("click",function(e){
	e.preventDefault();
	opened_popup_window = document.querySelector(".register-popup_wrap");
	popup_wrap.classList.add("opened");
	opened_popup_window.classList.toggle("opened");
});

const one_click_btn_list = document.querySelectorAll(".one-click-buy-btn");
for(let i=0;item=one_click_btn_list[i];i++)
	item.addEventListener("click",function(e){
		e.preventDefault();
		opened_popup_window = document.querySelector(".one-click-popup_wrap");
		popup_wrap.classList.add("opened");
		opened_popup_window.classList.toggle("opened");
	});

$(window).mouseup(function(e){
	let $opw = $(opened_popup_window);
	if(popup_wrap.classList.contains("opened") && opened_popup_window && !$opw.is(e.target) && $opw.has(e.target).length === 0){
		opened_popup_window.classList.remove("opened");
		popup_wrap.classList.remove("opened");
	}

	const crw = $(".change-region_wrap"),
		ur = $(".user-region");
	if(user_region_opened && !ur.is(e.target) && ur.has(e.target).length === 0 && !crw.is(e.target) && crw.has(e.target).length === 0){
		crw.removeClass("opened");
		user_region_opened = false;
	}
});

window.addEventListener("keydown",function(e){
	if (e.keyCode==27){
		document.querySelector(".change-region_wrap").classList.remove("opened");
		if(opened_popup_window){
			opened_popup_window.classList.remove("opened");
			popup_wrap.classList.remove("opened");
		}
	}
});

/*product-cards*/

const mppl = document.querySelectorAll(".product-card");
let initial_height=parseInt(getComputedStyle(mppl[0]).height),
	pco,pco_co,pco_cl,pco_vo,pco_vl;
for(let i=0;item=mppl[i];i++){
	item.addEventListener("mouseenter",function(e){
		if(containerWidth<768)
			this.style.height=initial_height+"px";
	});
	item.addEventListener("mouseleave",function(e){
		if(containerWidth<768)
			this.style.height="auto";
	});
	pco = item.querySelector(".product-commercial-offer");
	if(pco){
		pco_cl = pco.querySelectorAll(".color-label");
		if(pco_cl[0]){
			for(let j=0,lbl;lbl=pco_cl[j];j++){
				lbl.addEventListener("click",function(){
					this.parentNode.querySelector(".product_chosen-prop").innerHTML=this.querySelector(".product_radio-color_label").innerHTML;
				});
			}
		}
		pco_vl = pco.querySelectorAll(".volume-label");
		if(pco_vl[0]){
			for(let j=0,lbl;lbl=pco_vl[j];j++){
				lbl.addEventListener("click",function(){
					this.parentNode.querySelector(".product_chosen-prop").innerHTML=this.querySelector(".product_radio-volume_label").innerHTML;
				});
			}
		}
	}
}

/*menu*/

var menuBtn = document.getElementById("toggle-menu-btn"),
	closeMenuBtn = document.getElementById("close-menu-btn"),
	menuWrap = document.querySelector(".main-navigation_wrap"),
	linkWithSubMenu = document.querySelector(".catalog-link_element"),
	subMenu = document.querySelector(".catalog-menu"),
	container = document.querySelector(".main-navigation .content-wrap"),
	containerWidth = getContainerWidth(container);

window.addEventListener("resize",function (){
	containerWidth = getContainerWidth(container);
	calc_catalog_menu();
	initial_height=parseInt(getComputedStyle(mppl[0]).height);
});

menuBtn.addEventListener("click",function(){
	menuWrap.classList.add("menu-mobile-opened");
});

closeMenuBtn.addEventListener("click",function(){
	menuWrap.classList.remove("menu-mobile-opened");
});

$(document).mouseup(function(e){
	var menu = $(".main-navigation_inner");
	if(!menu.is(e.target) && menu.has(e.target).length === 0)
		closeMenuBtn.click();
});

linkWithSubMenu.addEventListener("click",function(e){
	if(containerWidth<=767){
		e.preventDefault();
		subMenu.classList.toggle("sub-menu-opened");
		this.classList.toggle("submenu-opened");
	}
});

$(window).bind('scroll', function () {
	var navc = document.querySelector(".navigation-container"),
		smw = document.querySelector(".site-menu_wrap"),
		fap = document.querySelector(".fast-access-panel");
	if (($(window).scrollTop() > 200) && (containerWidth>767)){
		if(fap.classList.contains("fixed-menu")==false){
			let fapHeight = fap.scrollHeight;
			navc.style.paddingTop = fapHeight+"px";
			// let mar = getComputedStyle(smw).marginBottom;
			// smw.style.marginBottom=mar+fapHeight+"px";
			$('.fast-access-panel').addClass('fixed-menu');
		}
	} else {
		$('.fast-access-panel').removeClass('fixed-menu');
		navc.style.paddingTop=0+"px";
	}
});

function calc_catalog_menu(){
	if(containerWidth>767){
		const cmw_ip = document.querySelector(".catalog-menu_wrap__index-page"),
		cm_el = document.querySelector(".catalog-menu_element"),
		cm_height=cm_el.scrollHeight,
		cm_margin=17;
		if(cmw_ip)
			cmw_ip.style.marginBottom=(cm_height+cm_margin)+"px";
	}
};

window.addEventListener("load",function (){
	calc_catalog_menu();
});

/*site search*/

﻿var searchButton = document.querySelector(".toogle-search-link"),
	formWrap = document.querySelector(".search-form_wrap"),
	searchForm = document.querySelector(".site-search-form"),
	input = document.getElementById("search-input");

searchButton.addEventListener("click",function(evt){
	evt.preventDefault();

	formWrap.classList.toggle("search-opened");
	input.focus();
});


$(document).mouseup(function (e){
	var searchFormQ = $(".site-search-form");
	if (!searchFormQ.is(e.target) && searchFormQ.has(e.target).length === 0){
		document.querySelector(".close-search-btn").click();
	}
});

window.addEventListener("keydown",function(e){
	if(e.keyCode==27)
		document.querySelector(".close-search-btn").click();
});

document.querySelector(".close-search-btn").addEventListener("click",function(e){
	e.preventDefault();
	formWrap.classList.remove("search-opened");
	input.blur();
});

function getCoord(elem){
	var box = elem.getBoundingClientRect();

	return{
		top: box.top + pageYOffset,
		left: box.left + pageXOffset,
		bottom: box.bottom + pageYOffset,
		right: box.right + pageXOffset
	};
};

function getContainerWidth(container){
	var coords = getCoord(container);

	return (coords.right - coords.left);
}

/* catalog filter */

var fieldset_list = document.querySelectorAll(".filter-group:not(.price-group)"),
	filter_title = document.querySelector(".filter-title");

for(let i=0;item=fieldset_list[i];i++){
	item.querySelector(".filter-group-title").addEventListener("click",function(e){
		e.preventDefault();
		if(containerWidth<=767)
			fieldset_list[i].classList.toggle("group-closed");
	});
}

if(filter_title){
	filter_title.addEventListener("click",function(){
		if(containerWidth<=767){
			document.querySelector(".filter_inner").classList.toggle("filter-closed");
			this.classList.toggle("filter-opened");
		}
	});
}

/*recomended products slider*/

function recomended_products_slider_init(){
	const rpw = document.querySelector(".recomended-products_wrap"),
		rpfsv = document.querySelector("#recomended-products-slider .flex-viewport"),
		rpc_list = document.querySelectorAll(".recomended-product-card");
	let initial_height = 0;
	rpfsv.style.zIndex=1;
	for(let i=0;item=rpc_list[i];i++){
		item.addEventListener("mouseenter",function(e){
			let curh = this.scrollHeight+5;
			if(initial_height==0)
				initial_height=parseInt(getComputedStyle(rpfsv).height);
			if(curh>initial_height){
				rpfsv.style.height=curh+"px";
				rpw.style.marginBottom=(-(curh-initial_height))+"px";
			}
		});
		item.addEventListener("mouseleave",function(e){
			let curh = this.scrollHeight+5;
			if(curh>initial_height){
				rpfsv.style.height="auto";
				rpw.style.marginBottom=0;
			}
		});
	}
};
