import styled from "styled-components";
import useSWR from "swr";
import { getStudioUrl, sanityClient } from "../utils/sanity";
import Image from "next/image";

const AuthStyle = styled.a`
  display: flex;
  align-items: center;
  justify-self: flex-end;
  color: white;
  text-decoration: none;
  `;

const ImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  margin-left: 0.5rem;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  border: 0.1rem white solid;
`;

interface AuthStatus {
  name?: string;
  profileImage?: string;
}

// @ts-ignore
const { url } = sanityClient.config();

export function useAuth() {
  return useSWR(`currentSanityUser`, () => sanityClient.users.getById("me"));
}

function AuthStatus() {
  const { data: authStatus, error } = useAuth();

  const erLoggetInn = authStatus?.name !== undefined;

  if (!authStatus && !error) {
    return null;
  }

  if (erLoggetInn) {
    const initials = authStatus?.name?.split(" ").map((it) => it[0]);
    return (
      <AuthStyle href={getStudioUrl()}>
        {initials}
        {authStatus?.profileImage && (
          <ImageWrapper>
            <Image src={authStatus?.profileImage} alt="" layout="fill" />
          </ImageWrapper>
        )}
      </AuthStyle>
    );
  }

  return <AuthStyle href={getStudioUrl()}>Logg inn</AuthStyle>;
}

export default AuthStatus;
