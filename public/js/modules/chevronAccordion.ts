export default function chevronAccordion() {
  if (!this.classList.contains('chevron')) return;

  if (this.classList.contains('chevron--event')) {
    // get description node to toggle its active class
    const description = this.nextSibling.nextSibling;

    if (!description) return;
    description.classList.toggle('itinerary__description--active');
  } else if (this.classList.contains('chevron--todo')) {
    // get todolist node to toggle its active class
    const todoList = this.parentElement.parentElement.lastChild;

    if (!todoList) return;
    todoList.classList.toggle('todo__list--active');
  }

  // toggle active classes for chevron itself
  this.classList.toggle('chevron--active');
}
