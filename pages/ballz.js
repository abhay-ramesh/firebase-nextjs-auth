// Create React test page to check authentication:
export default function Test({ user }) {
  return (
    <div>
      <h1>User is logged in</h1>
      <p>User info: {user.email}</p>
    </div>
  );
}
