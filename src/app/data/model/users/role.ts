enum PrivilegeType {
  ADMINISTRATOR, USER, TEACHER
}

export class Role {
  name: string;
  privileges: PrivilegeType;
}
