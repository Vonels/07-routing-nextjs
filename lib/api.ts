import axios from "axios";
import type { FetchNotesParams, FetchNotesResponse, Note } from "../types/note";

const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
});

api.interceptors.request.use((config) => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN as string | undefined;

  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const fetchNotes = async (
  params: FetchNotesParams
): Promise<FetchNotesResponse> => {
  const { page = 1, perPage = 12, search = "" } = params;

  const response = await api.get<FetchNotesResponse>("/notes", {
    params: { page, perPage, search: search || undefined },
  });

  return response.data;
};

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: Note["tag"];
}

export const createNote = async (payload: CreateNotePayload): Promise<Note> => {
  const response = await api.post<Note>("/notes", payload);
  return response.data;
};

export const deleteNote = async (id: string): Promise<{ id: string }> => {
  const response = await api.delete<{ id: string }>(`/notes/${id}`);
  return response.data;
};

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
}

console.log("TOKEN:", process.env.NEXT_PUBLIC_NOTEHUB_TOKEN);
