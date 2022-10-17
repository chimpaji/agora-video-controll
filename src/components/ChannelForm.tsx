import { Box } from '@mui/system';
import React from 'react';

const ChannelForm = ({
  setInCall,
  setChannelName,
}: {
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
  setChannelName: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <Box>
      <form>
        <input
          type='text'
          placeholder='Enter Channel Name'
          onChange={(e) => setChannelName(e.target.value)}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            setInCall(true);
          }}
        >
          Join
        </button>
      </form>
    </Box>
  );
};

export default ChannelForm;
