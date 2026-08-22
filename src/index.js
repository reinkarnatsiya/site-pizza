const corsHeaders = {
    "Access-Control-Allow-Origin": "http://localhost:5173",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

export default {
    async fetch(request, env) {

        console.log(
            "REQUEST:",
            request.method,
            request.url
        );

        if (request.method === "OPTIONS") {
            return new Response(null, {
                status: 204,
                headers: corsHeaders
            });
        }

        try {
            const url = new URL(request.url);

            // CORS preflight
            if (request.method === "OPTIONS") {
                return new Response(null, {
                    headers: corsHeaders
                });
            }

            // =========================
            // Пиццы
            // GET /api/pizzas
            // =========================
            if (url.pathname === "/api/pizzas" && request.method === "GET") {
                const { results } = await env.DB
                    .prepare("SELECT * FROM pizzas")
                    .all();

                return new Response(
                    JSON.stringify(
                        results.map(pizza => ({
                            ...pizza,
                            ingredients: JSON.parse(pizza.ingredients)
                        }))
                    ),
                    {
                        headers: {
                            ...corsHeaders,
                            "Content-Type": "application/json"
                        }
                    }
                );
            }


            // =========================
            // Пользователи
            // GET /api/users
            // =========================
            if (url.pathname === "/api/users" && request.method === "GET") {
                const { results } = await env.DB
                    .prepare("SELECT * FROM users")
                    .all();

                return new Response(
                    JSON.stringify(results),
                    {
                        headers: {
                            ...corsHeaders,
                            "Content-Type": "application/json"
                        }
                    }
                );
            }


            // =========================
            // Получить заказы
            // GET /api/orders
            // =========================
            if (url.pathname === "/api/orders" && request.method === "GET") {
                const { results } = await env.DB
                    .prepare(
                        "SELECT * FROM orders ORDER BY createdAt DESC"
                    )
                    .all();

                return new Response(
                    JSON.stringify(
                        results.map(order => ({
                            ...order,
                            pizzas: order.pizzas
                                ? JSON.parse(order.pizzas)
                                : []
                        }))
                    ),
                    {
                        headers: {
                            ...corsHeaders,
                            "Content-Type": "application/json"
                        }
                    }
                );
            }


            // =========================
// Создать заказ
// POST /api/orders
// =========================
            if (url.pathname === "/api/orders" && request.method === "POST") {

                console.log("POST ORDER RECEIVED");

                const body = await request.json();

                console.log(body);

                const id = body.id || crypto.randomUUID();

                await env.DB
                    .prepare(`
                        INSERT INTO orders (
                            id,
                            userId,
                            pizzas,
                            status,
                            createdAt
                        )
                        VALUES (?, ?, ?, ?, ?)
                    `)
                    .bind(
                        id,
                        body.userId,
                        JSON.stringify(body.pizzas),
                        "new",
                        new Date().toISOString()
                    )
                    .run();

                return new Response(
                    JSON.stringify({
                        success: true,
                        id
                    }),
                    {
                        headers: {
                            ...corsHeaders,
                            "Content-Type": "application/json"
                        }
                    }
                );
            }


            // =========================
            // Не найдено
            // =========================
            return new Response(
                JSON.stringify({
                    error: "Not Found"
                }),
                {
                    status: 404,
                    headers: {
                        ...corsHeaders,
                        "Content-Type": "application/json"
                    }
                }
            );


        } catch (err) {

            return new Response(
                JSON.stringify({
                    error: err.message
                }),
                {
                    status: 500,
                    headers: {
                        ...corsHeaders,
                        "Content-Type": "application/json"
                    }
                }
            );
        }
    },
};