import React from 'react';
import {
	AbsoluteFill,
	Img,
	interpolate,
	spring,
	SpringConfig,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {JumpPhone} from '../JumpPhone';
import {output} from './data';

const svgPath = require('svg-path-properties');

const spacePerSticker = 280;
const stickersInSmallestCircle = 7;
const stickerSize = 200;

const RealStickers: React.FC<{
	phoneScale: number;
}> = ({phoneScale}) => {
	const videoConfig = useVideoConfig();
	const frame = useCurrentFrame();

	const springConfig: SpringConfig = {
		damping: 20,
		mass: 0.1,
		stiffness: 10,
		overshootClamping: false,
	};

	const baseSpring = spring({
		config: springConfig,
		from: 0,
		frame,
		fps: videoConfig.fps,
		to: 1,
	});

	const scale = interpolate(baseSpring, [0, 1], [0, 0.7]);
	const spaceBetweenCircle = interpolate(baseSpring, [0, 1], [0.7, 1]);

	const _cData = (function () {
		const data: {
			cx: number;
			cy: number;
			rx: number;
			ry: number;
			stickersLength: number;
		}[] = [];
		const circumferenceNeededForSmallestCircle =
			spacePerSticker * stickersInSmallestCircle;
		let radius = circumferenceNeededForSmallestCircle / (Math.PI * 2);
		data.push({
			cx: videoConfig.width / 2,
			cy: videoConfig.height / 2,
			rx: radius,
			ry: radius,
			stickersLength: stickersInSmallestCircle,
		});
		for (let i = 0; i < 10; i++) {
			const nextRadius = radius + spacePerSticker;
			radius = nextRadius;
			const stickersFittingInNextRadius = Math.floor(
				((radius * Math.PI * 2) / circumferenceNeededForSmallestCircle) *
					stickersInSmallestCircle
			);
			data.push({
				cx: videoConfig.width / 2,
				cy: videoConfig.height / 2,
				ry: nextRadius * spaceBetweenCircle,
				rx: nextRadius * spaceBetweenCircle,
				stickersLength: stickersFittingInNextRadius,
			});
		}
		return data;
	})();

	return (
		<div
			style={{
				width: videoConfig.width,
				height: videoConfig.height,
				backgroundColor: 'white',
			}}
		>
			<div
				style={{
					transform: `scale(${scale})`,
					width: videoConfig.width,
					height: videoConfig.height,
				}}
			>
				{output.map((o, i) => {
					const circle = (function () {
						let totalStickersFitted = 0;
						for (let j = 0; j < _cData.length; j++) {
							const c = _cData[j];
							totalStickersFitted += c.stickersLength;
							if (totalStickersFitted > i) {
								return {
									circle: j,
									indexOfCircle: i - totalStickersFitted + c.stickersLength,
								};
							}
						}
						throw new Error('wtf');
					})();
					const {cx, cy, rx, ry, stickersLength} = _cData[circle.circle];
					const d = `M${cx - rx},${cy}a${rx},${ry} 0 1,0 ${
						rx * 2
					},0a${rx},${ry} 0 1,0 -${rx * 2},0`;

					const p = svgPath.svgPathProperties(d);
					const length = p.getTotalLength();
					const direction = circle.circle % 2 ? -1 : 1;
					const currentPoint =
						(length / stickersLength) * circle.indexOfCircle +
						frame * 3 * direction;
					const point = p.getPointAtLength(
						(currentPoint + length * 1000) % length
					);
					return (
						<Img
							key={o.source}
							src={`https://anysticker.imgix.net/${o.source}?w=${stickerSize}&h=${stickerSize}&fm=png&fill=solid&fit=fill&auto=compress`}
							style={{
								position: 'absolute',
								left: point.x - stickerSize / 2,
								top: point.y - stickerSize / 2,
								width: stickerSize,
								height: stickerSize,
							}}
						/>
					);
				})}
			</div>
			<AbsoluteFill>
				<JumpPhone phoneScale={phoneScale} />
			</AbsoluteFill>
		</div>
	);
};

export default RealStickers;
