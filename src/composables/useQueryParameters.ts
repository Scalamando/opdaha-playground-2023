export default function useQueryParameters<T extends Record<string, string>>(): {
	[K in keyof T]?: T[K];
} {
	return Object.fromEntries(new URLSearchParams(location.search)) as T;
}
