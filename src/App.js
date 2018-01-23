import React, { Component } from "react"

// Bootstrap
import "bootstrap/scss/bootstrap.scss"
import "jquery/dist/jquery.min"
import "popper.js"
import "bootstrap/dist/js/bootstrap.min"

// ScrollReveal
import ScrollReveal from "scrollreveal/dist/scrollreveal.min"

import $ from "jquery"

// Stylesheets
import "./App.scss"

// Components
import Thumbnail from "./Thumbnail"
import TopNavbar from "./TopNavbar"

export default class App extends Component {
	componentWillMount() {
		// ensuring components start at hidden
		$(".card").css("visibility: hidden")
	}
	componentDidMount() {
		$(document).ready(() => {
			window.sr = ScrollReveal(
				{
					reset: false,
					duration: 800,
					easing: "ease-in-out",
				},
				// 100 // pass interval for multiple elements
			)
			sr.reveal(".card")
		})
	}
	render() {
		return (
			<div>
				<TopNavbar />
				<Thumbnail />
			</div>
		)
	}
}
