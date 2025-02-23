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
            type: "richText",
        },
        {
            name: "whoWeAre",
            label: "Who We Are",
            type: "richText",
        },
        {
            name: "whatWeDo",
            label: "What We Do",
            type: "richText",
        },
        {
            name: "ourVision",
            label: "Our Vision",
            type: "richText"

        },
        {
            name: "ourMission",
            label: "Our Mission",
            type: "richText",
        }
    ]
}