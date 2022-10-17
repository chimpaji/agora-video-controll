import {
  APP_ID,
  TEMP_TOKEN,
  config,
  useClient,
  useMicrophoneAndCameraTracks,
} from '../settings';
import { useEffect, useState } from 'react';

import Controls from './Controls';
import { IAgoraRTCRemoteUser } from 'agora-rtc-sdk-ng';
import Videos from './Videos';

export const VideoCall = ({
  setInCall,
  channelName,
}: {
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
  channelName: string;
}) => {
  const [users, setUsers] = useState<IAgoraRTCRemoteUser[]>([]);
  const [start, setStart] = useState(false);
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();

  useEffect(() => {
    let init = async (name: string) => {
      client.on('user-published', async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        if (mediaType === 'video') {
          setUsers((prevUsers) => [...prevUsers, user]);
        }
        if (mediaType === 'audio') {
          user?.audioTrack?.play();
        }
      });

      client.on('user-unpublished', (user, mediaType) => {
        console.log('unpublished', user, mediaType);
        if (mediaType === 'audio') {
          user.audioTrack?.stop();
        }
        if (mediaType === 'video') {
          setUsers((prevUsers) => {
            return prevUsers.filter((User) => User.uid !== user.uid);
          });
        }
      });

      client.on('user-left', (user) => {
        console.log('leaving', user);
        setUsers((prevUsers) => prevUsers.filter((u) => u.uid !== user.uid));
      });

      client.on('user-joined', (user) => {
        setUsers((prevUsers) => [...prevUsers, user]);
      });

      await client.join(APP_ID, name, TEMP_TOKEN, null);
      if (tracks) await client.publish([tracks[0], tracks[1]]);
      setStart(true);
    };

    if (ready && tracks) {
      console.log('init ready');
      init(channelName);
    }
  }, [channelName, client, ready, tracks]);

  return (
    <div className='App'>
      {ready && tracks && (
        <Controls tracks={tracks} setStart={setStart} setInCall={setInCall} />
      )}
      {start && tracks && <Videos users={users} tracks={tracks} />}
    </div>
  );
};
