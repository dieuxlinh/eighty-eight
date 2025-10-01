// svelte.config.js
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
        adapter: adapter({
            // The directory where the final output will be written.
            pages: 'build',
            assets: 'build',
            // Do NOT specify 'fallback' when prerendering everything.
        }),
        paths: {
            base: '/media', // The base path of your application
        }
    }
};

export default config;