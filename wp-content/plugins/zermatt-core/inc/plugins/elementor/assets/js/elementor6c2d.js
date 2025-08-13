(function ($) {
	"use strict";
	
	$(window).on('load', function(){
		for (var key in qodefCore.shortcodes) {
			for (var keyChild in qodefCore.shortcodes[key]) {
				qodefElementor.init(key, keyChild);
			}
		}
		
		qodefElementorSection.init();
		elementorSection.init();
	});
	
	var qodefElementor = {
		init: function (key, keyChild) {
			$(window).on('elementor/frontend/init', function (e) {
				elementorFrontend.hooks.addAction('frontend/element_ready/' + key + '.default', function (e) {
					// Check if object doesn't exist and print the module where is the error
					if (typeof qodefCore.shortcodes[key][keyChild] === 'undefined') {
						console.log(keyChild);
					}
					
					qodefCore.shortcodes[key][keyChild].init();
				});
			});
		}
	};
	
	var qodefElementorSection = {
		init: function () {
			$(window).on('elementor/frontend/init', function () {
				elementorFrontend.hooks.addAction('frontend/element_ready/section', elementorSection.init);
			});
		}
	};
	
	var elementorSection = {
		init: function ($scope) {
			var $target = $scope,
				isEditMode = Boolean(elementorFrontend.isEditMode()),
				settings = [],
				sectionData = {};
			
			//generate parallax settings
			if (isEditMode && typeof $scope !== 'undefined') {
				
				// generate options when in admin
				var editorElements = window.elementor.elements,
					sectionId = $target.data('id');
				
				$.each(editorElements.models, function (index, object) {
					if (sectionId === object.id) {
						sectionData = object.attributes.settings.attributes;
					}
				});
				
				//parallax options
				if (typeof sectionData.qodef_parallax_type !== 'undefined') {
					settings['enable_parallax'] = sectionData.qodef_parallax_type;
				}
				
				if (typeof sectionData.qodef_parallax_image !== 'undefined' && sectionData.qodef_parallax_image['url']) {
					settings['parallax_image_url'] = sectionData.qodef_parallax_image['url'];
				}
				
				//offset options
				if (typeof sectionData.qodef_offset_type !== 'undefined') {
					settings['enable_offset'] = sectionData.qodef_offset_type;
				}
				
				if (typeof sectionData.qodef_offset_image !== 'undefined' && sectionData.qodef_offset_image['url']) {
					settings['offset_image_url'] = sectionData.qodef_offset_image['url'];
				}
				
				if (typeof sectionData.qodef_offset_top !== 'undefined') {
					settings['offset_top'] = sectionData.qodef_offset_top;
				}
				
				if (typeof sectionData.qodef_offset_left !== 'undefined') {
					settings['offset_left'] = sectionData.qodef_offset_left;
				}

				if (typeof sectionData.qodef_enable_grid_row !== 'undefined') {
					settings['enable_grid_row'] = sectionData.qodef_enable_grid_row;
				}

				if (typeof sectionData.qodef_grid_offset_left !== 'undefined') {
					settings['grid_offset_left'] = sectionData.qodef_grid_offset_left;
				}
				//overlay options
				if (typeof sectionData.qodef_enable_overlay_text !== 'undefined') {
					settings['enable_overlay'] = sectionData.qodef_enable_overlay_text;
				}

				if (typeof sectionData.qodef_set_overlay_image !== 'undefined' && sectionData.qodef_set_overlay_image['url']) {
					settings['overlay_image_url'] = sectionData.qodef_set_overlay_image['url'];
				}

				if (typeof sectionData.qodef_overlay_text !== 'undefined') {
					settings['overlay_text'] = sectionData.qodef_overlay_text;
				}

				if (typeof sectionData.qodef_overlay_text_color_initial !== 'undefined') {
					settings['text_color_initial'] = sectionData.qodef_overlay_text_color_initial;
				}

				if (typeof sectionData.qodef_overlay_text_color_in_focus !== 'undefined') {
					settings['text_color_in_focus'] = sectionData.qodef_overlay_text_color_in_focus;
				}

				if (typeof sectionData.qodef_overlay_text_font_size !== 'undefined') {
					settings['text_font_size'] = sectionData.qodef_overlay_text_font_size;
				}

				if (typeof sectionData.qodef_overlay_text_font_size_tablet !== 'undefined') {
					settings['text_font_size_tablet'] = sectionData.qodef_overlay_text_font_size_tablet;
				}

				if (typeof sectionData.qodef_overlay_text_font_size_mobile !== 'undefined') {
					settings['text_font_size_mobile'] = sectionData.qodef_overlay_text_font_size_mobile;
				}

				if (typeof sectionData.qodef_overlay_text_position !== 'undefined') {
					settings['text_position'] = sectionData.qodef_overlay_text_position;
				}

				if (typeof sectionData.qodef_overlay_text_width !== 'undefined') {
					settings['text_width'] = sectionData.qodef_overlay_text_width;
				}

				if (typeof sectionData.qodef_overlay_text_width_tablet !== 'undefined') {
					settings['text_width_tablet'] = sectionData.qodef_overlay_text_width_tablet;
				}

				if (typeof sectionData.qodef_overlay_text_width_mobile !== 'undefined') {
					settings['text_width_mobile'] = sectionData.qodef_overlay_text_width_mobile;
				}

				//generate output backend
				if (typeof $target !== 'undefined') {
					elementorSection.generateOutput($target, settings);
				}
			} else {
				// generate options when in frontend using global js variable
				var sectionHandlerData = qodefElementorGlobal.vars.elementorSectionHandler;

				$.each(sectionHandlerData, function (index, properties) {
					properties.forEach(function (property) {
						
						if (typeof property['parallax_type'] !== 'undefined' && property['parallax_type'] === 'parallax') {
							
							$target = $('[data-id="' + index + '"]');
							settings['parallax_type'] = property['parallax_type'];
							settings['parallax_image_url'] = property['parallax_image']['url'];
							
							if (typeof settings['parallax_image_url'] !== 'undefined') {
								settings['enable_parallax'] = 'parallax';
							}
						}
						
						if (typeof property['offset_type'] !== 'undefined' && property['offset_type'] === 'offset') {
							
							$target = $('[data-id="' + index + '"]');
							settings['offset_type'] = property['offset_type'];
							settings['offset_image_url'] = property['offset_image']['url'];
							settings['offset_top'] = property['offset_top'];
							settings['offset_left'] = property['offset_left'];
							
							if (typeof settings['offset_image_url'] !== 'undefined') {
								settings['enable_offset'] = 'offset';
							}
						}

						if (typeof property['enable_grid_row'] !== 'undefined' && property['enable_grid_row'] === 'no') {

							$target = $('[data-id="' + index + '"]');
							settings['enable_grid_row'] = property['enable_grid_row'];
							settings['grid_offset_left'] = property['grid_offset_left'];
						}

						if (typeof property['enable_overlay'] !== 'undefined' && property['enable_overlay'] === 'yes') {

							$target = $('[data-id="' + index + '"]');
							settings['enable_overlay'] = property['enable_overlay'];
							settings['overlay_image_url'] = property['overlay_image']['url'];
							settings['overlay_text'] = property['overlay_text'];
							settings['text_color_initial'] = property['text_color_initial'];
							settings['text_color_in_focus'] = property['text_color_in_focus'];
							settings['text_font_size'] = property['text_font_size'];
							settings['text_font_size_tablet'] = property['text_font_size_tablet'];
							settings['text_font_size_mobile'] = property['text_font_size_mobile'];
							settings['text_position'] = property['text_position'];
							settings['text_width'] = property['text_width'];
							settings['text_width_tablet'] = property['text_width_tablet'];
							settings['text_width_mobile'] = property['text_width_mobile'];
						}

						//generate output frontend
						if (typeof $target !== 'undefined') {
							elementorSection.generateOutput($target, settings);
							
							settings = [];
						}
					});
				});
			}
		},
		generateOutput: function ($target, settings) {

			if (typeof settings['enable_parallax'] !== 'undefined' && settings['enable_parallax'] === 'parallax' && typeof settings['parallax_image_url'] !== 'undefined') {
				
				$('.qodef-parallax-row-holder', $target).remove();
				$target.removeClass('qodef-parallax qodef--parallax-row');
				
				var $layout = null;
				
				$target.addClass('qodef-parallax qodef--parallax-row');
				
				$layout = $('<div class="qodef-parallax-row-holder"><div class="qodef-parallax-img-holder"><div class="qodef-parallax-img-wrapper"><img class="qodef-parallax-img" src="' + settings['parallax_image_url'] + '" alt="Parallax Image"></div></div></div>').prependTo($target);
				
				// wait for image src to be loaded
				var newImg = new Image;
				newImg.onload = function () {
					$target.find('img.qodef-parallax-img').attr('src', this.src);
					qodefCore.qodefParallaxBackground.init();
				};
				newImg.src = settings['parallax_image_url'];
			}
			
			if (typeof settings['enable_offset'] !== 'undefined' && settings['enable_offset'] === 'offset' && typeof settings['offset_image_url'] !== 'undefined') {
				
				$('.qodef-offset-image-holder', $target).remove();
				$target.removeClass('qodef-offset-image');
				
				var $layout = null;
				
				$target.addClass('qodef-offset-image');
				
				$layout = $('<div class="qodef-offset-image-holder" style="position: absolute; z-index: 5; top:' + settings['offset_top'] + '; left:' + settings['offset_left'] + '"><div class="qodef-offset-image-wrapper"><img src="' + settings['offset_image_url'] + '" alt="Offset Image"></div></div>').prependTo($target);
			}

			if (typeof settings['enable_grid_row'] !== 'undefined' && settings['enable_grid_row'] === 'no' && typeof settings['grid_offset_left'] !== 'undefined' && settings['grid_offset_left'] !== '') {

				$('.qodef-content-grid.qodef--hidden', $target).remove();
				$target.removeClass('qodef-grid-offset--set');

				var $layout = null;

				$target.addClass('qodef-grid-offset--set');

				$layout = $('<div class="qodef-content-grid qodef--hidden"></div>').prependTo($target);

				var offsetGrid  = 0;

				if (qodef.windowWidth > 1025) {
					var contentGridWidth = $layout.width();
					var $element = $target.children('.elementor-container');
					offsetGrid = $layout.offset().left + contentGridWidth * parseInt(settings['grid_offset_left']) / 100;
				}

				$element.css({'paddingLeft': offsetGrid + 'px'});

				$(window).on('resize', function () {
					offsetGrid = 0;
					if (qodef.windowWidth > 1025) {
						contentGridWidth = $layout.width();
						offsetGrid = $layout.offset().left + contentGridWidth * parseInt(settings['grid_offset_left']) / 100;
					}
					$element.css({'paddingLeft': offsetGrid + 'px'});
				});$(window).on('resize', function () {
					offsetGrid = 0;
					if (qodef.windowWidth > 1025) {
						contentGridWidth = $layout.width();
						offsetGrid = $layout.offset().left + contentGridWidth * parseInt(settings['grid_offset_left']) / 100;
					}
					$element.css({'paddingLeft': offsetGrid + 'px'});
				});
			}

			if (typeof settings['enable_overlay'] !== 'undefined' && settings['enable_overlay'] === 'yes') {

				$('.qodef-overlay-holder', $target).remove();

				var $layout = null;
				var style = '';
				var data = '';

				if (settings['overlay_image_url'] !== '') {
					style += 'background-image: url(' + settings['overlay_image_url'] + ');';
				}

				if (settings['text_color_initial'] !== '') {
					data += 'data-initial-color=' + settings['text_color_initial'];
				}
				if (settings['text_color_in_focus'] !== '') {
					data += ' data-focus-color=' + settings['text_color_in_focus'];
				}

				$layout = $('<div class="qodef-overlay-holder" ' + data + '><div class="qodef-overlay-background" style="' + style + '" ></div><div class="qodef-overlay-text">'+ settings['overlay_text'] +'</div></div>').prependTo($target);

				var layoutOffsetStart  = $layout.offset().top,
					initColor = $layout.data('initial-color'),
					focusColor = $layout.data('focus-color'),
					$text = $layout.find('.qodef-overlay-text');


				var calculateSize = function () {
					var device = '_' + elementorFrontend.getCurrentDeviceMode();

					if ( '_desktop' == device ) {
						device = '';
					}

					if ( settings['text_font_size'].size !== '' ) {
						var font_size = settings['text_font_size'].size + settings['text_font_size'].unit;
						if ( settings['text_font_size' + device].size !== '' ) {
							font_size = settings['text_font_size' + device].size + settings['text_font_size' + device].unit;
						}
						$text.css({'font-size': font_size});
					}

					if ( settings['text_width'].size !== '' ) {
						var width = settings['text_width'].size + settings['text_width'].unit;
						if ( settings['text_width' + device].size !== '' ) {
							width = settings['text_width' + device].size + settings['text_width' + device].unit;
						}
						$text.css({'width': width});
					}
				};

				calculateSize();

				$(window).on('resize', function () {
					calculateSize();
				});

				if ( settings['text_position'].top !== '' ) {
					$text.css({'top': settings['text_position'].top + settings['text_position'].unit});
				}
				if ( settings['text_position'].left !== '' ) {
					$text.css({'left': settings['text_position'].left + settings['text_position'].unit});
				}
				if ( settings['text_position'].bottom !== '' ) {
					$text.css({'bottom': settings['text_position'].bottom + settings['text_position'].unit});
				}
				if ( settings['text_position'].right !== '' ) {
					$text.css({'right': settings['text_position'].right + settings['text_position'].unit});
				}

				$text.css({'color': initColor});

				if (qodef.scroll > layoutOffsetStart) {
					if (!$layout.hasClass('qodef--switch')) {
						$layout.addClass('qodef--switch');
						$text.css({'color': focusColor});
					}
				}

				$(window).on('scroll', function () {
					if (qodef.scroll > layoutOffsetStart) {
						if (!$layout.hasClass('qodef--switch')) {
							$layout.addClass('qodef--switch');
							$text.css({'color': focusColor});
						}
					} else {
						if ($layout.hasClass('qodef--switch')) {
							$layout.removeClass('qodef--switch');
							$text.css({'color': initColor});
						}
					}
				});
			}
		}
	};
	
})(jQuery);
