import { MergeStateStatus, PullRequest } from '../common/types';
import { AnmialEmojis } from '../common/const';
import { RuntimeConifg } from '../config/config';
import * as request from 'request-promise-native';

export class SlackService {
  /**
   * send given message to Slack
   **/
  static send(text: string): Promise<any> {
    return request.post(RuntimeConifg.slackUrl, {
      body: {
        text,
        'icon_emoji': ':bell:',
      },
      json: true,
    });
  }

  static composeMessage(prs: Array<PullRequest>): string {
    if (prs?.length) {
      const prGroupedByUser = prs.reduce((acc: { [key: string]: Array<PullRequest> }, pr) => {
        const key = pr.author.login;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(pr);
        return acc;
      }, {});
      const groupedPrs = Object.values(prGroupedByUser);
      const pickedEmojis = AnmialEmojis.sort(() => Math.random() - Math.random()).slice(0, groupedPrs.length);
      const groupedMsg = groupedPrs.map((prs, index) => {
        const userMsgs = [];
        userMsgs.push(`${pickedEmojis[index]} *${prs[0].author.name}*`);
        const prMsgs = prs.map(this.buildPrMsg);
        return userMsgs.concat(prMsgs).join('\n');
      });
      return groupedMsg.join('\n\n\n');
    } else {
      return ':heart: Great job! No active PR.';
    }
  }

  static buildPrMsg(pr: PullRequest): string {
    const prMsgs = [];
    prMsgs.push(` _${new Date(pr.createdAt).toLocaleString()}_ :mantelpiece_clock:`);
    prMsgs.push(`status: _${pr.mergeStateStatus}_ ${SlackService.getStatusEmoji(pr.mergeStateStatus)}`);
    prMsgs.push(` _${pr.repository.name}_ :github:`);
    prMsgs.push(`PR: <${pr.url}|*${pr.title}*>`);
    // prMsgs.push(`author: ${pr.author.login}/*${pr.author.name}*`);
    // prMsgs.push(`(<${pr.url}|OPEN>)`);
    return `    ° ${prMsgs.join(' | ')}`;
  }

  static getStatusEmoji(status: MergeStateStatus): string {
    switch (status) {
      case MergeStateStatus.CLEAN:
      case MergeStateStatus.HAS_HOOKS:
        return ':white_check_mark:';
      default:
        return ':x:';
    }
  }

}
