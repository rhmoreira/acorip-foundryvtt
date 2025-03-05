import copy from "rollup-plugin-copy";
import { defineConfig } from "vite";
import glob from "glob";

export default defineConfig({
    build: {
        sourcemap: false,
        emptyOutDir: true,
        minify: false,
        outDir: "dist/scripts",
        watch: {
            include: "src/**"
        },
        rollupOptions: {
            input: "src/main.ts",
            preserveEntrySignatures: "strict",
            output: {
                entryFileNames: '[name].js',
                format: "es",
                preserveModules: true
            },
        },
    },
    plugins: [
        copy({
            targets: [{
                src: ["src/", "!src/**/*.ts"],
                dest: "dist",
                expandDirectories: true,
                onlyFiles: true
            }],
            flatten: false,
            hook: "writeBundle",
        }),
    ],
});