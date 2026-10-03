import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    defaultColumns: ['name', 'email','role'],
    useAsTitle: 'name',
  },
  auth: true,
  access: {
    // Payload's first-register operation checks for an empty collection and
    // overrides access, so bootstrap does not require public create access.
    create: ({ req: { user } }) => user?.role === 'admin',
    update: ({ req: { user } }) => {
      if (user?.role === 'admin') return true
      if (!user) return false
      return { id: { equals: user.id } }
    },
    delete: ({ req: { user } }) => user?.role === 'admin',
    unlock: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'role',
      label: 'Role',
      type: 'select',
      required: true,
      access: {
        create: ({ req: { user } }) => user?.role === 'admin',
        update: ({ req: { user } }) => user?.role === 'admin',
      },
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Editor',
          value: 'Editor',
        },
      ],
    }
  ],
}
