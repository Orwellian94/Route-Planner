# Route Planner

This project is a web application built with React that provids a user-friendly interface for planning routes and displaying them on a Google Map. The key features and components of this project include:
-	Google Maps Integration through Google Maps JavaScript API to display a map, fetch location data, and calculate routes.
-	Input form where users can input an origin and destination for their route. These inputs are implemented as Autocomplete components, which provide location suggestions as users type.
-	Optional waypoints inputs in which users can also add stops to their route. Waypoints are added dynamically, and Autocomplete components are used for selecting waypoint locations.
-	The project displays custom map markers on the map for the origin, destination, and any waypoint. Different custom icons are used for origin, destination and waypoints, making it easy to distinguish between them.
-	After inputting the origin, destination, and optional waypoints, users can click the "Create Route" button to calculate and display the route on the map.
-	Users can toggle the visibility of the route planning form by clicking on the "Create Route" button, which expands or collapses the form.
-	Users can dynamically add or remove waypoints by clicking the "+" or "-" within the form.
-	This project is designed to be responsive and adapts to various screen sizes.
-	While the Google Maps API is loading, a loading indicator is displayed to provide a better user experience.
How to use: Users can use this application to plan routes by typing in inputs an origin, destination, and single or multiple waypoints addresses. The project will display the route on a Google Map and show the directions to follow.

# External Libraries Used in Project
-  @mui/icons-material: Material-UI icons used for icons in the UI.

-  @react-google-maps/api: A library for integrating Google Maps with React.

-  Other CSS files and image assets.

# Project Configuration

-The Google Maps API key is required for the project to work, and it should be included as googleMapsApiKey in the useJsApiLoader configuration instead of GOOGLE_MAPS_API_KEY value.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm install`

Installs react with all needed dependecies.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
