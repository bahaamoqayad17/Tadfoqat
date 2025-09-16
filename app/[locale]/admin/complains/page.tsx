import { getContacts } from "@/actions/contact-actions";
import ContactsPage from "./client";

export default async function Contact() {
  const data = await getContacts();

  return <ContactsPage data={JSON.parse(JSON.stringify(data))} />;
}
