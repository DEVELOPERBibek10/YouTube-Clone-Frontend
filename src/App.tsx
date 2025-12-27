import {
  Provider,
  QueryClient,
  QueryClientProvider,
  RouterProvider,
} from "./index";
import { store } from "./lib/Redux/store";
import { route } from "../routes/Routes";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <main className="flex h-screen">
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <RouterProvider router={route} />
        </Provider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </main>
  );
}

export default App;
