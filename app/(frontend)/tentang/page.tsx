import { JSX } from "react/jsx-runtime";
import { AboutPage } from "@/payload-types"; 
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { SerializedEditorState } from "lexical";
// import RichText from "@/app/components/RichText";

type AboutPageProps = {
  id: string;
  updatedAt: string;
  createdAt: string;
  ourPhilosophy: SerializedEditorState;
  whoWeAre: SerializedEditorState;
  whatWeDo: SerializedEditorState;
  ourVision: SerializedEditorState; // Assuming richText is returned as a string or HTML
  ourMission: SerializedEditorState; // Assuming richText is returned as a string or HTML
}

async function getAboutPage(): Promise<AboutPageProps> {
  try {
    const payload = await getPayload({ config: configPromise });
    const result = await payload.find({
      collection: 'aboutPage',
      pagination: false
    });

    // Assuming the result contains the data you need
    const docs = result.docs.map((doc: AboutPage) => ({
      id: String(doc.id), // Convert number to string
      updatedAt: doc.updatedAt,
      createdAt: doc.createdAt,
      ourPhilosophy: doc.ourPhilosophy as SerializedEditorState,
      whoWeAre: doc.whoWeAre as SerializedEditorState,
      whatWeDo: doc.whatWeDo as SerializedEditorState,
      ourVision: doc.ourVision as SerializedEditorState,
      ourMission: doc.ourMission as SerializedEditorState,
    }));

    return docs[0];

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
                <div className="m-10 text-justify text-lg rich-text-content">
                  <RichText data={aboutPageData.ourPhilosophy} />
                </div>
              </div>
              <div className="grid grid-row-2 gap-10">
                {/* Box 2 */}
                <div className="bg-white p-4 rounded-lg hover:shadow-lg">
                  <h1 className="text-center text-2xl font-semibold p-4">Who We Are</h1>
                  <div className="m-10 text-justify text-lg rich-text-content">
                    <RichText data={aboutPageData.whoWeAre} />
                  </div>
                </div>
                {/* Box 3 */}
                <div className="bg-white p-4 rounded-lg hover:shadow-lg">
                  <h1 className="text-center text-2xl p-4 font-semibold">What We Do</h1>
                  <div className="m-10 text-justify text-lg rich-text-content">
                    <RichText data={aboutPageData.whatWeDo} />
                  </div>
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
                <div className="m-10 text-justify rich-text-content">
                  {/* Debug ini coy, masih gk jelas */}
                  <RichText data={aboutPageData.ourVision} />
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg hover:shadow-lg">
                <h1 className="text-2xl p-4 font-semibold">Our Mission</h1>
                <div className="m-10 text-justify rich-text-content">
                  <RichText data={aboutPageData.ourMission} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}