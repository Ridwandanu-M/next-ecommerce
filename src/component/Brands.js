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
    Hp_logo,
    Lenovo_logo,
    Samsung_logo,
    Huawei_logo,
    Msi_logo,
    Aoc_logo,
    Gigabyte_logo,
  ];

  return (
    <div className="bg-[#111] py-6 overflow-hidden">
      <div>
        <ul className="flex justify-between px-[1.2rem]">
          {brandsLogo.map((item, index) => (
            <Image
              key={index}
              src={item}
              alt="brand logo"
              height={40}
              className="filter brightness-0 invert"
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
