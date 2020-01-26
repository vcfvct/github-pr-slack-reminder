import * as fs from 'fs';
import * as y from 'js-yaml';

export interface OrgConfig {
  name: string;
  repos: string[];
};

export const orgConfigs: Array<OrgConfig> = [
  {
    name: 'Marketing-Tech',
    repos: [
      'ngx-locations-admin',
      'locations-internal-api',
      'bank-planet-v2',
      'locations-finder-public',
      'lf-public-api-lambda',
      'akamai-federation',
      'dynamodb-stream-redis',
      'lf-common',
      'lf-utils',
      'bank-planet-v2-e2e',
      'lf-e2e-public',
      'alusky-eslint-config',
    ],
  },
  {
    name: 'NeX',
    repos: [
      'cafe-microsite-planet',
    ],
  },
  {
    name: 'CafeTech-Serverless',
    repos: [
      'cafe-events-search-with-roswell',
      'esa-internal-api',
      'esa-model',
    ],
  },
];

export interface IRuntimeConifg {
  githubUrl: string;
  githubTokn: string;
  slackUrl: string;
}

export const RuntimeConifg: IRuntimeConifg = {
  githubUrl: process.env.GITHUB_API || '',
  githubTokn: process.env.GITHUB_TOKEN || '',
  slackUrl: process.env.SLACK_URL || '',
};

(() => {
  const configFilePath = '.gprconfig.yml';
  try {
    if (fs.existsSync(configFilePath)) {
      const config: IRuntimeConifg = y.safeLoad(fs.readFileSync(configFilePath, 'utf8'));
      !RuntimeConifg.githubUrl && (RuntimeConifg.githubUrl = config.githubUrl);
      !RuntimeConifg.githubTokn && (RuntimeConifg.githubTokn = config.githubTokn);
      !RuntimeConifg.slackUrl && (RuntimeConifg.slackUrl = config.slackUrl);
    }
  } catch (e) {
    console.error(e);
  }
})();


