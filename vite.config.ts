import copy from "rollup-plugin-copy";
import { defineConfig } from "vite";
import glob from "glob";

export default defineConfig({
    build: {
        sourcemap: false,
        emptyOutDir: true,
        minify: false,
        outDir: "C:\\Users\\rhmor\\AppData\\Local\\FoundryVTT\\Data\\modules\\acorip\\scripts",
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
                    dest: "C:\\Users\\rhmor\\AppData\\Local\\FoundryVTT\\Data\\modules\\acorip\\scripts",
                    expandDirectories: true,
                    onlyFiles: true
                },
                {
                    src: ["src/", "!src/**/*.ts", "!src/**/*.js"],
                    dest: "C:\\Users\\rhmor\\AppData\\Local\\FoundryVTT\\Data\\modules\\acorip",
                    expandDirectories: true,
                    onlyFiles: true
                }
            ],
            flatten: false,
            hook: "writeBundle",
        }),
    ],
});