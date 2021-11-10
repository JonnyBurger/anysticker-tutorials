import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {Phone} from './RealStickers/Phone';
import screen10 from './RealStickers/screen10.png';
import screen2 from './RealStickers/screen2.png';
import screen3 from './RealStickers/screen3.png';
import screen4 from './RealStickers/screen4.png';
import screen5 from './RealStickers/screen5.png';
import screen6 from './RealStickers/screen6.png';
import screen8 from './RealStickers/screen8.png';
import screen9 from './RealStickers/screen9.png';

const screens = [
	screen2,
	screen5,
	screen6,
	screen3,
	screen4,
	screen10,
	screen9,
	screen8,
];

export const FourPhones: React.FC = () => {
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
	const constant = frame / 200;

	const progress =
		spring({
			fps,
			frame,
			config: {
				damping: 200,
			},
		}) + constant;
	const scale = interpolate(progress, [0, 1], [1, 0.9]);
	const distance = progress * 50;
	const phonesInCircle = 8;
	return (
		<AbsoluteFill
			style={{
				backgroundColor: 'white',
			}}
		>
			<AbsoluteFill
				style={{
					transform: `scale(${scale})`,
				}}
			>
				{new Array(phonesInCircle).fill(true).map((arr, i) => {
					const index = i;

					return (
						<AbsoluteFill
							key={index}
							style={{
								left:
									interpolate(
										index,
										[0, phonesInCircle - 1],
										[-distance, distance]
									) + '%',
							}}
						>
							<Phone
								image={screens[i]}
								baseScale={1}
								rotate={[
									0,
									(Math.PI / 6 + (index * Math.PI) / 48) * progress,
									0,
								]}
								scale={scale}
							/>
						</AbsoluteFill>
					);
				})}
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
