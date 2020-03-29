export class User {
  id: string;
  name: string;
  surname: string;
  roles: Array<Role>;
}


class Role {
  name: string;
  privileges: Array<string>;
}
