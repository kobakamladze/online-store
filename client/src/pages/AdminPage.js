const Auth = () => {
  const isAuth = false;
  if (!isAuth) return <div>AUTHORIZE FIRST</div>;

  return <div>ADMIN PANEL</div>;
};

export default Auth;
