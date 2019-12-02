import '../sass/style.scss';

//  ****************  MODULE IMPORTS **************
import chevronAccordion from './modules/chevronAccordion';
import contentHeight from './modules/contentHeight';

//  ****************  DOM ELEMENTS **************
const chevrons = document.querySelectorAll('.chevron');

// *****************  DOM MANIPULATION *************

// content height dynamic based on nav heights
let contentListeners = ['DOMContentLoaded', 'resize'];

contentListeners.forEach(listener =>
  window.addEventListener(listener, contentHeight)
);

// itinerary timeline description show and hide
chevrons.forEach(chevron => {
  chevron.addEventListener('click', chevronAccordion);
});
