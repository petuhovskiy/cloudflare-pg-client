import { Client } from '@bubblydoo/cloudflare-workers-postgres-client';

/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
}

const createClient = () => {
	// return new Client({
	// 	user: "petuhovskiy@zenith",
	// 	database: "main",
	// 	hostname: "dry-mountain-455633.cloud.neon.tech",
	// 	port: 5432,
	// 	password: "Cbfyq5ec6tmk"
	//   });
	return new Client({
		user: "postgres",
		database: "postgres",
		hostname: "18.192.67.124",
		port: 5432,
		password: "your-super-secret-password"
	  });

	  
	// return new Client({
	//   user: 'petuhovskiy%40zenith',
	//   database: 'main',
	//   hostname: 'http://proxy.hahathon.monster/?name=dry-mountain-455633.cloud.neon.tech:5432',
	//   password: 'Cbfyq5ec6tmk',
	//   port: 5432,
	// });
  }

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
		// const socket = new WebSocket('ws://snake.rwlist.io:8080/ws?name=tick');

		// // Connection opened
		// socket.addEventListener('open', (event) => {
		// socket.send('Hello Server!');
		// });

		// let test_var;
		// // Listen for messages
		// socket.addEventListener('message', (event) => {
		// 	console.log('Message from server ', event.data);
		// 	test_var = event.data;
		// });

		// await new Promise(r => setTimeout(r, 2000));

		// return new Response(JSON.stringify({ test_var }), {
		// headers: { "Content-Type": "application/json" },
		// });

		const client = createClient();

		await client.connect()

		  
		// const array_result = await client.queryArray("SELECT * FROM log_records LIMIT 10");
		const array_result = await client.queryArray("SELECT 42");
		console.log(array_result.rows); // [[1, 'Carlos'], [2, 'John'], ...]
		  
		  // const object_result = await client.queryObject("SELECT ID, NAME FROM PEOPLE");
		  // console.log(object_result.rows); // [{id: 1, name: 'Carlos'}, {id: 2, name: 'John'}, ...]
		  
		await client.end();

		return new Response(JSON.stringify({
			rows: array_result.rows,
			request: request,
		}));
	},
};
