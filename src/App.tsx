import {
  Provider,
  QueryClient,
  QueryClientProvider,
  RouterProvider,
} from "./index";
import { store } from "./lib/Redux/store";
import { route } from "../routes/Routes";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return (
    <main className="flex h-screen">
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <RouterProvider router={route} />
        </Provider>
      </QueryClientProvider>
    </main>
  );
}

export default App;
