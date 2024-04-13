import Role from "src/users/role.enum";
export default class UserPublicJwtDto {
    sub: number;
    roles: Role[];
}
