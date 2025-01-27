# Three Express

An [Express.js](https://expressjs.com/) app to quickly create a lot of [Three.js](https://threejs.org/) scenes.

## Start

$ `npm install`
$ `npm run dev`

Node version `v22.8.0`

## Beware!

This setup is best described as *quick & dirty*. No thought has been invested into deployment or the building process.

Before deploying you should add `.env` to .gitignore.

## How this works

- you can change the port in the .env file
- views use [ejs Templates](https://ejs.co/#docs)
- there are two routes, defined in `src/routes.js`
	- `/` renders the view `index.ejs`
	- `/three/:id` renders the view `three-scene.ejs`
- the view-templates are `/src/server/views`
	- `index.ejs` renders a list of all scenes
	- `three-scene.ejs` shows a Three.js scene.
- The js files in `src/client/three/` are namend `scene-N.js`. `N` is a number, corresponding to `:id` in the route `/three/:id`.
- Every js file you add in the `src/client/three/` will create a new route.

## Linting

Configured to [Standard JS](https://github.com/standard/standard), you might want to change that. Not sure how this behaves in VS Code (i use Vim & Ale).


