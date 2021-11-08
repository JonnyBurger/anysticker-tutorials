import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {Phone} from '../RealStickers/Phone';
import screen2 from '../RealStickers/screen2.png';
import screen7 from '../RealStickers/screen7.png';

export const TwoScreens: React.FC = () => {
	const {fps} = useVideoConfig();
	const frame = useCurrentFrame();

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
					<Phone
						image={screen2}
						baseScale={1.3}
						rotate={[-x, -y, -z]}
						scale={1}
					/>
				</AbsoluteFill>
				<AbsoluteFill
					style={{
						left: '25%',
					}}
				>
					<Phone image={screen7} baseScale={1.3} rotate={[x, y, z]} scale={1} />
				</AbsoluteFill>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
