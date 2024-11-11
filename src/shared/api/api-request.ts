type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface ApiRequestOptions<T = unknown> {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: T;
  params?: Record<string, string | number | boolean>;
}

export async function apiRequest<ResponseType = unknown, BodyType = unknown>(
  url: string,
  options: ApiRequestOptions<BodyType> = {},
): Promise<ResponseType> {
  const { method = "GET", headers = {}, body, params } = options;

  // Формируем query-параметры для GET-запросов
  const queryString = params
    ? "?" + new URLSearchParams(params as Record<string, string>).toString()
    : "";

  // Формируем итоговый URL с query
  const finalUrl = url + queryString;

  // Подготавливаем опции для fetch
  const fetchOptions: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  // Добавляем body для запросов, отличных от GET
  if (body && method !== "GET") {
    fetchOptions.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(finalUrl, fetchOptions);

    // Проверка на успешность ответа
    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status} - ${response.statusText}`);
    }

    // Парсинг JSON-ответа
    return (await response.json()) as ResponseType;
  } catch (error) {
    console.error("Ошибка в запросе:", error);
    throw error;
  }
}
