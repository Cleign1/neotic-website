import { JSX } from "react/jsx-runtime";
import { AboutPage } from "@/payload-types";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { RichText } from "@payloadcms/richtext-lexical/react";


async function getAboutPage():Promise<AboutPage> {
  try {
    const payload = await getPayload({ config: configPromise });
    const result = await payload.find({
      collection: 'aboutPage',
      pagination: false
    });

    // Assuming the result contains the data you need
    const doc = result.docs[0] as AboutPage; // Return the first document in the collection
    return {
      id: doc.id,
      updatedAt: doc.updatedAt,
      createdAt: doc.createdAt,
      ourPhilosophy: doc.ourPhilosophy,
      whoWeAre: doc.whoWeAre,
      whatWeDo: doc.whatWeDo,
      ourVision: doc.ourVision,
      ourMission: doc.ourMission
    };

  } catch (error) {
    console.error("Error fetching data from Payload CMS:", error);
    throw error; // Rethrow the error to handle it in the component
  }
}

export default async function AboutUs(): Promise<JSX.Element> {
  const aboutPageData = await getAboutPage();

  return (
    <div className="min-h-screen">
      <div className="grid grid-flow-row auto-rows-max mt-10 mb-10 gap-10">
        {/* Title */}
        <div className="bg-blue-210 text-center font-semibold text-2xl p-4">
          <h1>Tentang Kami </h1>
        </div>
        {/* Section 1 */}
        <div className="bg-blue-210 py-8">
          <div className="container mx-auto m-6 px-7 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Box 1 */}
              <div className="bg-white p-4 rounded-lg hover:shadow-lg">
                <h1 className="text-center p-5 text-2xl font-semibold">Our Philosophy</h1>
                <p className="m-10 text-justify">
                  {aboutPageData.ourPhilosophy} 
                  </p>
              </div>
              <div className="grid grid-row-2 gap-10">
                {/* Box 2 */}
                <div className="bg-white p-4 rounded-lg hover:shadow-lg">
                  <h1 className="text-center text-2xl font-semibold p-4">Who We Are</h1>
                  <p className="m-10 text-justify">
                    {aboutPageData.whoWeAre} 
                  </p>
                </div>
                {/* Box 3 */}
                <div className="bg-white p-4 rounded-lg hover:shadow-lg">
                  <h1 className="text-center text-2xl p-4 font-semibold">What We Do</h1>
                  <p className="m-10 text-justify">
                    {aboutPageData.whatWeDo} 
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="bg-blue-210 text-center p-4">
          <div className="container mx-auto m-6 px-3 md:px-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="bg-white p-4 rounded-lg hover:shadow-lg">
                <h1 className="text-2xl p-4 font-semibold">Our Vision</h1>
                <div className="m-10 text-justify">
                  {/* Debug ini coy, masih gk jelas */}
                  {aboutPageData.ourVision && <RichText data={aboutPageData.ourVision}/>}
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg hover:shadow-lg">
                <h1 className="text-2xl p-4 font-semibold">Our Mission</h1>
                <div className="m-10 text-justify">
                {aboutPageData.ourMission && <RichText data={aboutPageData.ourMission}/>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}