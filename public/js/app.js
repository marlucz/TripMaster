import '../sass/style.scss';

//  ****************  MODULE IMPORTS **************
import timelineDescriptionAccordion from './modules/timelineDescriptionAccordion';
import contentHeight from './modules/contentHeight';

//  ****************  DOM ELEMENTS **************
const chevrons = document.querySelectorAll('.chevron');

// *****************  DOM MANIPULATION *************

// content height dynamic height based on nav heights
let contentListeners = ['DOMContentLoaded', 'resize'];

contentListeners.forEach(listener =>
  window.addEventListener(listener, contentHeight)
);

// itinerary timeline description show and hide
chevrons.forEach(chevron => {
  chevron.addEventListener('click', timelineDescriptionAccordion);
});
