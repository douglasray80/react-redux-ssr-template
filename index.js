import * as functions from 'firebase-functions'
import express from 'express'
import path from 'path'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import Helmet from 'react-helmet'
import routes from './src/routes'
import Layout from './src/components/Layout'
import createStore, { initializeSession } from './src/store'

const app = express()

app.use(express.static(path.resolve(__dirname, '../public')))

app.get('/*', (req, res) => {
  const context = {}
  const store = createStore()

  store.dispatch(initializeSession())

  const dataRequirements =
    routes
      .filter(route => matchPath(req.url, route)) // filter matching paths
      .map(route => route.component) // map to components
      .filter(comp => comp.serverFetch) // check if components have data requirement
      .map(comp => store.dispatch(comp.serverFetch())) // dispatch data requirement

  Promise.all(dataRequirements).then(() => {
    const jsx = (
      <ReduxProvider store={store}>
        <StaticRouter context={context} location={req.url}>
          <Layout />
        </StaticRouter>
      </ReduxProvider>
    )
    const reactDom = renderToString(jsx)
    const reduxState = store.getState()
    const helmetData = Helmet.renderStatic()

    res.writeHead(200, {'Content-Type': 'text/html'})
    res.end(htmlTemplate(reactDom, reduxState, helmetData))
  })
})

function htmlTemplate(reactDom, reduxState, helmetData) {
	return `
		<!DOCTYPE html>
		<html>
			<head>
				<meta charset="utf-8">
				<meta http-equiv="X-UA-Compatible" content="IE=edge">
				<meta name="viewport" content="width=device-width, initial-scale=1">
				<meta name="description" content="So Wow So Vegan is an ethical-living blog with recipes and content relating to veganism, zero waste, no poo and minimalism.">
				<meta name="author" content="Alexandria Ray and Douglas Ray">

				<meta property="og:title" content="So Wow So Vegan: Adventures in vegan living" />
				<meta property="og:type" content="website" />
				<meta property="og:image" content="https://sowowsovegan.com/img/default.jpg" />
				<meta property="og:description" content="An ethical-living blog with recipes and content relating to veganism, zero waste, no poo and minimalism." />

				<title>So Wow. So Vegan.</title>
				<meta charset='utf-8' />

				${helmetData.title.toString()}
				${helmetData.meta.toString()}

			</head>

			<body>
				<div id='app'>${reactDom}</div>
				<script>
					window.REDUX_DATA = ${JSON.stringify(reduxState)}
				</script>
				<script src='./bundle.js'></script>
			</body>
		</html>
	`
}

app.listen(3000)

export let ssrapp = functions.https.onRequest(app)
