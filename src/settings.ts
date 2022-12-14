import {
  ClientConfig,
  createClient,
  createMicrophoneAndCameraTracks,
} from 'agora-rtc-react';

export const APP_ID = import.meta.env.VITE_APP_ID;
export const CHANNEL_NAME = import.meta.env.VITE_CHANNEL_NAME;
export const TEMP_TOKEN = import.meta.env.VITE_TEMP_TOKEN;

export const config: ClientConfig = {
  mode: 'rtc',
  codec: 'vp8',
};

export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
