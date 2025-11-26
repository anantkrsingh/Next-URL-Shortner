import Link from "next/link";
import React from "react";
import Image from "next/image";

function Footer() {
  return (
    <div className="h-[28rem] w-full  flex items-center justify-center bg-black">
      <div className="flex p-10 rounded-[2rem] bg-gray-900/40 flex-col gap-2   color-white border-6 border-gray-200/10 w-[90%] mx-auto">
        <div className="flex items-center gap-2">
          <Image src="/icon.png" alt="TinyUR" width={25} height={25} />
          <span className="text-2xl font-bold">TinyUR</span>
        </div>

        <div className="flex mt-10 flex-row flex-wrap justify-between items-center gap-2">
          <Link href="/">ShortURL</Link>
          <div className="w-[1px] h-4 bg-white"></div>
          <Link href="/click-counter">URL Click Counter</Link>
          <div className="w-[1px] h-4 bg-white"></div>

          <Link href="/unshorten">Unshorten URL</Link>
          <div className="w-[1px] h-4 bg-white"></div>

          <Link href="/blogs">Terms of service</Link>
          <div className="w-[1px] h-4 bg-white"></div>

          <Link href="/blogs">Privacy policy</Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
