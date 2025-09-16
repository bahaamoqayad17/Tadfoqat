import { getEmployees } from "@/actions/user-actions";
import EmployeesPage from "./client";

export default async function Employees() {
  const data = await getEmployees();

  return <EmployeesPage data={JSON.parse(JSON.stringify(data.data))} />;
}
