import { Migration } from '@mikro-orm/migrations';

export class Migration20241205165741 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table if not exists "vendor" ("id" text not null, "external_id" text null, "title" text not null, "company_id" text not null, "email" text not null, "phone" text not null, "address" jsonb not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "vendor_pkey" primary key ("id"));');
    this.addSql('CREATE UNIQUE INDEX IF NOT EXISTS "IDX_vendor_external_id_unique" ON "vendor" (external_id) WHERE deleted_at IS NULL;');
    this.addSql('CREATE UNIQUE INDEX IF NOT EXISTS "IDX_vendor_company_id_unique" ON "vendor" (company_id) WHERE deleted_at IS NULL;');
    this.addSql('CREATE INDEX IF NOT EXISTS "IDX_vendor_deleted_at" ON "vendor" (deleted_at) WHERE deleted_at IS NULL;');

    this.addSql('create table if not exists "brand" ("id" text not null, "external_id" text null, "title" text not null, "logo_url" text null, "vendor_id" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "brand_pkey" primary key ("id"));');
    this.addSql('CREATE UNIQUE INDEX IF NOT EXISTS "IDX_brand_external_id_unique" ON "brand" (external_id) WHERE deleted_at IS NULL;');
    this.addSql('CREATE INDEX IF NOT EXISTS "IDX_brand_vendor_id" ON "brand" (vendor_id) WHERE deleted_at IS NULL;');
    this.addSql('CREATE INDEX IF NOT EXISTS "IDX_brand_deleted_at" ON "brand" (deleted_at) WHERE deleted_at IS NULL;');

    this.addSql('create table if not exists "product_extension" ("id" text not null, "brand_id" text not null, "vendor_id" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "product_extension_pkey" primary key ("id"));');
    this.addSql('CREATE INDEX IF NOT EXISTS "IDX_product_extension_brand_id" ON "product_extension" (brand_id) WHERE deleted_at IS NULL;');
    this.addSql('CREATE INDEX IF NOT EXISTS "IDX_product_extension_vendor_id" ON "product_extension" (vendor_id) WHERE deleted_at IS NULL;');
    this.addSql('CREATE INDEX IF NOT EXISTS "IDX_product_extension_deleted_at" ON "product_extension" (deleted_at) WHERE deleted_at IS NULL;');

    this.addSql('alter table if exists "brand" add constraint "brand_vendor_id_foreign" foreign key ("vendor_id") references "vendor" ("id") on update cascade;');

    this.addSql('alter table if exists "product_extension" add constraint "product_extension_brand_id_foreign" foreign key ("brand_id") references "brand" ("id") on update cascade;');
    this.addSql('alter table if exists "product_extension" add constraint "product_extension_vendor_id_foreign" foreign key ("vendor_id") references "vendor" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table if exists "brand" drop constraint if exists "brand_vendor_id_foreign";');

    this.addSql('alter table if exists "product_extension" drop constraint if exists "product_extension_vendor_id_foreign";');

    this.addSql('alter table if exists "product_extension" drop constraint if exists "product_extension_brand_id_foreign";');

    this.addSql('drop table if exists "vendor" cascade;');

    this.addSql('drop table if exists "brand" cascade;');

    this.addSql('drop table if exists "product_extension" cascade;');
  }

}
