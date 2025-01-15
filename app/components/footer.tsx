import neoticBigLogi from "../components/logo/Neotic_Doang_Big logo.svg";
import neoticText from "../components/logo/Neotic Text.svg";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-2 flex justify-between items-center">
        <div className="flex-shrink-0">
          <div>
            <Image
              priority
              src={neoticBigLogi}
              alt="Neotic Logo"
              height={100}
            />
            <p className="pl-2">
              &quot;Easy to use, Easy to work&quot; <br />
              Dig your knowledge, <br />
              engrave your curiosity with us
            </p>
          </div>
        </div>
        <div className="flex-grow">
          <ul className="flex justify-center space-x-10">
            <li>
              <Image 
              src={neoticText}
              alt="Neotic Logo"
              height={100}
              />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}