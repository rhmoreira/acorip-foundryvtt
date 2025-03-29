import copy from "rollup-plugin-copy";
import { defineConfig } from "vite";

export default defineConfig({
    build: {
        sourcemap: false,
        emptyOutDir: true,
        minify: false,
        outDir: "dist/scripts",
        watch: {
            include: "src/**/*.ts"
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
            targets: [
                {
                    src: ["src/events/**.js"],
                    dest: "dist/scripts",
                    expandDirectories: true,
                    onlyFiles: true
                },
                {
                    src: ["src/", "!src/**/*.ts", "!src/**/*.js"],
                    dest: "dist",
                    expandDirectories: true,
                    onlyFiles: true
                }
            ],
            flatten: false,
            hook: "writeBundle",
        }),
    ],
});