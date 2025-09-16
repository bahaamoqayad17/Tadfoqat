import { getWithdrawRequests } from "@/actions/withdraw-actions";
import WithdrawalsRequestsPage from "./client";

export default async function WithdrawalsRequests() {
  const data = await getWithdrawRequests();

  return (
    <WithdrawalsRequestsPage data={JSON.parse(JSON.stringify(data.data))} />
  );
}
