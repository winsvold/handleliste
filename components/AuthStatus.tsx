import styled from "styled-components";
import useSWR from "swr";
import { getStudioUrl, sanityClient } from "../utils/sanity";

const AuthStyle = styled.div`
  display: flex;
  background-color: #aaa5;
  padding: 0.5rem 1rem;
  width: 100%;
  justify-content: flex-end;
  img {
    margin-left: 0.5rem;
    width: 1.5rem;
    border-radius: 50%;
    border: 0.1rem white solid;
  }
`;

interface AuthStatus {
  name?: string;
  profileImage?: string;
}

const fetcher = (url: string): Promise<AuthStatus> => fetch(url, { credentials: "include" }).then((it) => it.json());

// @ts-ignore
const { url } = sanityClient.config();

function AuthStatus() {
  const { data: authStatus, error } = useSWR<AuthStatus>(`${url}/users/me`, fetcher);

  const erLoggetInn = authStatus?.name !== undefined;

  if (!authStatus && !error) {
    return null;
  }

  if (erLoggetInn) {
    const initials = authStatus?.name?.split(" ").map((it) => it[0]);
    return (
      <AuthStyle>
        {initials}
        <img src={authStatus?.profileImage} alt="" />
      </AuthStyle>
    );
  }

  return (
    <AuthStyle>
      Du er ikke logget inn <a href={getStudioUrl()}>Logg inn</a>
    </AuthStyle>
  );
}

export default AuthStatus;
