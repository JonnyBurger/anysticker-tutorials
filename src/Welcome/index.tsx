import React from 'react';
import {Audio, Series} from 'remotion';
import BigRotate from '../BigRotate';
import EndLogo from '../Circle';
import Layout from '../Layout';
import RealStickers from '../RealStickers';
import ScreenShowcase from '../ScreenShowcase';
import Springy from '../Springy';
import {Title} from '../Title';
import {Transition} from '../Transition';
import audio from './audio.mp4';

export const Welcome: React.FC<{
	phoneScale: number;
}> = ({phoneScale}) => {
	const yourselfGetImage = (f: number) =>
		require('./stickerify-yourself/Untitled Frame ' + (f + 20) + '.png');
	const objectGetImage = (f: number) =>
		require('./stickerify-object/Untitled Frame ' + (f + 4) + '.png');
	const objectGetScroll = (f: number) =>
		require('./scroll-packs/Untitled Frame ' + (f + 1) + '.png');
	const objectGetThousands = (f: number) =>
		require('./thousands-packs/Untitled Frame ' + (f + 6) + '.png');
	const objectGetReorder = (f: number) =>
		require('./reorder-stickers/Untitled Frame ' + (f + 70) + '.png');
	const objectGetJuicy = (f: number) =>
		require('./juicy/Untitled Frame ' + (f + 1) + '.png');

	return (
		<div style={{flex: 1, display: 'flex', backgroundColor: 'white'}}>
			<Series>
				<Series.Sequence durationInFrames={40}>
					<BigRotate />
				</Series.Sequence>
				<Series.Sequence durationInFrames={60}>
					<Title line1="Welcome to" line2="AnySticker" />
				</Series.Sequence>
				<Series.Sequence durationInFrames={70}>
					<Layout />
				</Series.Sequence>
				<Series.Sequence durationInFrames={80}>
					<Transition type="out">
						<ScreenShowcase
							animateIn
							title="Stickerize yourself"
							getImage={yourselfGetImage}
						/>
					</Transition>
				</Series.Sequence>
				<Series.Sequence durationInFrames={70}>
					<Transition type="in">
						<Transition type="out">
							<ScreenShowcase
								title="Stickerize anything"
								getImage={objectGetImage}
								animateIn={false}
							/>
						</Transition>
					</Transition>
				</Series.Sequence>
				<Series.Sequence durationInFrames={60}>
					<Transition type="in">
						<Transition type="out">
							<ScreenShowcase
								title="Explore sticker packs"
								getImage={objectGetScroll}
								animateIn={false}
							/>
						</Transition>
					</Transition>
				</Series.Sequence>
				<Series.Sequence durationInFrames={60}>
					<Transition type="in">
						<Transition type="out">
							<ScreenShowcase
								title="Thousands of stickers"
								getImage={objectGetThousands}
								animateIn={false}
							/>
						</Transition>
					</Transition>
				</Series.Sequence>
				<Series.Sequence durationInFrames={80}>
					<Transition type="in">
						<Transition type="out">
							<ScreenShowcase
								title="Collect stickers"
								getImage={objectGetReorder}
								animateIn={false}
							/>
						</Transition>
					</Transition>
				</Series.Sequence>
				<Series.Sequence durationInFrames={90}>
					<Transition type="in">
						<Transition type="out">
							<ScreenShowcase
								title="Share anywhere"
								getImage={objectGetJuicy}
								animateIn={false}
							/>
						</Transition>
					</Transition>
				</Series.Sequence>
				<Series.Sequence durationInFrames={90}>
					<RealStickers phoneScale={phoneScale} />
				</Series.Sequence>
				<Series.Sequence durationInFrames={70}>
					<Title line1="The power is" line2="in your hands." />
				</Series.Sequence>
				<Series.Sequence durationInFrames={100}>
					<Springy />
				</Series.Sequence>
				<Series.Sequence durationInFrames={75}>
					<EndLogo />
				</Series.Sequence>
			</Series>
			<Audio src={audio} />
		</div>
	);
};
