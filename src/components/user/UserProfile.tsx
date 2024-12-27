import { useQuery } from "@apollo/client";
import { GET_USER } from "@/queries";
import { UserData } from "@/types";
import UserCard from "./UserCard";
import StatsContainer from "./StatsContainer";
import ForkedRepos from "../charts/ForkedRepos";
import PopularRepos from "../charts/PopularRepos";
import UsedLanguages from "../charts/UsedLanguages";
import Loading from "./Loading";

type UserProfileProps = {
  userName: string;
};

const UserProfile = ({ userName }: UserProfileProps) => {
  const { loading, error, data } = useQuery<UserData>(GET_USER, {
    variables: { login: userName },
  });

  if (loading) {
    console.log("Loading data...");
    return <div><Loading/></div>;
  }

  if (error) {
    console.error("Error occurred:", error.message);
    return <h2 className="text-xl">{error.message}</h2>;
  }

  if (!data || !data.user) {
    console.warn("No user data found.");
    return <h2 className="text-xl">User Not Found.</h2>;
  }

  // If successful
  //console.log("Data retrieved successfully:", data);

  const {
    avatarUrl,
    name,
    bio,
    url,
    repositories,
    followers,
    following,
    gists,
  } = data.user;
  console.log(error, data);

  return (
    <div>
      <UserCard avatarUrl={avatarUrl} name={name} bio={bio} url={url} />
      <StatsContainer
        totalRepos={repositories.totalCount}
        followers={followers.totalCount}
        following={following.totalCount}
        gists={gists.totalCount}
      />
      {repositories.totalCount > 0 && (
        <div className="grid md:grid-cols-2 gap-4">
          <UsedLanguages repositories={repositories.nodes} />
          <PopularRepos repositories={repositories.nodes} />
          <ForkedRepos repositories={repositories.nodes} />
        </div>
      )}
    </div>
  );
};

export default UserProfile;
