#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'path';
import { gql, GraphQLClient } from 'graphql-request';
import 'dotenv/config';

const getIntensity = (level) => {
  switch (level) {
    case 'NONE':
      return 0;
    case 'FIRST_QUARTILE':
      return 1;
    case 'SECOND_QUARTILE':
      return 2;
    case 'THIRD_QUARTILE':
      return 3;
    case 'FOURTH_QUARTILE':
      return 4;
    default:
      return 0;
  }
};

(async () => {
  try {
    const graphQLClient = new GraphQLClient(
      'https://api.github.com/graphql',
      {
        headers: {
          authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
      })

    const res = await graphQLClient.request(
      gql`
        query($username:String!) { 
          user(login: $username){
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                    contributionLevel
                    date
                  }
                }
              }
            }
          }
        }
      `,
      {
        "username": "Yago"
      }
    );

    const contribs = res.user.contributionsCollection.contributionCalendar.weeks.map(i => i.contributionDays.map(j => ({
      date: j.date,
      count: j.contributionCount,
      intensity: getIntensity(j.contributionLevel)
    }))).flat();

    fs.writeJson('./src/config/contribs.json', contribs, err => {
      if (err) return console.error(err)
      console.log('Contribs DB updated!')
    })
  } catch (e) {
    console.error("We've thrown! Whoops!", e);
  }
})();


