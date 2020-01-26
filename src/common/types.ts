export interface PrAuthor {
  login: string;
  name?: string;
}

export interface User {
  userName: string;
  login: string;
}

export interface Team {
  teamName: string;
}

export type RequestedReviewer = User | Team;

export interface ReviewRequest {
  requestedReviewer: RequestedReviewer;
}

export interface ReviewRequestConnection {
  nodes: ReviewRequest[];
}

export interface PullRequest {
  repository: { name: string };
  title: string;
  createdAt: Date;
  updatedAt: Date;
  url: string;
  mergeStateStatus: MergeStateStatus;
  author: PrAuthor;
  reviewRequests: ReviewRequestConnection;
}

export interface PullRequestConnection {
  nodes: PullRequest[];
}

export interface PrGqlData {
  pullRequests: PullRequestConnection;
}

// on github dev preview
// https://developer.github.com/v4/previews/#mergeinfopreview---more-detailed-information-about-a-pull-requests-merge-state
export enum MergeStateStatus {
  // The head ref is out of date.
  BEHIND = 'BEHIND',
  // The merge is blocked.
  BLOCKED = 'BLOCKED',
  // Mergeable and passing commit status.
  CLEAN = 'CLEAN',
  // The merge commit cannot be cleanly created.
  DIRTY = 'DIRTY',
  // The merge is blocked due to the pull request being a draft.
  DRAFT = 'DRAFT',
  // Mergeable with passing commit status and pre-recieve hooks.
  HAS_HOOKS = 'HAS_HOOKS',
  // The state cannot currently be determined.
  UNKNOWN = 'UNKNOWN',
  // Mergeable with non-passing commit status.
  UNSTABLE = 'UNSTABLE',
}
