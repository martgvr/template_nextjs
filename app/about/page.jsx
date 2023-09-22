"use client"

import { useEffect } from "react"

export const metadata = {
	title: "Acerca de nosotros"
}

export default function About() {
	const clickHandler = () => alert('chau')
	
	useEffect(() => {
		console.log('hola')
	}, [])
	
	return (
		<div>
			<h1>About</h1>
			<button onClick={clickHandler}>Clickear</button>
		</div>
	)
}