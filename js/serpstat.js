console.log('start serpstat.js');

const svgIcons = {
	copy: '<?xml version="1.0" encoding="iso-8859-1"?><!-- Generator: Adobe Illustrator 19.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 viewBox="0 0 488.3 488.3" style="enable-background:new 0 0 488.3 488.3; height:15px;" xml:space="preserve"><g><g><path d="M314.25,85.4h-227c-21.3,0-38.6,17.3-38.6,38.6v325.7c0,21.3,17.3,38.6,38.6,38.6h227c21.3,0,38.6-17.3,38.6-38.6V124			C352.75,102.7,335.45,85.4,314.25,85.4z M325.75,449.6c0,6.4-5.2,11.6-11.6,11.6h-227c-6.4,0-11.6-5.2-11.6-11.6V124			c0-6.4,5.2-11.6,11.6-11.6h227c6.4,0,11.6,5.2,11.6,11.6V449.6z"/><path d="M401.05,0h-227c-21.3,0-38.6,17.3-38.6,38.6c0,7.5,6,13.5,13.5,13.5s13.5-6,13.5-13.5c0-6.4,5.2-11.6,11.6-11.6h227			c6.4,0,11.6,5.2,11.6,11.6v325.7c0,6.4-5.2,11.6-11.6,11.6c-7.5,0-13.5,6-13.5,13.5s6,13.5,13.5,13.5c21.3,0,38.6-17.3,38.6-38.6			V38.6C439.65,17.3,422.35,0,401.05,0z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>'
}

const keywordColumnSelector = 'th[data-name="keyword"] div.tooltip';

const copyLink = document.createElement("A");
copyLink.className = 'copy_keyword';
copyLink.innerHTML = svgIcons.copy;
copyLink.style.cssText = "cursor:pointer;";

const copyCheckbox = document.createElement('span');
copyCheckbox.innerHTML = '<input type="checkbox" name="" id="" class="checkbox" value=""><label for="reportsAlert"><svg class="icon "><use xlink:href="#icon_check"></use></svg></label>';
copyCheckbox.style.cssText = "margin-right:5px";

const copyCheckedButton = document.createElement('span');
copyCheckedButton.innerHTML = '<button class="button" style="height: 22px;line-height: 20px;margin-right: 10px;"><span class="button_content">Copy checked</span></button>';

const copy = (text) => {
    let input = document.createElement('textarea');
    input.innerHTML = text;
    document.body.appendChild(input);
    input.select();
    let result = document.execCommand('copy');
    document.body.removeChild(input);
    return result;
}

const getNextSibling = (elem, selector) => {
	let sibling = elem.nextElementSibling;

	while (sibling) {
		if (sibling.matches(selector)) return sibling;
		sibling = sibling.nextElementSibling
	}
}

const copyKeyword = (element) => {
	let keyword = getNextSibling(element.target.parentElement, '.link_text').innerHTML.trim();
	copy(keyword);
}

const copyCheckedKeyword = () => {
	let selectedItems = [];
	let values = Array
	  .from(document.querySelectorAll('input[type="checkbox"].copy_checkbox'))
	  .filter((checkbox) => checkbox.checked);

    values.forEach((item) => {
    	selectedItems.push(getNextSibling(item.parentElement, '.link_text').innerHTML.trim());
    })
    copy(selectedItems.join("\r\n"));
}

const toggleAllCheckbox = () => {
	let checkbox = document.querySelector('.copy_checkbox_all');
	
	var arrCheckbox = [...document.getElementsByClassName('copy_checkbox')];
	arrCheckbox.forEach((item) => {
		if (checkbox.checked) {
			item.checked = true;
		} else {
			item.checked = false;
		}
	})
}

const init = () => {
	let table = document.querySelector('table.table');
	let keywords = table.getElementsByClassName("link_text ajax_link");

	// Checkbox all
	let allCloneCheckbox = copyCheckbox.cloneNode(true);
	allCloneCheckbox.querySelector('input').setAttribute('name', 'all');
	allCloneCheckbox.querySelector('input').setAttribute('id', 'all');
	allCloneCheckbox.querySelector('input').className = 'checkbox copy_checkbox_all';
	allCloneCheckbox.querySelector('label').setAttribute('for', 'all');
	allCloneCheckbox.addEventListener('change', toggleAllCheckbox);
	document.querySelector(keywordColumnSelector).before(allCloneCheckbox);

	// Copy checked
	copyCheckedButton.addEventListener('click', copyCheckedKeyword);
	document.querySelector(keywordColumnSelector).before(copyCheckedButton);

	// Checkboxes and copy action
	for (let i = 0; i < keywords.length; i++) {
		let cloneNode = copyLink.cloneNode(true);
		let cloneCheckbox = copyCheckbox.cloneNode(true);

		cloneCheckbox.querySelector('input').setAttribute('name', i);
		cloneCheckbox.querySelector('input').setAttribute('id', 'ckey' + i);
		cloneCheckbox.querySelector('input').className = 'checkbox copy_checkbox';
		cloneCheckbox.querySelector('label').setAttribute('for', 'ckey' + i);
		
		cloneNode.addEventListener('click', copyKeyword);
	    
	    keywords[i].before(cloneCheckbox);
	    keywords[i].before(cloneNode);
	}
}
