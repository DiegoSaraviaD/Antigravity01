/** Application-wide constants */

export const ROUTES = {
    LOGIN: '/login',
    SIGNUP: '/signup',
    DASHBOARD: '/dashboard',
    JORNADA: '/jornada',
    HISTORIAL: '/historial',
};

export const JORNADA_STATUS = {
    ACTIVE: 'activa',
    PAUSED: 'pausada',
    FINISHED: 'finalizada',
};

export const CURRENCY = {
    SYMBOL: 'S/',
    LOCALE: 'es-PE',
    CODE: 'PEN',
};

export const NAV_ITEMS = [
    { label: 'Dashboard', path: ROUTES.DASHBOARD, icon: 'dashboard' },
    { label: 'Jornada', path: ROUTES.JORNADA, icon: 'timer' },
    { label: 'Historial', path: ROUTES.HISTORIAL, icon: 'history' },
];
