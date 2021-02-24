class Slider {
	constructor(slider) {
		this.sliderBlock = slider;
		this.viewport = slider.find(".slider_viewport");
		this.wrapper = this.viewport.find(".slides_wrapper");
		this.nextBtn = slider.find(".slider_next_btn");
		this.prevBtn = slider.find(".slider_prev_btn");
		this.slideBtns;
		this.slides = this.wrapper.find(".slide");
		this.slideCount = this.slides.length;
		this.slideWidth = this.viewport.width();
		this.slideHeight = this.viewport.height();
		this.offset = -this.slideWidth;
		this.animateTime = 800;
		this.scrolled = true;
		this.scrollInterval = 4800;
		this.scrollIntervalID;
		this.curSlide = 0;
		var self = this;
		
		// Переопределение размеров слайдов и их обертки
		this.wrapper.width(this.slideWidth*(this.slideCount+2));
		this.slides.width(this.slideWidth);
		this.slides.height(this.slideHeight);
		// Добавление копий первого и последнего слайдо в начало и конец слайдера
		this.slides.last().clone().prependTo(this.wrapper);  
		this.slides.first().clone().appendTo(this.wrapper);
		// Смещение слайдов в начальную позицию
		this.wrapper.css("left", this.offset);
		
		// Добавление обработчиков событий для кнопок слайдера
		this.prevBtn.click(function() {
			self.prevSlide();
		});
		this.nextBtn.click(function() {
			self.nextSlide();
		});
		
		// Добавление слайдеру кнопок навигации
		var sliderNav = "<div class=\"slider_nav\">";
		for (var i = 1; i <= this.slideCount; i++) {
			sliderNav += "<div href=\"\" class=\"slide_btn\"></div>";
		}
		sliderNav += "</div>";
		$(sliderNav).appendTo(this.sliderBlock);
		this.slideBtns = this.sliderBlock.find(".slide_btn");
		this.slideBtns.eq(this.curSlide).addClass("active");
		this.slideBtns.each(function(index, slideBtn) {
			$(slideBtn).click(function() 
			{				
				if (self.wrapper.is(':animated') || self.curSlide == index) {
					return false;
				}
				self.slideBtns.eq(self.curSlide).removeClass("active");
				$(this).addClass("active");
				self.offset = -self.slideWidth * (index + 1);
				self.wrapper.animate({left: self.offset},self.animateTime);
				self.curSlide = index;
				self.offset = -self.slideWidth * (index + 1);
				self.wrapper.animate({left: self.offset},self.animateTime);
				self.curSlide = index;
			});
		});
	}
	
	nextSlide() {
		if (this.wrapper.is(':animated')) {
			return false;
		}
		this.offset -= this.slideWidth;
		this.wrapper.animate({left: this.offset},this.animateTime);
		this.slideBtns.eq(this.curSlide).removeClass("active");
		this.curSlide++; 
		
		if (this.offset == (-this.slideWidth * (this.slideCount + 1))) {
			this.offset = -this.slideWidth;
			this.wrapper.css("left", this.offset);
			//this.wrapper.animate({left: this.offset},0);
			this.curSlide = 0;
		}
		this.slideBtns.eq(this.curSlide).addClass("active");



		
		// this.wrapper.animate({left: this.offset},this.animateTime);
		// this.slideBtns.eq(this.curSlide).removeClass("active");
		// this.curSlide++; 
		
		// if (this.offset == (-this.slideWidth * (this.slideCount + 1))) {
		// 	this.offset = -this.slideWidth;
		// 	this.wrapper.css("left", this.offset);
		// 	//this.wrapper.animate({left: this.offset},0);
		// 	this.curSlide = 0;
		// }
		// this.slideBtns.eq(this.curSlide).addClass("active");
	}
	
	prevSlide() {
		if (this.wrapper.is(':animated')) {
			return false;
		}
		this.offset += this.slideWidth;
		this.wrapper.animate({left: this.offset},this.animateTime);
		this.slideBtns.eq(this.curSlide).removeClass("active");
		this.curSlide--;
		
		if (this.offset == 0) {
			this.offset = -this.slideWidth * this.slideCount;
			this.wrapper.css("left", this.offset);
			this.wrapper.animate({left: this.offset},0);
			this.curSlide = this.slideCount - 1;
		}
		this.slideBtns.eq(this.curSlide).addClass("active");
	}
	
}

$(function() {
	// Инициализация всех слайдеров на странице
	var slidersFind = $(".slider");
	var sliders = [];
	slidersFind.each(function(index) {
		sliders.push(new Slider($(this)));
	});
	//Добавление автопрокрутки для слайдеров
	// При необходимости поменять scrollInterval слайдеров
	// sliders[0].scrollInterval = 5000;
	//sliders[0].scrolled = false;
	sliders.forEach(function(slider) {
		if (slider.scrolled){
			slider.scrollIntervalID = setInterval(function() { slider.nextSlide(); }, slider.scrollInterval);
			slider.sliderBlock.hover(function() {
				clearInterval(slider.scrollIntervalID);
			}, function() {
				slider.scrollIntervalID = setInterval(function() { slider.nextSlide(); }, slider.scrollInterval);
			});
		}
	});// */

});