import Link from "next/link";
import Image from "next/image";
import { auth, signOut, signIn } from "@/auth";

const Navbar = async () => {

    const session = await auth();

    return (
        <div className="px-5 py-3 bg-white shadow-sm font-work-sans">
            <nav className="flex items-center justify-between">
                <Link href="/">
                    <Image src="/logo.svg" alt="logo" width={144} height={30} />
                </Link>

                <div className="flex items-center gap-5 text-black">
                    {
                        session && session?.user ? (
                            <>
                                <Link href="/startup/create">
                                    <span>Create</span>
                                </Link>

                                <form action={async () => {
                                    "use server"

                                    await signOut({ redirectTo: "/" });
                                }}>
                                    <button>Logout</button>
                                </form>

                                <Link href={`/user/${session.user.id}`}>
                                    <span>{session?.user?.name}</span>
                                </Link>

                                <Link href={`/user/${session.user.id}`}>
                                    <Image
                                        src={session?.user?.image || "https://placehold.co/48x48"}
                                        alt="profile image"
                                        width={40}
                                        height={40}
                                        className="rounded-full border border-gray-100 hover:border-sky-400 transition-all ease-in-out duration-200"
                                    />
                                </Link>
                            </>
                        ) : (
                            // for some ungodly reasons, this thing below works 👹

                            // <button onClick={async () => {
                            //     "use server"
                            //
                            //     await signIn('github');
                            // }}>
                            //     <span>Login</span>
                            // </button>

                            <form action={
                                async () => {
                                    "use server"

                                    await signIn('github');
                                }}>
                                <button type="submit">Login</button>
                            </form>
                        )
                    }
                </div>
            </nav>
        </div>
    );
};

export default Navbar;