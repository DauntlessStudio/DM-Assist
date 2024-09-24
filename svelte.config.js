import adapter from '@sveltejs/adapter-static';

export default {
    kit: {
        adapter: adapter({
            pages: 'build',
            assets: 'build',
            fallback: 'index.html',
            precompress: false
        }),
        paths: {
            base: process.env.NODE_ENV === 'production' ? '/DM-Assist' : '',
        }
    }
};
