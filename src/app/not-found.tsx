import Link from 'next/link';

/** Fallback for requests outside the locale segment (e.g. unknown locale codes). */
export default function GlobalNotFound() {
  return (
    <html lang="sq">
      <body className="flex min-h-svh items-center bg-ivory text-slate">
        <main className="container-x py-24">
          <p className="text-label text-grey">404</p>
          <h1 className="text-h1 mt-6">Faqja nuk u gjet / Page not found</h1>
          <p className="mt-8 flex gap-8">
            <Link href="/sq" className="link-underline-static">Ballina</Link>
            <Link href="/en" className="link-underline-static">Home</Link>
          </p>
        </main>
      </body>
    </html>
  );
}
