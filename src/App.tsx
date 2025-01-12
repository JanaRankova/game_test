import { useState } from 'react'

function App() {
	const [count, setCount] = useState(0)

	return (
		<>
			<div className="top">TOP</div>
			<div className="content">
				<div className="side">
					Here lays dragons of non-existent side bar!
				</div>
				<div className="main-content">
					<h1>Vite + React</h1>
					<div className="card">
						<button onClick={() => setCount((count) => count + 1)}>
							count is {count}
						</button>
						<p>
							Edit <code>src/App.tsx</code> and save to test HMR
						</p>
					</div>
					<p className="read-the-docs">
						Click on the Vite and React logos to learn more
					</p>
				</div>
			</div>
			<div className="bottom"> BOTTOM</div>
		</>
	)
}

export default App
