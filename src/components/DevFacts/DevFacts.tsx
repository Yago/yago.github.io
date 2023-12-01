import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import { PieChart } from 'react-minimal-pie-chart';
import { format, sub } from 'date-fns';

import Code from 'components/Code';
import Icon from 'components/Icon';
import { IconNames } from 'components/Icons/Icons';
import contribs from 'config/contribs.json';
import librairies from 'config/librairies.json';

type Contrib = {
  date: string;
  count: number;
  intensity: number;
};

const facts = {
  name: 'yago',
  profile: 'github.com/yago',
  editor: 'PhpStorm',
  platform: 'macOS',
};

const pieData = [
  { title: 'CSS', value: 2, color: '#F48C06' },
  { title: 'JSON', value: 1, color: '#E85D04' },
  { title: 'Twig', value: 1, color: '#DC2F02' },
  { title: 'HTML', value: 1, color: '#D00000' },
  { title: 'Markdown', value: 1, color: '#9D0208' },
  { title: 'Other', value: 2, color: '#870614' },
  { title: 'JS/JSX', value: 4, color: '#FFBA08' },
  { title: 'TS/TSX', value: 5, color: '#FAA307' },
];

const DevFacts = (): JSX.Element => (
  <div className="text-gray-100 bg-gray-950 dev-facts">
    <div className="px-4 py-16 mx-auto max-w-screen-2xl md:px-14">
      <h2 className="text-2xl font-medium md:text-3xl lg:text-4xl">
        Developer facts
      </h2>
      <div className="flex flex-wrap">
        <div className="w-full mt-12 md:w-1/2">
          <Code className="language-plain" theme="duotoneDark">
            {JSON.stringify(facts ?? '{}', null, 2)}
          </Code>
          <div className="mt-16">
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
              weekdayLabels={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
            />
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <div className="mx-auto lg:max-w-md">
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
      <div className="flex flex-wrap items-center mt-12 space-x-4">
        <h3 className="text-xl font-medium text-gray-600 md:text-2xl">
          Favorite tools
        </h3>
        <div className="flex-1 h-0 border-t border-gray-800" />
        {librairies.map(lib => (
          // eslint-disable-next-line jsx-a11y/control-has-associated-label
          <a
            key={`lib-${lib.icon}`}
            href={lib.url}
            target="_blank"
            rel="noopener noreferrer"
            className="my-3 text-gray-600 transition-colors duration-200 hover:text-indigo"
          >
            <Icon name={lib.icon as IconNames} className="text-4xl" />
          </a>
        ))}
      </div>
    </div>
  </div>
);

export default DevFacts;
