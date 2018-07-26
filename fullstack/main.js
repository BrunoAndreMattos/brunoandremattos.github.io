// Labels for the status classes
const labels = {
	'TL': 'learn',
	'RS': 'revisit',
	'LG': 'learning',
	'LD': 'learned'
}

// Calls the function to insert the tree, in #treeId
insertTreeLevel($('#treeId'), technologies);

// Recursive function which inserts the data in the root
function insertTreeLevel(root, list) {

	//For each object in the list
	for (obj of list) {

		// Inserts the li
		const li = $('<li>');
		root.append(li);

		// Inserts the li text, with it's class
		li.append($('<span>')
			.append(obj.name)
			.addClass(labels[obj.status]));

		// If the object has children
		if (obj.data) {

			// Adds '+' after the text, and the folder class
			li.children()
				.append(' +')
				.addClass('folder');

			// Creates the ul, appending it to the actual li
			const ul = $('<ul>');
			li.append(ul);

			// Inserts the children in the tree
			insertTreeLevel(ul, obj.data);
		}
	}

	// Hiding all the folder children asap, so that they do not appear on reloading
	document.querySelectorAll('.folder')
		.forEach(folder => folder.nextElementSibling.style.display = 'none');
}

// Initializing stuff
$(document)
	.ready(() => {
		// Select all the folder class elements
		document.querySelectorAll('.folder')
			.forEach(folder => {
				// Adding toggle option when clicking in a folder
				folder.onclick = (e) => {
					const ul = folder.nextElementSibling
					const display = ul.style.display

					if (display === 'none') {
						ul.style.display = 'block'
					} else {
						ul.style.display = 'none'
					}
				}
			})

	})

// Setting expand-all button function
document.getElementById('expand-all')
	.addEventListener('click', () => {
		document.querySelectorAll('.folder')
			.forEach(folder => {
				const ul = folder.nextElementSibling
				ul.style.display = 'block'
			})
	})

// Setting close-all button function
document.getElementById('close-all')
	.addEventListener('click', () => {
		document.querySelectorAll('.folder')
			.forEach(folder => {
				const ul = folder.nextElementSibling
				ul.style.display = 'none'
			})
	})
