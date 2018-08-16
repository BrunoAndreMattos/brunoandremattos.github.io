// Labels for the status classes
const labels = {
	'IN': 'interested',
	'LD': 'learned',
	'NI': 'not-interested',
}

const animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

// Recursive function which inserts the data in the root
const insertTreeLevel = (root, list) => {
	
	//For each object in the list
	for (obj of list) {

		// Inserts the li
		const li = $('<li>');
		root.append(li);

		// Inserts the li text, with it's class
		li.append($('<span>').append(obj.name).addClass(labels[obj.status]));

		// If the object has children
		if (obj.data) {

			// Adds '+' after the text, and the folder class
			li.children().append(' +').addClass('folder');

			// Creates the ul, appending it to the actual li
			const ul = $('<ul>');
			li.append(ul);

			// Inserts the children in the tree
			insertTreeLevel(ul, obj.data);
		}
	}
	// Closing all folders
	$('.folder').each(function(index) {
		$(this).next().hide();
	});
}

// Calls the function to insert the tree, in .tree
insertTreeLevel($('.no-tree'), technologies);

// Showing and hiding folders toggle
$('.folder').on('click', function() {
	$(this).next().addClass('animated fadeInRightSmall').toggle();
});

// Toggle expand all
let expanded = false;
$('#toggle-expand').click(function() {
	if (expanded) {
		$(this).html('Expand All');
		$(this).css('background-color', '#f4f4f4');
		$(this).css('color', '#16191f');

		$('.folder').each(function() {
			$(this).next().hide();
		});

		expanded = false;
	} else {
		$(this).html('Close All');
		$(this).css('background-color', '#16191f');
		$(this).css('color', '#f4f4f4');

		$('.folder').each(function() {
			$(this).next().addClass('animated fadeInRightSmall').show();
		});

		expanded = true;
	}
});

// Toggle tree style
$('#toggle-tree').click(function() {
	if ($('ul').hasClass('no-tree')) {

		$('ul').removeClass('no-tree').addClass('tree');
		$(this).html('No Tree');
		$(this).css('background-color', '#16191f');
		$(this).css('color', '#f4f4f4');
	} else {

		$('ul').removeClass('tree').addClass('no-tree');
		$(this).html('Tree');
		$(this).css('background-color', '#f4f4f4');
		$(this).css('color', '#16191f');
	}
});

// Remove classes de animação inicial após terem ocorrido
$(document).ready(function() {
	$('button').one(animationEnd, function() {
		$(this).removeClass('animated flipInX');
	});
});