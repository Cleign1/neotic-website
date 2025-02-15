import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { CollectionConfig } from "payload";

export const AboutPage: CollectionConfig = {
    labels: {
        singular: "Halaman Tentang",
        plural: "Halaman Tentang",
    },
    slug: "aboutPage",
    fields: [
        {
            name: "ourPhilosophy",
            label: "Our Philosophy",
            type: "textarea",
        },
        {
            name: "whoWeAre",
            label: "Who We Are",
            type: "textarea",
        },
        {
            name: "whatWeDo",
            label: "What We Do",
            type: "textarea",
        },
        {
            name: "ourVision",
            label: "Our Vision",
            type: "richText",
            editor: lexicalEditor(),
        },
        {
            name: "ourMission",
            label: "Our Mission",
            type: "richText",
            editor: lexicalEditor(),
        }
    ]
}