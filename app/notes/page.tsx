import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

const PER_PAGE = 12;

export default async function NotesPage() {
  const queryClient = new QueryClient();

  const page = 1;
  const search = "";

  await queryClient.prefetchQuery({
    queryKey: ["notes", { page, perPage: PER_PAGE, search }],
    queryFn: () => fetchNotes({ page, perPage: PER_PAGE, search }),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesClient initialPage={page} />
    </HydrationBoundary>
  );
}
