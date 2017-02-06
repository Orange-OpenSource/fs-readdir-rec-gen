module.exports = {
    "env": {"es6": true, "node": true},
    "extends": "eslint:recommended",
    "rules": { // See http://eslint.org/docs/rules
        "indent": ["error", 4, { "SwitchCase": 1 }],
        "linebreak-style": ["error", "unix"],
        // "quotes": ["warn", "double"],
        "semi": ["error", "always"],
        "no-unused-vars": "warn",
        "no-console": ["error", { allow: ["log", "warn", "error"] }],
        "keyword-spacing": "warn",
        "no-mixed-spaces-and-tabs": "warn",
        "space-infix-ops": "warn",
        "key-spacing": "warn",
        "no-trailing-spaces": "warn",
        "curly": "warn",
        "brace-style": "warn",
        "object-curly-spacing": ["warn", "never"],
        "comma-spacing": "warn",
        "no-extra-parens": "warn"
    }
};
