export const PrRequestFragment = `
  pullRequests(states: [OPEN], last: 10) {
    nodes {
      repository {
        name
      }
      title,
      createdAt,
      updatedAt,
      url
      mergeStateStatus
      author {
        login
        ... on User {
          name
        }
      },
      reviewRequests(first: 10) {
        nodes{
          requestedReviewer{
            ... on User {
              userName: name
              login
            }
            ... on Team {
              teamName: name

            }
          },

        }
      }
    }
  }
`;
