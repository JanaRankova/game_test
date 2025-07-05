import { useState, useEffect } from 'react'

/* Custom hook for applying responsive styles or logic in components based on viewport
 size (switching layouts between desktop, tablet, mobile). Use dimension properties
 such as `max-width` or `min-height` etc.
*/
export const useMediaQuery = (dimensionProperty: string, value: number ) => {
	const [matches, setMatches] = useState(
		window.matchMedia(`(${dimensionProperty}: ${value}px)`).matches
	)

	useEffect(() => {
		window
		.matchMedia(`(${dimensionProperty}: ${value}px)`)
		.addEventListener('change', event => setMatches(event.matches));
	}, [dimensionProperty, value]);

	return matches
}
