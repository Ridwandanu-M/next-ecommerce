import Link from "next/link";

export default function UserImageProfile() {
  return (
    <section className="flex flex-col border p-4 shadow-md">
      <div className="bg-gray-400 text-black/25 border border-gray-700 w-64 h-64 flex justify-center items-center">
        <p>Placeholder</p>
      </div>
      <div className="flex flex-col mt-2 w-64">
        <Link
          href="/dashboard/profile"
          className="bg-[#111] hover:bg-[#000] text-white py-2 text-center"
        >
          <p>Profile Photo</p>
        </Link>
        <p className="text-sm text-black/75 mt-2">
          Image file size must not exceed 4MB. File extensions must be .JPG,
          .JPEG, or .PNG.
        </p>
      </div>
    </section>
  );
}
