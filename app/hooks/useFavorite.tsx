import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import { SafeUser } from "../types";
import axios from "axios";
import useLoginModal from "./useLoginModal";

interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null;
}

export const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const loginModal = useLoginModal();
  const router = useRouter();
  const hasFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (!currentUser) {
        return loginModal.onOpen();
      }
      try {
        let request;
        let fav;
        if (!hasFavorite) {
          request = () => axios.post(`/api/favorites/${listingId}`);
          fav = false;
        } else {
          request = () => axios.delete(`/api/favorites/${listingId}`);
          fav = true;
        }
        await request();
        toast.success(
          `${!fav ? "Added to favorites" : "Removed from favorites"}`
        );
        router.refresh();
      } catch (error) {
        toast.error("Something went wrong!");
      }
    },
    [currentUser, hasFavorite, listingId, loginModal, router]
  );
  return {
    hasFavorite,
    toggleFavorite,
  };
};
