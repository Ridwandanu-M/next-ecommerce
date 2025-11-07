import Link from "next/link";

export default function FormLayout() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div className="flex text-md bg-white justify-between border border-black/40 py-2 px-6">
        <Link href="/" className="text-3xl font-[700]">
          Beli.com
        </Link>
      </div>
    </nav>
  );
}
