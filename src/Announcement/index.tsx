import {Sequence, Series} from 'remotion';
import EndLogo from '../Circle';
import RealStickers from '../RealStickers';
import {TwoScreens} from '../TwoScreens';

export const Announcement: React.FC = () => {
	return (
		<Series>
			<Series.Sequence durationInFrames={40}>
				<RealStickers phoneScale={1} />
			</Series.Sequence>
			<Series.Sequence durationInFrames={66}>
				<Sequence from={-4}>
					<TwoScreens />
				</Sequence>
			</Series.Sequence>
			<Series.Sequence durationInFrames={66}>
				<EndLogo />
			</Series.Sequence>
		</Series>
	);
};
