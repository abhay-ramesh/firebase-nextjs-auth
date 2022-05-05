import "../styles/globals.css";
import "../lib/firebaseconfig";
import aathu from "../lib/aathu";
import ToggleSignInSignUp from "../components/toggleSignInSignUp";

function MyApp({ Component, pageProps }) {
  const { user, isLoggedIn, loading } = aathu();

  if (loading) {
    return <p>Loading...</p>;
  }

  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "";
  console.log("App pathname: ", pathname);

  // if pathname starts with /app/ and user is not logged in, render toggle sign in sign up component
  if (pathname.startsWith("/app/") && !isLoggedIn) {
    return <ToggleSignInSignUp />;
  }

  pageProps.user = user;
  pageProps.isLoggedIn = isLoggedIn;
  return <Component {...pageProps} />;
}

export default MyApp;
