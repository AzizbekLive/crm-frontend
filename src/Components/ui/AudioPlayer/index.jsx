import React, { useState } from 'react';
import { AudioPlayer as AudioPlayerComponent } from 'react-audio-player-component';

import { useLayoutStore } from '../../../stores/layouts';

const AudioPlayer = () => {
    const { layoutModeType } = useLayoutStore();
    return (
        <AudioPlayerComponent
            src="/music.mp3"
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
