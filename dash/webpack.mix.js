const mix = require('laravel-mix');
mix.js('src/js/app.js', 'static/js').vue()
.postCss('src/css/app.css', 'static/css', [
    require('tailwindcss')('tailwind.config.js'),
]);

