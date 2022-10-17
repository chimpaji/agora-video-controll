import ChannelForm from './components/ChannelForm';
import { VideoCall } from './components/VideoCall';
import { useState } from 'react';

function App() {
  const [inCall, setInCall] = useState(false);
  const [channelName, setChannelName] = useState('');

  return (
    <div>
      <h1 className='heading'>Agora video with controller</h1>
      {inCall ? (
        <VideoCall setInCall={setInCall} channelName={channelName} />
      ) : (
        <ChannelForm setChannelName={setChannelName} setInCall={setInCall} />
      )}
    </div>
  );
}

export default App;
