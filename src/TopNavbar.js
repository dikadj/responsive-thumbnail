import React, { Component } from "react"
import { HashRouter as Router, Link } from "react-router-dom"

// Material UI Components
import AppBar from "material-ui/AppBar"
import Toolbar from "material-ui/Toolbar"
import IconButton from "material-ui/IconButton"
import Drawer from "material-ui/Drawer"
import CloseIcon from "react-icons/lib/md/close"
import List from "material-ui/List"
import ListItem from "material-ui/List/ListItem"
import ListItemIcon from "material-ui/List/ListItemIcon"
import ListItemText from "material-ui/List/ListItemText"


// Material UI Icons
import MenuIcon from "material-ui-icons/Menu"

// React Icons
import WebDesignIcon from "react-icons/lib/md/web"
import GraphicDesignIcon from "react-icons/lib/md/local-pizza"
import PhotographyIcon from "react-icons/lib/md/camera"

// Logo
import logoImg from "./logo-dsktp.png"

export default class TopNavbarB extends Component {
	constructor(props) {
		super(props)
		this.state = {
			open: false,
		}
	}
	render() {
		const handleDrawerClose = () => {
			this.setState({ open: false })
		}
		const handleDrawerToggle = () => {
			this.setState((prevState, props) => {
				return { open: !prevState.open }
			})
		}
		const tgt = document.querySelector("[data-mui-portal] [aria-hidden]")
		return (
			<Router>

				<div className="sticky-top">

					<AppBar
						position="static"
						style={{ background: "rgb(30,30,30)" }}
						ref={evt => this.elem = evt}
					>
						<Toolbar>
							<Link to="/">
								<img
									alt="logo"
									src={logoImg}
									style={{
										width: "120px",
									}}
								/>
							</Link>
							<IconButton
								onClick={handleDrawerToggle}
								className="ml-auto"
							>
								<MenuIcon style={{ color: "#fff" }} />
							</IconButton>
						</Toolbar>
					</AppBar>

					<Drawer
						open={this.state.open}
						anchor={window.innerWidth >= 768 ? "right" : "top"}
					>
						<div
							style={{
								width: "100%",
								height: "150px",
								background: "url('http://via.placeholder.com/300x200') no-repeat",
								backgroundSize: "cover",
								backgroundPosition: "center",
							}}
						>
							<div className="container-fluid">
								<IconButton
									onClick={handleDrawerToggle}
									className="ml-auto my-2 d-flex"
									style={{
										fontSize: "2rem",
										color: "#fff",
									}}
								>
									<CloseIcon />
								</IconButton>
							</div>
						</div>
						<List className="d-flex flex-column">
							<Link
								to="/web-design"
								onClick={handleDrawerClose}
							>
								<ListItem button>
									<ListItemIcon>
										<WebDesignIcon />
									</ListItemIcon>
									<ListItemText primary="Web Design" />
								</ListItem>
							</Link>
							<Link
								to="/graphic-design"
								onClick={handleDrawerClose}
							>
								<ListItem button>
									<ListItemIcon>
										<GraphicDesignIcon />
									</ListItemIcon>
									<ListItemText primary="Graphic Design" />
								</ListItem>
							</Link>
							<Link
								to="/photography"
								onClick={handleDrawerClose}
							>
								<ListItem button>
									<ListItemIcon>
										<PhotographyIcon />
									</ListItemIcon>
									<ListItemText primary="Photography" />
								</ListItem>
							</Link>
						</List>
					</Drawer>
				</div>
			</Router>
		)
	}
}
