import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();
// Хотя я думаю выносить это в отдельный файл избыточно,
// как по мне лучше в QueryProvider.tsx это написать
