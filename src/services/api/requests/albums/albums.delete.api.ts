import { IDeleteAlbumResponse } from "../../types/albums";
import { deleteRequest } from "../requests.api";

/* 앨범 삭제 */
export const deleteAlbum = async (albumId: number) => {
  const response = await deleteRequest<IDeleteAlbumResponse>(`/albums/${albumId}`);
  return response;
};
