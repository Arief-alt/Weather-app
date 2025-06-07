import { type RouteConfig, layout, index } from "@react-router/dev/routes";

export default [
    layout('routes/root/layout.tsx', [
        index('routes/root/dashboard.tsx')
    ]),
] satisfies RouteConfig;
