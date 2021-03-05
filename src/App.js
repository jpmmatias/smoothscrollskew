import React, { useRef, useEffect } from 'react';
import './App.scss';
import useWindowSize from './hooks/useWindowSize';
import images from './images/images';

function App() {
	const app = useRef(null);
	const scrollContainer = useRef(null);
	const { height, width } = useWindowSize();

	const data = {
		ease: 0.1,
		current: 0,
		previous: 0,
		rounded: 0,
	};

	useEffect(() => {
		if (scrollContainer.current) {
			document.body.style.height = `${
				scrollContainer.current.getBoundingClientRect().height
			}px`;
		}
	}, [height]);

	useEffect(() => {
		if (scrollContainer.current) {
			requestAnimationFrame(() => skewScrolling());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const skewScrolling = () => {
		data.current = window.scrollY;
		data.previous += (data.current - data.previous) * data.ease;
		data.rounded = Math.round(data.previous * 100) / 100;

		const difference = data.current - data.rounded;
		const acceleration = difference / width;
		const velocity = +acceleration;
		const skew = velocity * 7.5;

		scrollContainer.current.style.transform = `translate3d(0, -${data.rounded}px, 0) skewY(${skew}deg)`;

		//loop vai raf
		requestAnimationFrame(() => skewScrolling());
	};

	return (
		<div ref={app} className="App">
			<div ref={scrollContainer} className="scroll">
				{images.map((image, index) => (
					<>
						<div key={index} className="img-container">
							<img src={image} alt={`people ${index}`} />
						</div>
						<h2>
							Skew <span className="outline">Scrolling</span>
						</h2>
					</>
				))}
			</div>
		</div>
	);
}

export default App;
