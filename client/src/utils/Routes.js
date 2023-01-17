const PUBLIC_ROUTES = [{ label: "Devices", path: "/device" }];

const AUTHORIZED_ROUTES = [
  {
    label: "Log Out",
  },
];

const UNAUTHORIZED_ROUTES = [
  { label: "Log In", path: "/login" },
  { label: "Register", path: "/registration" },
];

export { AUTHORIZED_ROUTES, UNAUTHORIZED_ROUTES, PUBLIC_ROUTES };
