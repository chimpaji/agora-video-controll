import { ICameraVideoTrack, IMicrophoneAudioTrack } from 'agora-rtc-sdk-ng';
import React, { useState } from 'react';

import { Box } from '@mui/system';
import { useClient } from '../settings';

const Controls = ({
  tracks,
  setStart,
  setInCall,
}: {
  tracks: [IMicrophoneAudioTrack, ICameraVideoTrack];
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const client = useClient();
  const [trackState, setTrackState] = useState({ video: true, audio: true });

  const mute = async (type: 'audio' | 'video') => {
    if (type === 'audio') {
      await tracks[0].setEnabled(!trackState.audio);
      setTrackState((prevTrack) => ({
        ...prevTrack,
        audio: !trackState.audio,
      }));
    } else if (type === 'video') {
      await tracks[1].setEnabled(!trackState.video);
      setTrackState((prevTrack) => ({
        ...prevTrack,
        video: !trackState.video,
      }));
    }
  };

  const leaveChannel = async () => {
    await client.leave();
    setStart(false);
    setInCall(false);
    client.removeAllListeners();
    tracks[0].close();
    tracks[1].close();
  };

  return (
    <Box>
      <button onClick={() => mute('audio')}>
        {trackState.audio ? 'Mute' : 'Unmute'} Audio
      </button>
      <button onClick={() => mute('video')}>
        {trackState.video ? 'Mute' : 'Unmute'} Video
      </button>
      <button onClick={leaveChannel}>Leave</button>
    </Box>
  );
};

export default Controls;
