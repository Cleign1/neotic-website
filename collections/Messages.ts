import { CollectionConfig } from "payload";

export const Messages: CollectionConfig = {
    slug: "messages",
    fields: [
        {
            name: "name",
            type: "text",
            required: true,
        },
        {
            name: "email",
            type: "email",
            required: true,
        },
        {
            name: "phone",
            type: "text",
        },
        {
            name: 'messageTitle',
            type: 'text',
            required: true,
        },
        {
            name: "message",
            type: "textarea",
            required: true,
        }
    ],
    admin: {
        useAsTitle: 'messageTitle',
    },
    access: {
        create: () => true,
        read: () => true,
    }
}