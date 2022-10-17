import {
  IAgoraRTCRemoteUser,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
} from 'agora-rtc-sdk-ng';

import { AgoraVideoPlayer } from 'agora-rtc-react';
import { Box } from '@mui/material';
import React from 'react';

const Videos = (props: {
  users: IAgoraRTCRemoteUser[];
  tracks: [IMicrophoneAudioTrack, ICameraVideoTrack];
}) => {
  const { users, tracks } = props;

  return (
    <Box>
      <Box>
        <AgoraVideoPlayer
          videoTrack={tracks[1]}
          style={{ width: '200px', height: '200px' }}
        />
        {users?.length &&
          users.map((user) => {
            if (user.videoTrack) {
              return (
                <AgoraVideoPlayer
                  videoTrack={user.videoTrack}
                  style={{ height: '200px', width: '200px' }}
                />
              );
            } else return null;
          })}
      </Box>
    </Box>
  );
};

export default Videos;
