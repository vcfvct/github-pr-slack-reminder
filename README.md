## github PR slack reminder
Scan all the team repos and get summary then send slack message as a reminder.

## configuration
Need 3 items, can be on `process.env`, or in a `.gprconfig.yml` which is git ignored.

### Environment Var
* process.env.GITHUB_API 
* `process.env.GITHUB_TOKEN`, The readonly access level should be enough. Also in Jenkins this can be set as a `Mask passwords`.
* process.env.SLACK_URL

### Local yaml config
Modify below info and put into the `.gprconfig.yml` file in project root.
```yaml
### entperprise github or github.com
githubUrl: "https://github.xxx.company.com/api/graphql"
githubTokn: "YourGithubApiToken-ReadOnlyIsEnough"
### github incoming message hook url
slackUrl: "https://hooks.slack.com/services/Org/ChannelId/Token"
```

Locally run `npx ts-node src/index.ts` to test.

### Example
You can set up a Jenkins Job and run _6am East Time Monday to Friday_: `0 11 * * 1-5`

![slack](/asset/screenshot.png?raw=true "slack")

