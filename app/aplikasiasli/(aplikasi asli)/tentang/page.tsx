import { JSX } from "react/jsx-runtime";

interface Section {
  id: number;
  title: string;
  content: string;
}

interface SectionList {
  id: number;
  title: string;
  content: string[];
}

export default function AboutUs(): JSX.Element {
  const about1: Section[] = [
    {
      id: 1,
      title: "Our Philosophy",
      content: "Dengan fokus pada pengembangan sumber daya manusia yang kompetitif, Neotic menggabungkan teknologi terkini dengan pendekatan pendidikan yang progresif. Produk dan layanan yang dihadirkan tidak hanya dirancang untuk memenuhi kebutuhan pasar saat ini, tetapi juga untuk mendorong transformasi dalam cara belajar dan bekerja."
    },
    {
      id: 2,
      title: "Who We Are",
      content: "Membangun identitas digital perusahaan. Memperluas jangkauan informasi tentang Neotic. Meningkatkan visibilitas perusahaan secara online."
    },
    {
      id: 3,
      title: "What we Do",
      content: "Menciptakan produk aplikasi desktop, website, dan mobile untuk kebutuhan konsumen dan klien"
    }
  ]

  const about2: SectionList[] = [
    {
      id: 1,
      title: "Our Vision",
      content: ["Memberikan informasi komprehensif tentang layanan dan produk", "Membangun Kepercayaan Stakeholder", "Meningkatkan Jangkauan Pemasaran"]
    },
    {
      id: 2,
      title: "Our Mission",
      content: ["Memudahkan calon klien/mitra mengenal perusahaan","Meningkatkan kredibilitas perusahaan", "Sebagai media promosi dan komunikasi digital"]
    }
  ]

  return (
    <div className="min-h-screen">
      <div className="grid grid-flow-row auto-rows-max mt-10 mb-10 gap-10">
        {/* Title */}
        <div className="bg-blue-210 text-center font-semibold text-2xl p-4">
          <h1>Tentang Kami </h1>
        </div>
        {/* Section 1 */}
        <div className="bg-blue-210 py-8">
          <div className="container mx-auto m-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Box 1 */}
              <div className="bg-white p-4 rounded-lg hover:shadow-lg">
                <h1 className="text-center p-5 text-2xl font-semibold">{about1.find((s) => s.id === 1)?.title}</h1>
                <p className="m-10 text-justify">{about1.find((s) => s.id === 1)?.content}</p>
              </div>
              <div className="grid grid-row-2 gap-10">
                {/* Box 2 */}
                <div className="bg-white p-4 rounded-lg hover:shadow-lg">
                  <h1 className="text-center text-2xl font-semibold p-4">{about1.find((s) => s.id === 2)?.title}</h1>
                  <p className="m-10 text-justify">{about1.find((s) => s.id === 2)?.content}</p>
                </div>
                {/* Box 3 */}
                <div className="bg-white p-4 rounded-lg hover:shadow-lg">
                  <h1 className="text-center text-2xl p-4 font-semibold">{about1.find((s) => s.id === 3)?.title}</h1>
                  <p className="m-10 text-justify">{about1.find((s) => s.id === 3)?.content}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="bg-blue-210 text-center p-4">
          <div className="container mx-auto m-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {about2.map((section) => (
                <div key={section.id} className="bg-white p-4 rounded-lg hover:shadow-lg">
                <h1 className="text-2xl p-4 font-semibold">{section.title}</h1>
                <ul className="list-disc m-10 pl-5">
                  {section.content.map((item, index) => (
                    <li key={index} className="text-justify">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
