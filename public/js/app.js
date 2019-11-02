import '../sass/style.scss';

import timelineDescriptionAccordion from './modules/timelineDescriptionAccordion';

//  ****************  DOM ELEMENTS **************
const chevrons = document.querySelectorAll('.chevron');

// *****************  DOM MANIPULATION *************

// itinerary timeline description show and hide

chevrons.forEach(chevron => {
  chevron.addEventListener('click', timelineDescriptionAccordion);
});
