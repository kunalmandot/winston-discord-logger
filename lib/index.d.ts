import Transport from 'winston-transport';

export interface DiscordLoggerOptions extends Transport.TransportStreamOptions {
  /**
   * Discord incoming webhook.
   */
  webhook: string;

  /**
   * Theme color of the message (Default: 16711680).
   */
  color?: number;

  /**
   * Title of the message (Default: Alert).
   */
  title?: string;

  /**
   * Custom function to formate messages. This function accepts the info object ([see Winston documentation](https://github.com/winstonjs/winston/blob/master/README.md#streams-objectmode-and-info-objects)) and must return an object containing description and fields which is an array of object containing three required fields name, value and inline as shown in the usage.
   */
  formatter: (info: {
    level: string;
    [key: string]: any;
  }) => {
    description: string;
    fields: {
      name: string;
      value: string;
      inline: boolean;
    }[]
  };
}

declare class DiscordLogger extends Transport {
  constructor(options: DiscordLoggerOptions);
}

export default DiscordLogger;
