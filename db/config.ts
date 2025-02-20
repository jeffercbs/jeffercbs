import { defineDb, defineTable, column, NOW } from "astro:db";

export const Client = defineTable({
  columns: {
    id: column.text({ primaryKey: true, unique: true }),
    
    name: column.text(),
    email: column.text(),
    phone: column.text(),
    company: column.text(),

    project: column.text(),
    projectDescription: column.text(),
    referenceLink: column.text(),
    feactures: column.text(),
    preferredTechnology: column.text(),
    estimatedBudget: column.text(),

    specs: column.text({deprecated: true}),

    createdAt: column.date({ default: NOW }),
  },
});

export default defineDb({
  tables: {
    Clients: Client,
  },
});
