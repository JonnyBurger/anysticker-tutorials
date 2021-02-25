import React from 'react';
import {
	Img,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

const BigRotate: React.FC = () => {
	const frame = useCurrentFrame();
	const videoConfig = useVideoConfig();
	const rotatoFrame = spring({
		fps: videoConfig.fps,
		config: {
			stiffness: 20,
			damping: 5,
			mass: 0.3,
			overshootClamping: false,
		},
		from: 1,
		to: 0,
		frame,
	});
	const scale = spring({
		fps: videoConfig.fps,
		config: {
			stiffness: 20,
			damping: 5,
			mass: 0.3,
			overshootClamping: false,
		},
		from: 0.5,
		to: 1,
		frame,
	});
	const frameInterpolated = Math.round(
		interpolate(rotatoFrame, [0, 1], [1, 250])
	);
	const src = require('./assets/Rotato Frame ' +
		(frameInterpolated + 1) +
		'.png');
	return (
		<div
			style={{
				flex: 1,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: 'white',
			}}
		>
			<Img
				src={src}
				style={{
					transform: `scale(${scale})`,
				}}
			/>
		</div>
	);
};

export default BigRotate;
