import { getUserDataQuerySelector } from "common/apis/selectors";
import { LocalStorageKey } from "common/constants/keys";

export async function validateLocalToken() {
  try {
    const auth = localStorage.getItem(LocalStorageKey.Auth);

    if (!auth) {
      throw new Error();
    }
    const data = await getUserDataQuerySelector();

    return data;
  } catch (err) {
    localStorage.removeItem(LocalStorageKey.Auth);
  }

  return null;
}
