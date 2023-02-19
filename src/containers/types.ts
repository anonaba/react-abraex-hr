export interface RouteTypes {
  path: string;
  name: string;
  component: React.LazyExoticComponent<() => JSX.Element>;
}

export interface User {
  firstName: string;
  lastName: string;
  profilePic: string;
}
