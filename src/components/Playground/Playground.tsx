import React from 'react';
import {
  SandpackCodeEditor,
  SandpackPreview,
  SandpackProps,
  SandpackProvider,
  SandpackTheme,
  SandpackThemeProvider,
} from '@codesandbox/sandpack-react';
import clsx from 'clsx';

import Console from './Console';
import theme from './sandpack-theme.json';

export type Props = {
  terminal?: boolean;
  preview?: boolean;
  files: Record<string, string>;
  customSetup?: Record<string, Record<string, string>>;
  template?: SandpackProps['template'];
};

const Code = ({
  terminal = false,
  preview = false,
  files,
  customSetup = {},
  template,
}: Props): JSX.Element => (
  <div className="p-2 border rounded-lg bg-[#011627] border-[#011627] lg:w-[120%] lg:-translate-x-[8.3%] xl:w-[150%] xl:-translate-x-[16.6%]">
    <SandpackProvider
      template={template}
      customSetup={customSetup}
      files={{
        ...files,
        'log.ts': {
          code: `export default (...args) => {
              let input = args;
              if (!Array.isArray(input)) input = [args];
              console.log(...input);
            }`,
          hidden: true,
        },
      }}
    >
      <SandpackThemeProvider theme={theme as SandpackTheme} className="w-full">
        <div className="w-full lg:flex">
          <div
            className={clsx(
              'relative border-r border-[#243b4c]',
              preview || terminal ? 'lg:w-1/2' : 'w-full'
            )}
          >
            <SandpackCodeEditor
              showTabs
              showLineNumbers={false}
              showInlineErrors
              wrapContent
              closableTabs
            />
          </div>
          <div
            className={clsx(
              'flex bg-[#011627] lg:w-1/2',
              terminal && 'flex-col'
            )}
          >
            {preview && <SandpackPreview className="min-h-[450px]" />}
            {terminal && !preview && (
              <SandpackPreview className="h-0 min-w-0 flex-0" />
            )}
            {terminal && (
              <div className="w-full bg-[#011627]">
                <Console />
              </div>
            )}
          </div>
        </div>
      </SandpackThemeProvider>
    </SandpackProvider>
  </div>
);

export default Code;
