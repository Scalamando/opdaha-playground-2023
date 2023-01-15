module.exports = {
	printWidth: 100,
	tabWidth: 2,
	useTabs: true,
	semi: true,
	singleQuote: false,
	trailingComma: "es5",
	bracketSpacing: true,
	arrowParens: "always",
	plugins: [require("prettier-plugin-organize-imports"), require("prettier-plugin-tailwindcss")],
};
