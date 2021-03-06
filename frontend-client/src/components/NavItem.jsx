/**
 * A navigation component
 */
import React, { Component } from 'react'
import { Link, IndexLink, withRouter } from 'react-router'

class NavItem extends Component {
    render () {
        const { index, to, children, router } = this.props

        let isActive
        if( router.isActive('/',true) && index ) isActive = true
        else  isActive = router.isActive(to)
        const LinkComponent = index ?  IndexLink : Link

        return (
            <li className={isActive ? 'active' : ''}>
                <LinkComponent to={to}>{children}</LinkComponent>
            </li>
        )
    }
}

NavItem = withRouter(NavItem)

export default NavItem