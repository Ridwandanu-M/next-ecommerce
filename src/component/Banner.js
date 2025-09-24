import Image from "next/image";
import Banner_monitor from "../../public/assets/Banner_monitor.png";

export default function Banner() {
  return (
    <div className="grid grid-cols-2 items-center max-w-[144rem] mb-[1.2rem] mx-auto">
      <h2 className="text-[7.2rem] text-[#111] font-[700] justify-self-start leading-[8rem]">
        Buy Anything Everything Only At Beli.com
      </h2>
      <Image
        src={Banner_monitor}
        alt="Banner Image"
        className="justify-self-end"
      />
    </div>
  );
}
