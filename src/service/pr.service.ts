import { orgConfigs } from '../config/config';
import { PrRequestFragment } from '../common/GqlFragment';
import { PrGqlData, PullRequest } from '../common/types';
import { RuntimeConifg } from '../config/config';
import * as request from 'request-promise-native';

export class PrService {
  /**
   * get all PRs from repos specified in configuration.
   **/
  static async getPullRequests(): Promise<Array<PullRequest>> {
    const gql = this.buildPrQuery();
    const rs = await request.post(RuntimeConifg.githubUrl, {
      body: { query: gql },
      headers: {
        Authorization: `token ${RuntimeConifg.githubTokn}`,
        Accept: 'application/vnd.github.merge-info-preview+json',
      },
      json: true,
    });
    const prRes: { [key: string]: PrGqlData } = rs.data;
    return Object.values(prRes)
      .map(value => value.pullRequests.nodes)
      .filter(pr => pr.length)
      .flat();
  }

  static buildPrQuery(): string {
    const orgQueries = orgConfigs.map(o => {
      const repoQueries = o.repos.map(r =>
        `
        ${this.normalizeQueryName(o.name, r)}: repository(owner: "${o.name}", name: "${r}"){
          ${PrRequestFragment}
        }
        `,
      );
      return repoQueries.join(' ');
    });
    return `
        query {
          ${orgQueries.join(' ')}
        }
        `;
  }

  static normalizeQueryName(org: string, repo: string): string {
    const s = `${org}___${repo}`;
    return s.replace(/-/g, '_');
  }

}

// polyfill the `flat` funciton in case nodejs runtime is < 11.x
!Array.prototype.flat && Object.defineProperty(Array.prototype, 'flat', {
  value: function(depth: any = 1) {
    return this.reduce((flat: any, toFlatten: any) => {
      return flat.concat((Array.isArray(toFlatten) && (depth > 1)) ? toFlatten.flat(depth - 1) : toFlatten);
    }, []);
  },
});

