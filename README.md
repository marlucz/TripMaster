# TripMaster

> Fullstack project with Node.js with Express on the backend side and JavaScript with Pug Template Engine on the frontend side. The idea for applications came from the need to plan a vacation trip. Unfortunately, I did not find any application that would meet my needs, so this application is to give me all the necessary tools that I want.

> Only logged user has access to the application tabs, so each person has access to its trips only. Within trip user can create whole itinerary experience with individual stops showed on map, expenses and todo tab to list all the stuff that has to be done before or during the trip.

## Technologies (so far)

- Express
- Mongoose
- Vanilla JS
- SSR with Pug

## Installation

Install the dependencies

```$xslt
$ npm install
```

## Usage

Run app

```$xslt
$ npm run start:dev
```

Open login page at

```$xslt
localhost:3000/login
```

or logged user interface at

```$xslt
localhost:3000/
```

## Done

- Server setup with router
- Pages: login/register, 404, account, trips, itinerary, expenses, todo list

## Working on

- Migrate Node Server to TypeScript
- Pages: single trip view to be done with external api

## To be done

- Whole server functionality (schemas, routing, working on the data)
