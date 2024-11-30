/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
    readonly JWT_SECRET: string;
    readonly COOKIE_SECURE: string;
    readonly COOKIE_SAME_SITE: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}