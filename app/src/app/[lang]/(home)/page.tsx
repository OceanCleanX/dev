import Image from "next/image";

const Page = () => (
  <>
    <div className="w-screen relative">
      <div className="absolute z-10 left-20 top-[13%]">
        <div className="font-semibold text-[5rem] text-white tracking-[0.0375em]">
          Ocean CleanX
        </div>
        <div className="text-[1.7rem] text-[#9FD3E3] pl-3 pt-5 font-light">
          Affordable Water Cleaning, One Step at a Time.
        </div>
      </div>
      <Image
        className="-z-10 mask-b-from-20% mask-b-to-70% brightness-110 contrast-[110%] sepia-[0.1]"
        src="/bg.jpg"
        alt="OceanCleanX background"
        width={3992}
        height={2992}
        priority
      />
    </div>
    <div className="w-screen px-16 pt-10 pb-20">
      <div className="font-semibold text-[1.7rem]">Our Models</div>
    </div>
  </>
);

export default Page;
