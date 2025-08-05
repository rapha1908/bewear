// Importações necessárias do Drizzle ORM
// relations: usado para definir relacionamentos entre tabelas
// Tipos de dados do PostgreSQL: integer, pgTable, text, timestamp, uuid
import { relations } from "drizzle-orm";
import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

// Tabela de usuários - armazena informações básicas dos usuários do sistema
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
});

// Tabela de categorias - organiza os produtos em categorias
export const categoryTable = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Relacionamentos da tabela de categorias
// Define que uma categoria pode ter muitos produtos
export const categoryRelations = relations(categoryTable, ({ many }) => ({
  // Uma categoria pode ter múltiplos produtos
  products: many(products),
}));

// Tabela de produtos - armazena informações dos produtos do e-commerce
export const productTable = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  // Referência para a categoria do produto (chave estrangeira)
  categoryId: uuid("category_id").references(() => categoryTable.id),
});

export const ProductVarianteTable = pgTable("product_variants", {
  id: uuid("id").primaryKey().defaultRandom(),
  productId: uuid("product_id").references(() => productTable.id),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  priceInCoins: integer("price_in_coins").notNull(),
  imageUrl: text("image_url").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Relacionamentos da tabela de produtos
// Define que um produto pertence a uma categoria específica
export const productRelations = relations(productTable, ({ one }) => ({
  // Um produto pertence a uma única categoria (relacionamento N:1)
  category: one(categoryTable, {
    // Campo na tabela de produtos que faz a referência
    fields: [productTable.categoryId],
    // Campo na tabela de categorias que é referenciado
    references: [categoryTable.id],
  }),
}));
