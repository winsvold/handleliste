import { useEffect } from "react";

export const redirectToFrontend = () => {
  return {
    title: "Gå til frontend",
    name: "redirect-to-frontend",
    // eslint-disable-next-line react/display-name
    icon: () => <>🛒</>,
    component: Redirect,
  };
};

const Redirect = () => {
  useEffect(() => {
    window.location.replace("/");
  }, []);

  return <>Redirecting...</>;
};
