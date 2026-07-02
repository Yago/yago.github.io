import React from 'react';

import CalendarHeatmap from 'react-calendar-heatmap';
import { PieChart } from 'react-minimal-pie-chart';

import contribs from '@/config/contribs.json';
import librairies from '@/config/librairies.json';

type Contrib = {
  date: string;
  count: number;
  intensity: number;
};

const pieData = [
  { title: 'CSS', value: 2, color: '#F48C06' },
  { title: 'Twig', value: 2, color: '#E85D04' },
  { title: 'JSON', value: 1, color: '#DC2F02' },
  { title: 'HTML', value: 1, color: '#D00000' },
  { title: 'Markdown', value: 1, color: '#9D0208' },
  { title: 'Other', value: 2, color: '#870614' },
  // { title: 'JS/JSX', value: 8, color: '#FAA307' },
  { title: 'TS/TSX', value: 8, color: '#FFBA08' },
];

const DevFacts = () => (
  <div className="dev-facts bg-gray-950 text-gray-100 dark:bg-gray-50">
    <div className="mx-auto max-w-screen-2xl px-4 py-16 md:px-14">
      <h2 className="font-medium text-2xl md:text-3xl lg:text-4xl dark:text-gray-900">
        Developer facts
      </h2>
      <div className="flex flex-wrap">
        <div className="mt-12 w-full md:w-1/2">
          <pre className="astro-code astro-code-hardcoded bg-[#2a2734] text-indigo dark:bg-[#e7e9f1] dark:text-[#8839EF]">
            <code>
              <span className="line block">
                <span>{'{'}</span>
              </span>
              <span className="line block">
                <span> "name"</span>
                <span>: </span>
                <span>"yago"</span>
                <span>,</span>
              </span>
              <span className="line block">
                <span> "profile"</span>
                <span>: </span>
                <span>"github.com/yago"</span>
                <span>,</span>
              </span>
              <span className="line block">
                <span> "editor"</span>
                <span>: </span>
                <span>"Cursor"</span>
                <span>,</span>
              </span>
              <span className="line block">
                <span> "platform"</span>
                <span>: </span>
                <span>"macOS"</span>
              </span>
              <span className="line block">
                <span>{'}'}</span>
              </span>
            </code>
          </pre>

          <div className="mt-16 dark:text-gray-900">
            <CalendarHeatmap
              startDate={new Date(contribs[0].date)}
              endDate={new Date(contribs.at(-1)?.date ?? '')}
              classForValue={(value: Contrib): string => {
                if (!value) {
                  return 'contrib-empty';
                }
                return `contrib-${value.intensity}`;
              }}
              values={contribs}
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
              labelStyle={(index) => ({
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
      <div className="mt-12 flex flex-wrap items-center space-x-4">
        <h3 className="font-medium text-gray-600 text-xl md:text-2xl dark:text-gray-500">
          Favorite tools
        </h3>
        <div className="h-0 flex-1 border-gray-800 border-t dark:border-gray-200" />
        {librairies.map((lib) => (
          // eslint-disable-next-line jsx-a11y/control-has-associated-label
          <a
            key={`lib-${lib.icon}`}
            href={lib.url}
            target="_blank"
            rel="noopener noreferrer"
            className="my-3 text-gray-600 transition-colors duration-200 hover:text-indigo dark:text-gray-500"
          >
            <span className="sr-only">{lib.icon} icon</span>
            <svg
              className="icon relative inline-flex items-center justify-center self-center text-4xl!"
              aria-hidden="true"
            >
              <use href={`/icons.svg#${lib.icon}`} />
            </svg>
          </a>
        ))}
      </div>
    </div>
  </div>
);

export default DevFacts;
