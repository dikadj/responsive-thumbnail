import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import Modal from "material-ui/Modal"
import withStyles from "material-ui/styles/withStyles"
import Slide from "material-ui/transitions/Slide"
import Paper from "material-ui/Paper"
import { duration } from "material-ui/styles/transitions"
import { capitalize } from "./helpers"

function getSlideDirection(anchor) {
	if (anchor === "left") {
		return "right"
	} else if (anchor === "right") {
		return "left"
	} else if (anchor === "top") {
		return "down"
	}

	// (anchor === "bottom")
	return "up"
}

export const styles = theme => ({
	docked: {
		flex: "0 0 auto",
	},
	paper: {
		overflowY: "auto",
		display: "flex",
		flexDirection: "column",
		height: "100vh",
		flex: "1 0 auto",
		zIndex: theme.zIndex.drawer,
		WebkitOverflowScrolling: "touch", // Add iOS momentum scrolling.
		// temporary style
		position: "fixed",
		top: 0,
		// We disable the focus ring for mouse, touch and keyboard users.
		// At some point, it would be better to keep it for keyboard users.
		// :focus-ring CSS pseudo-class will help.
		"&:focus": {
			outline: "none",
		},
	},
	paperAnchorLeft: {
		left: 0,
		right: "auto",
	},
	paperAnchorRight: {
		left: "auto",
		right: 0,
	},
	paperAnchorTop: {
		top: 0,
		left: 0,
		bottom: "auto",
		right: 0,
		height: "auto",
		maxHeight: "100vh",
	},
	paperAnchorBottom: {
		top: "auto",
		left: 0,
		bottom: 0,
		right: 0,
		height: "auto",
		maxHeight: "100vh",
	},
	paperAnchorDockedLeft: {
		borderRight: `1px solid ${theme.palette.divider}`,
	},
	paperAnchorDockedTop: {
		borderBottom: `1px solid ${theme.palette.divider}`,
	},
	paperAnchorDockedRight: {
		borderLeft: `1px solid ${theme.palette.divider}`,
	},
	paperAnchorDockedBottom: {
		borderTop: `1px solid ${theme.palette.divider}`,
	},
	modal: {}, // Just here so people can override the style.
})

class Drawer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			// Let's assume that the Drawer will always be rendered on user space.
			// We use that state is order to skip the appear transition during the
			// initial mount of the component.
			firstMount: true,
		}
	}

	componentWillReceiveProps() {
		this.setState({
			firstMount: false,
		})
	}

	render() {
		const {
			anchor: anchorProp,
			children,
			classes,
			className,
			elevation,
			ModalProps,
			onClose,
			open,
			PaperProps,
			SlideProps,
			theme,
			transitionDuration,
			variant,
			...other
		} = this.props

		let anchor = anchorProp
		if (theme.direction === "rtl" && ["left", "right"].includes(anchor)) {
			anchor = anchor === "left" ? "right" : "left"
		}

		const drawer = (
			<Paper
				elevation={variant === "temporary" ? elevation : 0}
				className={classNames(classes.paper, classes[`paperAnchor${capitalize(anchor)}`], {
					[classes[`paperAnchorDocked${capitalize(anchor)}`]]: variant !== "temporary",
				})}
				{...PaperProps}
				square
			>
				{children}
			</Paper>
		)

		if (variant === "permanent") {
			return (
				<div className={classNames(classes.docked, className)} {...other}>
					{drawer}
				</div>
			)
		}

		const slidingDrawer = (
			<Slide
				in={open}
				direction={getSlideDirection(anchor)}
				timeout={transitionDuration}
				appear={!this.state.firstMount}
				{...SlideProps}
			>
				{drawer}
			</Slide>
		)

		if (variant === "persistent") {
			return (
				<div className={classNames(classes.docked, className)} {...other}>
					{slidingDrawer}
				</div>
			)
		}

		// variant === temporary
		return (
			<Modal
				BackdropProps={{
					transitionDuration,
				}}
				className={`close-modal ${classNames(classes.modal, className)}`}
				open={open}
				onClose={onClose}
				{...other}
				{...ModalProps}
			>
				{slidingDrawer}
			</Modal>
		)
	}
}

Drawer.propTypes = {
	/**
	* Side from which the drawer will appear.
	*/
	anchor: PropTypes.oneOf(["left", "top", "right", "bottom"]),
	/**
	* The contents of the drawer.
	*/
	children: PropTypes.node,
	/**
	* Useful to extend the style applied to components.
	*/
	classes: PropTypes.object.isRequired,
	/**
	* @ignore
	*/
	className: PropTypes.string,
	/**
	* The elevation of the drawer.
	*/
	elevation: PropTypes.number,
	/**
	* Properties applied to the `Modal` element.
	*/
	ModalProps: PropTypes.object,
	/**
	* Callback fired when the component requests to be closed.
	*
	* @param {object} event The event source of the callback
	*/
	onClose: PropTypes.func,
	/**
	* If `true`, the drawer is open.
	*/
	open: PropTypes.bool,
	/**
	* Properties applied to the `Paper` element.
	*/
	PaperProps: PropTypes.object,
	/**
	* Properties applied to the `Slide` element.
	*/
	SlideProps: PropTypes.object,
	/**
	* @ignore
	*/
	theme: PropTypes.object.isRequired,
	/**
	* The duration for the transition, in milliseconds.
	* You may specify a single timeout for all transitions, or individually with an object.
	*/
	transitionDuration: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.shape({ enter: PropTypes.number, exit: PropTypes.number }),
	]),
	/**
	* The type of drawer.
	*/
	variant: PropTypes.oneOf(["permanent", "persistent", "temporary"]),
}

Drawer.defaultProps = {
	anchor: "left",
	elevation: 16,
	open: false,
	transitionDuration: { enter: duration.enteringScreen, exit: duration.leavingScreen },
	variant: "temporary", // Mobile first.
}

export default withStyles(styles, { name: "MuiDrawer", flip: false, withTheme: true })(Drawer)
