import '../css/app.css';
import './bootstrap';

import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import { ZiggyVue } from '../../vendor/tightenco/ziggy';
import MainLayout from './Layouts/MainLayout.vue';

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const pages = import.meta.glob('./Pages/**/*.vue');

createInertiaApp({
    resolve: async (name) => {
        const path = `./Pages/${name}.vue`;
        const importPage = pages[path];

        if (!importPage) {
            throw new Error(`Inertia page not found: ${path}`);
        }

        const page = await importPage();

        page.default.layout = page.default.layout || MainLayout;

        return page;
    },

    setup({ el, App, props, plugin }) {
        createApp({
            render: () => h(App, props),
        })
            .use(plugin)
            .use(ZiggyVue)
            .mount(el);
    },
});