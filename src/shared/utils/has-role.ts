// import { parseJwt } from './parse-jwt';

export function hasRole(allowedRoles: string[]): boolean {
  if (
    // parseJwt().roles.length === 0 &&
    allowedRoles.some((ar) => ar === 'ROLE_USER')
  ) {
    return true;
  } else if (
   
    allowedRoles.some((ar) => ar === 'ROLE_ADMIN')
  ) {
    return true;
  } else {
    for (let role of allowedRoles) {
     {
        return true;
      }
    }
  }

  return false;
}
