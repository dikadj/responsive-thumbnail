import React, { Component } from "react"
import PropTypes from "prop-types"
import { Button, Typography } from "material-ui"
import CardContainer, { CardActions, CardContent, CardMedia } from "material-ui/Card"

// import CssIcon from "react-icons/lib/fa/css3"
// import HtmlIcon from "react-icons/lib/fa/html5"
import ShareIcon from "react-icons/lib/fa/share-alt"
import SeeMoreIcon from "react-icons/lib/fa/angle-double-right"

export default class Card extends Component {
	render() {
		return (
			<CardContainer className="mb-4 mr-1 col-10 col-sm-5 col-lg-3 col-xl-2 card">
				<CardMedia
					image={this.props.cardImage}
					title={this.props.cardTitle}
					className="rounded-top row"
					style={{
						height: 160,
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				/>
				<CardContent className="rounded-bottom row">
					<Typography type="headline" component="h2">
						{this.props.cardTitle}
					</Typography>
					<Typography component="p">
						{this.props.cardDesc}
					</Typography>
				</CardContent>
				<CardActions
					className="row rounded-bottom"
					style={{
						position: "absolute",
						bottom: 0,
						top: "auto",
						background: "#fff",
						width: "100%",
					}}
				>
					<Button
						dense
						style={{
							textTransform: "none",
						}}
					>
						Share
						<ShareIcon
							style={{
								fontSize: "1rem",
								paddingLeft: ".2rem",
							}}
						/>
					</Button>
					<Button
						dense
						style={{
							textTransform: "none",
						}}
					>
						More
						<SeeMoreIcon
							style={{
								fontSize: "1rem",
								paddingLeft: ".2rem",
							}}
						/>
					</Button>
				</CardActions>
			</CardContainer>
		)
	}
}

Card.propTypes = {
	cardImage: PropTypes.string,
	cardTitle: PropTypes.string,
	cardDesc: PropTypes.string,
}

Card.defaultProps = {
	cardImage: "https://source.unsplash.com/Ya3FqJdKVaw/300x200",
	cardTitle: "Night Shower",
	cardDesc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
}
