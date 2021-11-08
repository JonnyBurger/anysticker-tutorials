import {Freeze} from 'remotion';
import RealStickers from '.';

export const RealStill: React.FC<{
	phoneScale: number;
}> = ({phoneScale}) => {
	return (
		<Freeze frame={16}>
			<RealStickers phoneScale={phoneScale} />
		</Freeze>
	);
};
