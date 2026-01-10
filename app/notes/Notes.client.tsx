"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

import { fetchNotes } from "@/lib/api";
import type { FetchNotesParams, FetchNotesResponse } from "@/types/note";

import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";

import css from "./NotesPage.module.css";

const PER_PAGE = 12;

type Props = {
  initialPage: number;
};

export default function NotesClient({ initialPage }: Props) {
  const [page, setPage] = useState(initialPage);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryParams: FetchNotesParams = {
    page,
    perPage: PER_PAGE,
    search: debouncedSearch,
  };

  const { data, isLoading, isError, error, isFetching } =
    useQuery<FetchNotesResponse>({
      queryKey: ["notes", queryParams],
      queryFn: () => fetchNotes(queryParams),
      placeholderData: keepPreviousData,
    });

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const totalPages = data?.totalPages ?? 0;
  const notes = data?.notes ?? [];

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />

        {totalPages > 1 && (
          <Pagination
            currentPage={page}
            pageCount={totalPages}
            onChangePage={setPage}
          />
        )}

        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {isLoading && <Loader />}

      {isError && <ErrorMessage message={(error as Error).message} />}

      {!isLoading && !isError && notes.length > 0 && <NoteList notes={notes} />}

      {isFetching && !isLoading && <Loader />}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onCancel={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
