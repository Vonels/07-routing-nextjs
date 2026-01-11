import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import css from "./NotesPage.module.css";
import NotesClient from "./Notes.client";

export default async function MainNotesPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const slugValue = slug?.[0];

  const activeTag = slugValue === "all" || !slugValue ? undefined : slugValue;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", activeTag],
    queryFn: () => fetchNotes(1, "", activeTag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className={css.app}>
        <NotesClient activeTag={activeTag} />
      </div>
    </HydrationBoundary>
  );
}
