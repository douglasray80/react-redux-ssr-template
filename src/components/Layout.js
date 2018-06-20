import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { injectGlobal } from 'styled-components'

import Header from './Header'
import routes from '../routes'

injectGlobal`
	body {
		margin: 0;
		padding: 0;
	}

	a { text-decoration: none; }
`

const Layout = () => (
  <div>
    <Header />
    <Switch>
      {routes.map(route => <Route key={route.path} {...route} /> )}
    </Switch>
  </div>
)

export default Layout
