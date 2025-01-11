import Image from "next/image";
import Link from "next/link";

const Profile = () => {
  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar"
      >
        <div className="w-10 rounded-full">
          <Image
            alt="Tailwind CSS Navbar component"
            src="/defaultAvatar.jpg"
            width={40}
            height={40}
          />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] mt-3 p-2 shadow"
      >
        <li>
          <Link href="/dashboard" className="justify-between">Profile</Link>
        </li>
        <li>
          <Link href="/admin">Admin</Link>
        </li>
        <li>
          <a>Logout</a>
        </li>
      </ul>
    </div>
  );
};

export default Profile;
