$(function ()  
{
 	$("#game_instructions_popover").popover({
	        html: true,
	        trigger: 'manual'
	    }).click(function(e) {
	        $(this).popover('show');
	        clickedAway = false
	        isVisible = true
	        e.preventDefault()
	    });
});  

$(document).click(function(e) {
  if(isVisible & clickedAway)
  {
    $('#game_instructions_popover').popover('hide')
    isVisible = clickedAway = false
  }
  else
  {
    clickedAway = true
  }
});
