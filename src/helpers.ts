import { readFileSync } from 'fs';

// read icons from public folder
export function icon(name: string) {
  readFileSync(`./public/images/icons/${name}.svg`);
}

export const navTop = [
  { slug: '/trips', title: 'Trips', icon: 'trips' },
  { slug: '/upcoming', title: 'Upcoming', icon: 'upcoming' },
  { slug: '/add-trip', title: 'Add Trip', icon: 'add' },
  { slug: '/account', title: 'User', icon: 'userface' } // temporary solution for rendering user's account icon
];

export const navTrip = [
  { slug: '/summary', title: 'Summary', icon: 'summary' },
  { slug: '/:slug/itinerary', title: 'Itinerary', icon: 'itinerary' },
  { slug: '/:slug/expenses', title: 'Expenses', icon: 'expenses' },
  { slug: '/:slug/todo', title: 'Todo List', icon: 'todo-list' }
];
