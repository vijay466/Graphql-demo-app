import { useQuery, gql } from "@apollo/client";

function UserDetails({ login }) {
  const GET_USER = gql`
    query GetUser($login: String!) {
      user(login: $login) {
        id
        login
        url
        avatar_url
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_USER, {
    variables: { login },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const user = data.user;

  return (
    <div>
      <h2>User Details</h2>
      <p>ID: {user.id}</p>
      <p>Login: {user.login}</p>
      <p>url: {user.url}</p>
      <img
        src={user.avatar_url}
        alt="Avatar"
        style={{ width: "100px", height: "100px" }}
      />
    </div>
  );
}

export default UserDetails;
