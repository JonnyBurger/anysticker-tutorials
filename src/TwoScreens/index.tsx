import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {Phone} from '../RealStickers/Phone';

export const TwoScreens: React.FC = () => {
	const {fps} = useVideoConfig();
	const frame = useCurrentFrame();

	const flip = spring({
		fps,
		frame: (frame - 20) / 4,
		config: {
			mass: 1,
			damping: 30,
		},
	});
	const progress = frame / 60;
	const z = 0;
	const x = interpolate(progress, [0, 1], [0, Math.PI], {});
	const y = interpolate(progress, [0, 1], [0, Math.PI], {});

	const wholeRotation = interpolate(progress, [0, 1], [0, Math.PI], {});
	const scale = spring({
		fps,
		frame,
		config: {},
	});

	return (
		<AbsoluteFill
			style={{
				backgroundColor: 'white',
			}}
		>
			<AbsoluteFill
				style={{
					transform: `rotate(${-wholeRotation}rad) scale(${scale})`,
				}}
			>
				<AbsoluteFill
					style={{
						left: '-25%',
					}}
				>
					<Phone baseScale={1.3} rotate={[-x, -y, -z]} scale={1} />
				</AbsoluteFill>
				<AbsoluteFill
					style={{
						left: '25%',
					}}
				>
					<Phone baseScale={1.3} rotate={[x, y, z]} scale={1} />
				</AbsoluteFill>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
