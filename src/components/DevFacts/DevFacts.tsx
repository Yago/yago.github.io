import React, { useEffect, useRef } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import { PieChart } from 'react-minimal-pie-chart';
import { jsx } from '@emotion/react';
import { format, sub } from 'date-fns';
import Prism from 'prismjs';
import { isNil } from 'ramda';
import tw from 'twin.macro';

import codeStyles from 'components/Code/Code.styles';
import Icon from 'components/Icon';
import { IconNames } from 'components/Icons/Icons';
import contribs from 'config/contribs.json';
import librairies from 'config/librairies.json';

import styles from './DevFacts.styles';

type Contrib = {
  date: string;
  count: number;
  intensity: number;
};

const facts = {
  name: 'yago',
  profile: 'github.com/yago',
  editor: 'VSCode',
  platform: 'macOS',
};

const pieData = [
  { title: 'CSS', value: 2, color: '#F48C06' },
  { title: 'JSON', value: 1, color: '#E85D04' },
  { title: 'Twig', value: 1, color: '#DC2F02' },
  { title: 'HTML', value: 1, color: '#D00000' },
  { title: 'Markdown', value: 1, color: '#9D0208' },
  { title: 'Oher', value: 2, color: '#6A040F' },
  { title: 'JS/JSX', value: 4, color: '#FFBA08' },
  { title: 'TS/TSX', value: 5, color: '#FAA307' },
];

const DevFacts = (): JSX.Element => {
  const codeElement = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isNil(codeElement?.current)) {
      Prism.highlightElement(codeElement.current);
    }
  }, [codeElement]);

  return (
    <div tw="text-gray-100 bg-gray-950" css={styles}>
      <div tw="px-4 py-16 mx-auto max-w-screen-2xl md:px-14">
        <h2 tw="text-2xl font-medium md:text-3xl lg:text-4xl">
          Developer facts
        </h2>
        <div tw="flex flex-wrap">
          <div tw="w-full mt-12 md:w-1/2" css={codeStyles}>
            <pre className="line-numbers" tw="rounded">
              <code ref={codeElement} className="json">
                {JSON.stringify(facts, null, 2)}
              </code>
            </pre>
            <div tw="mt-16">
              <CalendarHeatmap
                startDate={format(sub(new Date(), { years: 1 }), 'yyyy-MM-dd')}
                classForValue={(value: Contrib): string => {
                  if (!value) {
                    return 'contrib-empty';
                  }
                  return `contrib-${value.intensity}`;
                }}
                endDate={format(new Date(), 'yyyy-MM-dd')}
                values={contribs.contributions}
                showWeekdayLabels
                weekdayLabels={[
                  'Sun',
                  'Mon',
                  'Tue',
                  'Wed',
                  'Thu',
                  'Fri',
                  'Sat',
                ]}
              />
            </div>
          </div>
          <div tw="w-full md:w-1/2">
            <div tw="mx-auto lg:max-w-md">
              <PieChart
                data={pieData}
                label={({ dataEntry }) => dataEntry.title}
                labelStyle={index => ({
                  fill: pieData[index].color,
                  fontSize: '3.5px',
                })}
                lineWidth={50}
                labelPosition={115}
                radius={35}
              />
            </div>
          </div>
        </div>
        <div tw="flex flex-wrap items-center mt-12 space-x-4">
          <h3 tw="text-xl font-medium text-gray-600 md:text-2xl">
            Favorite tools
          </h3>
          <div tw="flex-1 h-0 border-t border-gray-800" />
          {librairies.map(lib => (
            <a
              key={`lib-${lib.icon}`}
              href={lib.url}
              target="_blank"
              rel="noopener noreferrer"
              tw="my-3 text-gray-600 transition-colors duration-200 hover:text-indigo"
            >
              <Icon name={lib.icon as IconNames} tw="text-4xl" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

DevFacts.defaultProps = {};

export default DevFacts;
