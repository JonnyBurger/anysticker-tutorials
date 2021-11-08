import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Phone} from './RealStickers/Phone';

export const JumpPhone: React.FC<{
	phoneScale: number;
}> = ({phoneScale}) => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	// During the whole scene, the phone is rotating.
	// 2 * Math.PI is a full rotation.
	const constantRotation = interpolate(
		frame,
		[0, durationInFrames],
		[0, Math.PI * 0.25]
	);

	// When the composition starts, there is some extra
	// rotation and translation.
	const entranceAnimation = spring({
		frame,
		fps,
		config: {
			damping: 200,
			mass: 3,
		},
	});

	// Calculate the entrance rotation,
	// doing one full spin
	const entranceRotation = interpolate(
		entranceAnimation,
		[0, 1],
		[-Math.PI, 0]
	);
	const rotateY = entranceRotation + constantRotation;
	const rotateX = -Math.PI / 8;
	const rotateZ = -Math.PI / 16;

	return (
		<Phone
			rotate={[rotateX, rotateY, rotateZ]}
			scale={entranceAnimation}
			baseScale={phoneScale}
		/>
	);
};
