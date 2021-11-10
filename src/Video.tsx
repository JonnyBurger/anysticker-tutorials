import {Composition, Still} from 'remotion';
import {Announcement} from './Announcement';
import {FourPhones} from './FourPhones';
import {PhoneCircle} from './PhoneCircle';
import {RealStill} from './RealStickers/RealStill';
import {TwoScreens} from './TwoScreens';
import {Welcome} from './Welcome';

export const RemotionVideo: React.FC = () => {
	return (
		<>
			<Composition
				component={Welcome}
				id="Welcome"
				durationInFrames={31 * 30}
				width={1080}
				height={1920}
				fps={30}
				defaultProps={{
					phoneScale: 1,
				}}
			/>
			<Composition
				id="springy"
				lazyComponent={() => import('./Springy')}
				width={1080}
				height={1920}
				fps={30}
				durationInFrames={60}
			/>
			<Composition
				id="screen-showcase"
				lazyComponent={() => import('./ScreenShowcase')}
				width={1080}
				height={1920}
				fps={30}
				durationInFrames={100}
			/>
			<Composition
				id="real-stickers"
				lazyComponent={() => import('./RealStickers')}
				width={1080}
				height={1920}
				fps={30}
				durationInFrames={30 * 2.2}
				defaultProps={{
					phoneScale: 1,
				}}
			/>
			<Composition
				id="layout"
				lazyComponent={() => import('./Layout')}
				width={1080}
				height={1920}
				fps={30}
				durationInFrames={3 * 30}
			/>
			<Composition
				id="end-logo"
				lazyComponent={() => import('./Circle')}
				width={1080}
				height={1920}
				fps={30}
				durationInFrames={3 * 30}
			/>
			<Composition
				id="big-rotate"
				lazyComponent={() => import('./BigRotate')}
				width={1080}
				height={1080}
				fps={60}
				durationInFrames={3 * 30}
			/>
			<Still
				id="banner"
				component={RealStill}
				width={2048}
				height={1000}
				defaultProps={{
					phoneScale: 1.8,
				}}
			/>
			<Composition
				id="announcement"
				durationInFrames={250}
				fps={30}
				component={Announcement}
				width={1080}
				height={1080}
			/>
			<Composition
				id="two-screens"
				durationInFrames={90}
				fps={30}
				component={TwoScreens}
				width={1080}
				height={1080}
			/>
			<Composition
				id="circle-screens"
				durationInFrames={90}
				fps={30}
				component={PhoneCircle}
				width={1080}
				height={1080}
				defaultProps={{}}
			/>
			<Composition
				id="four-phones"
				durationInFrames={90}
				fps={30}
				component={FourPhones}
				width={1080}
				height={1080}
				defaultProps={{}}
			/>
		</>
	);
};
