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
	var g_shiftcheckbox_prevChecked = null;
	var $g_shiftcheckbox_selector = null;
	$.fn.shiftcheckbox = function() {
		$g_shiftcheckbox_selector = $(this);
		$(this).bind("click", handleClick);
	};

	function handleClick(event) {
		var checkStatus = this.checked;
		// check whether user has pressed shift
		if (event.shiftKey) {
			if (g_shiftcheckbox_prevChecked != null) {
				// get the current checkbox number
				var currentChecked;
				currentChecked = $g_shiftcheckbox_selector.index($(this));
				if (currentChecked < g_shiftcheckbox_prevChecked) {
					$g_shiftcheckbox_selector.each(function() {
						var currIdx = $g_shiftcheckbox_selector.index($(this));
						if (currIdx >= currentChecked
								&& currIdx <= g_shiftcheckbox_prevChecked) {
							this.checked = checkStatus;
						}
					});
				} else {
					$g_shiftcheckbox_selector.each(function() {
						var currIdx = $g_shiftcheckbox_selector.index($(this));
						if (currIdx >= g_shiftcheckbox_prevChecked
								&& currIdx <= currentChecked) {
							this.checked = checkStatus;
						}
					});
				}

				g_shiftcheckbox_prevChecked = currentChecked;
			}
		} else {
			if (checkStatus) {
				g_shiftcheckbox_prevChecked = $g_shiftcheckbox_selector
						.index($(this));
			}
		}
	}
	;
})(jQuery);