import React, { useRef, useEffect } from 'react';
import { AudioPlayer as AudioPlayerComponent } from 'react-audio-player-component';

const AudioPlayer = ({ src }) => {
    const playerRef = useRef(null);

    useEffect(() => {
        return () => {
            // Stop playback when component unmounts
            console.log({ playerRef: playerRef });

            if (playerRef.current) {
                const audioElement = playerRef.current.querySelector('audio');
                console.log(audioElement);

                if (audioElement) {
                    audioElement.pause();
                    audioElement.currentTime = 0; // Optional: reset to beginning
                }
            }
        };
    }, []);

    return (
        <AudioPlayerComponent
            ref={playerRef}
            src={src}
            minimal={true}
            width={350}
            trackHeight={75}
            barWidth={4}
            gap={1}
            visualise={true}
            skipDuration={2}
            showLoopOption={true}
            showVolumeControl={true}
            seekBarColor="#2e90fa"
            volumeControlColor="#2e90fa"
            hideTrackKnobWhenPlaying={true}
        />
    );
};

export default AudioPlayer;
