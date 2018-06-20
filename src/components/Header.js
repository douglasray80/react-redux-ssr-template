import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const Div = styled.div`
	width: 100%;
  background: #d3d3d3;
  height: 50px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
`

const Header = () => (
  <Div>
    <Link to='/'>Home</Link>
    <Link to='/about'>About</Link>
    <Link to='/contact'>Contact</Link>
  </Div>
)

export default Header
