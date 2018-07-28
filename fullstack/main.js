// Labels for the status classes
const labels = {
	'TL': 'learn',
	'RS': 'revisit',
	'LG': 'learning',
	'LD': 'learned'
}

// $.getJSON('technologies.json', (technologies) Not working with github

// Calls the function to insert the tree, in .tree
insertTreeLevel($('.tree'), technologies);

// Recursive function which inserts the data in the root
function insertTreeLevel(root, list) {

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


// Showing and hiding folders toggle
$(document).ready(() => {
	toggleFolder(); // Don't know yet why it needs to be called in here but it works
})

// Showing and hiding folders toggle
function toggleFolder() {
	$('.folder').click(function() {
		$(this).next().toggle();
	});
}

// Setting expand-all button function
$('#expand-all').click(() => {
	$('.folder').each(function() {
		$(this).next().show();
	});
});

// Setting close-all button function
$('#close-all').click(() => {
	$('.folder').each(function() {
		$(this).next().hide();
	});
});