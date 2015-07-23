/**
 * JQuery shiftcheckbox plugin
 * 
 * shiftcheckbox provides a simpler and faster way to select/unselect multiple
 * checkboxes within a given range with just two clicks. Inspired from GMail
 * checkbox functionality
 * 
 * Just call $('.<class-name>').shiftcheckbox(), 
 * $('#<container-id> checkbox'>.shiftcheckbox(),
 * or ('[#<container-id>] input:checkbox'> in $(document).ready
 * 
 * @name shiftcheckbox
 * @type jquery
 * @cat Plugin/Form
 * @return JQuery
 * 
 * @version 2.0 which adapted the array of checkbox 
 * which does not contain the attribute "value" or even looks
 * like '<input type="checkbox" />...'.
 * 
 * Thanks to Aditya Mooley, the creator of this plugin.
 * this version is modified by Singyuen Yip <yeshengyuan@foxmail.com>.
 * the former version see also:
 * 
 * @URL http://www.sanisoft.com/blog/2009/07/02/jquery-shiftcheckbox-plugin
 * 
 * Copyright (c) 2009 Aditya Mooley <adityamooley@sanisoft.com> Dual licensed
 * under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses
 */

(function($) {
	$.fn.shiftcheckbox = function() {
		$(this).bind("click", {prevChecked: null, selector: $(this)}, 
				handleClick);
	};

	function handleClick(event) {
		var checkStatus = this.checked;
		// check whether user has pressed shift
		if (event.shiftKey) {
			if (event.data.prevChecked != null) {
				// get the current checkbox number
				var currentChecked;
				currentChecked = event.data.selector.index($(this));
				if (currentChecked < event.data.prevChecked) {
					event.data.selector.each(function() {
						var currIdx = event.data.selector.index($(this));
						if (currIdx >= currentChecked
								&& currIdx <= event.data.prevChecked) {
							this.checked = checkStatus;
						}
					});
				} else {
					event.data.selector.each(function() {
						var currIdx = event.data.selector.index($(this));
						if (currIdx >= event.data.prevChecked
								&& currIdx <= currentChecked) {
							this.checked = checkStatus;
						}
					});
				}

				event.data.prevChecked = currentChecked;
			}
		} else {
			if (checkStatus) {
				event.data.prevChecked = event.data.selector
						.index($(this));
			}
		}
	}
	;
})(jQuery);