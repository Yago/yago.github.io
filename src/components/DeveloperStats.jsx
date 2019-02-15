import React, { useState } from 'react';
import axios from 'axios';
import CalendarHeatmap from 'react-calendar-heatmap';
import moment from 'moment';

import 'react-calendar-heatmap/dist/styles.css';

import libraries from '../config/libraries.json';
import Icon from './Icon';
import Pie from './Pie';

const facts = stats => `
<pre class="dev-facts">
<i>{</i>
<i>  "name": "<i class="text-primary">yago</i>",</i>
<i>  "profile": "<a class="link-primary" href="https://github.com/yago/" target="_blank"><i class="text-primary">github.com/yago</i></a>",</i>
<i>  "time_total": "<i class="text-primary">${
  stats.data ? stats.data.human_readable_total : ''
}</i>",</i>
<i>  "editor": "<i class="text-primary">vscode</i>",</i>
<i>  "platform": "<i class="text-primary">macOS</i>"</i>
<i>}</i>
</pre>
<p class="text-right text-muted text-sm text-sans">
  Last year data : <a class="link-primary" href="https://wakatime.com/@yago" target="_blank">Wakatime</a>
</p>
`;

const DeveloperStats = () => {
  // Refactor call using Redux
  const [contributions, setContributions] = useState({});
  const [stats, setStats] = useState({});

  if (contributions.data === undefined) {
    axios.get('http://api.yago.io/stats/').then((res) => {
      setStats(res.data);
    });
  }

  if (contributions.contributions === undefined) {
    axios.get('https://github-contributions-api.now.sh/v1/yago').then((res) => {
      setContributions(res.data);
    });
  }

  return (
    <div className="bg-dark mt-4 py-4">
      <div className="container-fluid">
        <h2>Developer facts</h2>

        <div className="row mb-2">
          <div className="col-md-6 mt-2">
            <div dangerouslySetInnerHTML={{ __html: facts(stats) }} />

            <div className="mt-3">
              {contributions.contributions && contributions.contributions.length > 0 && (
                <CalendarHeatmap
                  startDate={
                    new Date(
                      moment()
                        .subtract(1, 'years')
                        .format('YYYY-MM-DD'),
                    )
                  }
                  classForValue={(value) => {
                    if (!value) {
                      return 'color-empty';
                    }
                    return `contrib-${value.intensity}`;
                  }}
                  endDate={new Date(moment().format('YYYY-MM-DD'))}
                  values={contributions.contributions}
                  showWeekdayLabels
                  weekdayLabels={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
                />
              )}
            </div>
          </div>
          <div className="col-md-6 d-flex align-items-center">
            {stats.data && <Pie stats={stats} />}
          </div>
        </div>

        <div className="libraries">
          <h3 className="h6 text-muted">Favorite tools</h3>
          <span className="border-bottom" />
          {libraries.map(lib => (
            <a href={lib.url} target="_blank" key={lib.icon}>
              <Icon icon={lib.icon} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeveloperStats;
