import { defineDb, defineTable, column, NOW } from "astro:db";

export const Client = defineTable({
  columns: {
    id: column.text({ primaryKey: true, unique: true }),

    name: column.text(),
    email: column.text(),
    phone: column.text(),
    company: column.text(),

    affair: column.text(),
    referenceLink: column.text(),
    estimatedBudget: column.text(),
    additionalInfo: column.text(),

    createdAt: column.date({ default: NOW }),
  },
});

export const Newsletter = defineTable({
  columns: {
    id: column.text({ primaryKey: true, unique: true }),
    email: column.text({ unique: true }),
    status: column.text({ default: "pending" }),
    preferences: column.json({ default: {} }),
    createdAt: column.date({ default: NOW }),
  },
});

export default defineDb({
  tables: {
    Clients: Client,
    Newsletters: Newsletter,
  },
});
