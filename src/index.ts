import { PrService } from './service/pr.service';
import { SlackService } from './service/slack.service';
import { PullRequest } from './common/types';

(async () => {
  const prs: Array<PullRequest> = await PrService.getPullRequests();
  const msg: string = SlackService.composeMessage(prs);
  console.info(msg);
  try {
    const rs = await SlackService.send(msg);
    console.info(rs);
  } catch (e) {
    console.error(e);
  }
})();
