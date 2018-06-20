import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Header from './Header'
import routes from '../routes'

const Layout = () => (
  <div>
    <Header />
    <Switch>
      {routes.map(route => <Route key={route.path} {...route} /> )}
    </Switch>
  </div>
)

export default Layout
