"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchNotes } from "@/lib/api";
import css from "./NotesPage.module.css";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

export default function NotesClient({ activeTag }: { activeTag?: string }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [modalState, setModalState] = useState(false);
  const [query, setQuery] = useState("");

  const { data } = useQuery({
    queryKey: ["notes", currentPage, query, activeTag],
    queryFn: () => fetchNotes(currentPage, query, activeTag),
    placeholderData: keepPreviousData,
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox
          query={query}
          setState={(newQuery: string, page: number) => {
            setQuery(newQuery);
            setCurrentPage(page);
          }}
        />

        {data && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={currentPage}
            setPage={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={() => setModalState(true)}>
          Create note +
        </button>
      </header>

      <NoteList notes={data?.notes} />

      {modalState && (
        <Modal onClose={() => setModalState(false)}>
          <NoteForm onClose={() => setModalState(false)} />
        </Modal>
      )}
    </div>
  );
}
