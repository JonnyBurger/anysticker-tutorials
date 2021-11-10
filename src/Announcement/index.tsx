import React from 'react';
import {
	AbsoluteFill,
	Audio,
	interpolate,
	Sequence,
	Series,
	useVideoConfig,
} from 'remotion';
import rainforest from '../../rainforest.mp3';
import EndLogo from '../Circle';
import {FourPhones} from '../FourPhones';
import {PhoneCircle} from '../PhoneCircle';
import RealStickers from '../RealStickers';
import {Title} from '../Title';
import {TwoScreens} from '../TwoScreens';

export const Announcement: React.FC = () => {
	const {durationInFrames} = useVideoConfig();
	return (
		<AbsoluteFill>
			<Series>
				<Series.Sequence durationInFrames={30}>
					<PhoneCircle />
				</Series.Sequence>
				<Series.Sequence durationInFrames={50}>
					<Sequence from={-4}>
						<TwoScreens />
					</Sequence>
				</Series.Sequence>
				<Series.Sequence durationInFrames={40}>
					<Sequence from={-5}>
						<FourPhones />
					</Sequence>
				</Series.Sequence>
				<Series.Sequence durationInFrames={50}>
					<RealStickers phoneScale={1.3} />
				</Series.Sequence>
				<Series.Sequence durationInFrames={50}>
					<Title line1="Now in the" line2="App Store" />
				</Series.Sequence>
				<Series.Sequence durationInFrames={40}>
					<EndLogo />
				</Series.Sequence>
			</Series>
			<Audio
				src={rainforest}
				volume={(f) =>
					interpolate(
						f,
						[durationInFrames - 30, durationInFrames - 1],
						[1, 0],
						{
							extrapolateLeft: 'clamp',
						}
					)
				}
			/>
		</AbsoluteFill>
	);
};
