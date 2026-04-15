import { fetchNotes } from "@/lib/api";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
// import type { Note } from "@/types/note";

interface PropsNotePage {
  params: Promise<{
    slug: string[];
  }>;
}

async function NotePage({ params }: PropsNotePage) {
  const { slug } = await params;
  const tag = slug?.[0];
  const queryClient = new QueryClient();
  // const filters = tag && tag !== "all" ? { search: tag } : {};

  // const { notes } = await fetchNotes(filters);
  await queryClient.prefetchQuery({
    queryKey: ["notes", tag],
    queryFn: () => fetchNotes(tag && tag !== "all" ? { search: tag } : {}),
  });
  // const notes: Note[] = notesResponse.notes;
  return (
    // <div>
    //   {notes.map((note) => (
    //     <div key={note.id}>{note.title}</div>
    //   ))}
    // </div>
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
export default NotePage;
