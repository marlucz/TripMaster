function timelineDescriptionAccordion() {
  if (!this.classList.contains('chevron')) return;

  // get description node to toggle its active class
  const description = this.nextSibling.nextSibling;

  // toggle active classes for chevron itself and description node
  this.classList.toggle('chevron--active');
  description.classList.toggle('itinerary__description--active');
}

export default timelineDescriptionAccordion;
