import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Header from 'src/components/Header'

const useStyles = makeStyles(theme => ({
	root: {
		/* display: 'flex',
		flex */
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3)
	}
}))

const Layout = ({ children }) => {

	const classes = useStyles()

	return (
		<div className={classes.root}>
			<Header />	
			{children}
		</div>
	)
}
export default Layout