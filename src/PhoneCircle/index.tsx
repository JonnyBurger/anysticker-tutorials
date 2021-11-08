import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {Phone} from '../RealStickers/Phone';
import screen from '../RealStickers/screen.jpg';
import screen2 from '../RealStickers/screen2.png';
import screen3 from '../RealStickers/screen3.png';
import screen4 from '../RealStickers/screen4.png';
import screen5 from '../RealStickers/screen5.png';
import screen6 from '../RealStickers/screen6.png';
import screen7 from '../RealStickers/screen7.png';
import screen8 from '../RealStickers/screen8.png';

const screens = [
	screen,
	screen2,
	screen3,
	screen4,
	screen5,
	screen6,
	screen7,
	screen8,
];

export const PhoneCircle: React.FC = () => {
	const {fps} = useVideoConfig();
	const frame = useCurrentFrame();

	const entrance = spring({
		fps,
		frame,
		config: {
			mass: 4,
			damping: 100,
		},
	});
	const constant = frame / 300;
	const progress = entrance + constant;

	const rotate = interpolate(progress, [0, 1], [0, Math.PI / 2]);
	const scale = interpolate(progress, [0, 1], [1.5, 1]);

	const phonesInCircle = 7;
	return (
		<AbsoluteFill
			style={{
				backgroundColor: 'white',
			}}
		>
			<AbsoluteFill
				style={{
					transform: `rotate(${rotate}rad) scale(${scale})`,
				}}
			>
				{new Array(phonesInCircle + 1).fill(true).map((arr, i) => {
					const index = i % phonesInCircle;
					const radius =
						450 +
						spring({
							fps,
							frame: frame - index * 1,
							config: {
								mass: 3,
								damping: 200,
							},
						}) *
							-100;

					const yRotate = interpolate(
						spring({
							fps,
							frame: frame - index * 1,
							config: {
								damping: 200,
							},
						}),
						[0, 1],
						[Math.PI, 0]
					);
					const angle = (index * Math.PI * 2) / phonesInCircle;
					const x = Math.sin(angle) * radius;
					const y = Math.cos(angle) * radius;
					return (
						<AbsoluteFill
							style={{
								left: x,
								top: y,
							}}
						>
							<Phone
								image={screens[index]}
								baseScale={0.55}
								rotate={[yRotate, 0, (index / phonesInCircle) * Math.PI * 2]}
								scale={1}
							/>
						</AbsoluteFill>
					);
				})}
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
