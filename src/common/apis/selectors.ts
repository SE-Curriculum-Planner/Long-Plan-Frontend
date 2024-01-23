import { User } from "types";
import { getUserDataQuery } from "./queries";

export async function getUserDataQuerySelector() {
  const [userDataRes] = await Promise.all([getUserDataQuery()]);

  const userData: User = {
    account: userDataRes.cmuitaccount,
    student_id: userDataRes.student_id,
    prename: userDataRes.prename_TH,
    first_name: userDataRes.firstname_TH,
    last_name: userDataRes.lastname_TH,
    organization_name: userDataRes.organization_name_TH,
    type: userDataRes.itaccounttype_id
  };

  return {
    userData
  };
}
