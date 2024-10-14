'use client';
import Image from "next/image";
import SectionHeaders from "../layout/SectionHeaders";
import MenuItem from "../menu/MenuItem";
export default function HomeMenu() {
  
  return (
    <section className="">
      <div className="absolute left-0 right-0 w-full justify-start">
        <div className="h-48 w-48 absolute -left-12 text-left">
          <Image src={'/sallad1.png'} width={109} height={189}
           alt={'sallad'} />
        </div>
        <div className="h-48 w-48 absolute -top-12 -right-12">
          <Image src={'/sallad2.png'} width={107} height={195}
           alt={'sallad'} />
        </div>
      </div>
      <div className="text-center mb-4">
        <SectionHeaders
          subHeader={'check out'}
          mainHeader={'Our Best Sellers'} />
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        <MenuItem />
        <MenuItem />
        <MenuItem />    
      </div>
    </section>
  );
}