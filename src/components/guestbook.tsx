import GuestbookForm from "./guestbook-form";

export default function Guestbook() {
  // if (searchParams) {
  //   return <p className="prose prose-neutral dark:prose-invert">Message received! Thanks for stopping by.</p>;
  // }

  return (
    <div>
      <h2 className="prose prose-neutral dark:prose-invert">Welcome to my guestbook! Leave a message below.</h2>
      <GuestbookForm />
    </div>
  );
}
