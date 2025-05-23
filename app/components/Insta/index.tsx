import Image from "next/image";
import Link from "next/link";

const Insta = () => {
    return (
        <div className="relative z-50 flex justify-center gap-8 py-8 w-full">
            <div className="rounded-2xl overflow-hidden shadow-lg">
                <Image src="/images/insta/insta1.png" width={220} height={180} alt="instaOne" />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
                <Image src="/images/insta/insta2.png" width={220} height={180} alt="instaTwo" />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
                <Image src="/images/insta/insta3.png" width={220} height={180} alt="instaThree" />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
                <Image src="/images/insta/insta4.png" width={220} height={180} alt="instaFour" />
            </div>
        </div>
    )
}

export default Insta
