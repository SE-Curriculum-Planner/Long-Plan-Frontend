import { ApiRouteKey } from "common/constants/keys";
import { coreApi } from "core/connections";
import { UserDTO } from "types";

/* user data */
export function getUserDataQuery(): Promise<UserDTO> {
  return new Promise((resolve, reject) => {
    coreApi
      .get(ApiRouteKey.MyData)
      .then((res) => resolve(res.data.result))
      .catch(reject);
  });
}
