import Image from "next/image";
import {
  Apple_logo,
  Asus_logo,
  Hp_logo,
  Lenovo_logo,
  Samsung_logo,
  Huawei_logo,
  Msi_logo,
  Aoc_logo,
  Gigabyte_logo,
} from "./ImageComponens";

export default function Brands() {
  const brandsLogo = [
    Asus_logo,
    Apple_logo,
    Aoc_logo,
    Lenovo_logo,
    Samsung_logo,
    Huawei_logo,
    Msi_logo,
    Hp_logo,
    Gigabyte_logo,
  ];

  return (
    <div className="relative bg-[#fff] py-6 overflow-hidden">
      <div className="absolute left-0 top-0 h-full w-[20rem] bg-gradient-to-r from-[#fff] to-transparent pointer-events-none z-20" />
      <div className="absolute right-0 top-0 h-full w-[20rem] bg-gradient-to-l from-[#fff] to-transparent pointer-events-none z-20" />
      <div className="flex">
        <ul className="marquee flex gap-[8.8rem] px-[1.2rem]">
          {brandsLogo.map((item, index) => (
            <Image
              key={index}
              src={item}
              alt="brand logo"
              height={30}
              className="filter brightness-0"
            />
          ))}
          {brandsLogo.map((item, index) => (
            <Image
              key={index}
              src={item}
              alt="brand logo"
              height={30}
              className="filter brightness-0"
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
