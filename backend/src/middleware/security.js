import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import xss from 'xss-clean';
import hpp from 'hpp';

// rate limit
export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15min
    max: 10, // limitation 100 req par fenêtre
    message: 'Trop de requêtes depuis cette IP, veuillez réessayer plus tard'
});

// headers de sécurité
export const securityHeaders = helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data", "https:"],
            connectSrc: ["'self'"],
            fontSrc: ["'self'"],
            objectSrc: ["'none'"],
            mediaSrc: ["'self'"],
            frameSrc: ["'none'"],
        },
    },
    crossOriginEmbedderPolicy: false,
});

// protection XSS
export const xssProtection = xss();

// protection pollution param HTTP
export const parameterPollution = hpp();