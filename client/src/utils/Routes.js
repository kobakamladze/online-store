const PUBLIC_ROUTES = [{ label: "Devices", path: "/device" }];

const AUTHORIZED_ROUTES = [{ label: "Log Out", path: "/logout" }];

const UNAUTHORIZED_ROUTES = [
  { label: "Log In", path: "/login" },
  { label: "Register", path: "/register" },
];

export { AUTHORIZED_ROUTES, UNAUTHORIZED_ROUTES, PUBLIC_ROUTES };
