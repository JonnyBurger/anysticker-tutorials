import {useLoader, useThree} from '@react-three/fiber';
import {ThreeCanvas} from '@remotion/three';
import React, {useEffect, useMemo} from 'react';
import {useVideoConfig} from 'remotion';
import * as THREE from 'three';
import {
	CAMERA_DISTANCE,
	getPhoneLayout,
	PHONE_COLOR,
	PHONE_CURVE_SEGMENTS,
	PHONE_SHININESS,
} from './helpers/layout';
import {roundedRect} from './helpers/rounded-rectangle';
import {RoundedBox} from './RoundedBox';
import screen from './screen.jpg';

const aspectRatio = 0.5;

type Props = {
	scale: number;
	rotate: [number, number, number];
	baseScale: number;
};

const InnerPhone: React.FC<Props> = ({scale, rotate, baseScale}) => {
	const layout = useMemo(() => getPhoneLayout(aspectRatio, baseScale), [
		baseScale,
	]);

	// Place a camera and set the distance to the object.
	// Then make it look at the object.
	const camera = useThree((state) => state.camera);
	useEffect(() => {
		camera.position.set(0, 0, CAMERA_DISTANCE);
		camera.near = 0.2;
		camera.far = Math.max(5000, CAMERA_DISTANCE * 2);
		camera.lookAt(0, 0, 0);
	}, [camera, layout.phone.position]);

	// Calculating the total rotation of the phone
	// Calculate a rounded rectangle for the phone screen
	const screenGeometry = useMemo(() => {
		return roundedRect({
			width: layout.screen.width,
			height: layout.screen.height,
			radius: layout.screen.radius,
		});
	}, [layout.screen.height, layout.screen.radius, layout.screen.width]);

	const texture = useLoader(THREE.TextureLoader, screen) as THREE.Texture;

	useEffect(() => {
		if (texture) {
			texture.repeat.y = 1 / layout.screen.height;
			texture.repeat.x = 1 / layout.screen.width;
		}
	}, [layout.screen.height, layout.screen.width, texture]);

	return (
		<group scale={scale} rotation={rotate}>
			<RoundedBox
				radius={layout.phone.radius}
				depth={layout.phone.thickness}
				curveSegments={PHONE_CURVE_SEGMENTS}
				position={layout.phone.position}
				width={layout.phone.width}
				height={layout.phone.height}
			>
				<meshPhongMaterial color={PHONE_COLOR} shininess={PHONE_SHININESS} />
			</RoundedBox>
			<mesh position={layout.screen.position}>
				<shapeGeometry args={[screenGeometry]} />
				<meshBasicMaterial color={0xffffff} map={texture} />
			</mesh>
		</group>
	);
};

export const Phone: React.FC<Props> = (props) => {
	const {width, height} = useVideoConfig();
	return (
		<ThreeCanvas linear width={width} height={height}>
			<InnerPhone {...props} />
		</ThreeCanvas>
	);
};
