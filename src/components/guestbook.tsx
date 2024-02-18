import GuestbookForm from "./guestbook-form";

export default function Guestbook() {
  // if (searchParams) {
  //   return <p className="prose prose-neutral dark:prose-invert">Message received! Thanks for stopping by.</p>;
  // }

  return (
    <div>
      <p className="prose prose-neutral dark:prose-invert">I&apos;d love to hear from you. Feel free leave a note.</p>
      <GuestbookForm />
    </div>
  );
}
