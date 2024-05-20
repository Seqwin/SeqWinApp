import { SerialPort } from 'serialport';

let port: SerialPort;

export const connectSerialPort = (setIsConnected: (isConnected: boolean) => void) => {
  port = new SerialPort({
    path: 'COM6',
    baudRate: 9600,
  });

  port.on('open', () => {
    console.log('Serial Port Opened');
    setIsConnected(true);
  });

  port.on('error', (err) => {
    console.error('Error: ', err.message);
    setIsConnected(false);
  });

  return port;
};

export const sendCommand = (command: string) => {
  if (port && port.isOpen) {
    port.write(command, (err) => {
      if (err) {
        return console.error('Error on write: ', err.message);
      }
      console.log('Message written');
    });
  } else {
    console.error('Port is not open');
  }
};
