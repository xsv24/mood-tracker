import gql from 'graphql-tag';

export const GET_LOGS = gql`
    query Logs($id: String!) {
        userLogs(id: $id) {
            id,
            feeling
            mood
            comment,
            createdDate,
            updatedDate
        }
    }
`;