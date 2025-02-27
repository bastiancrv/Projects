import { useEffect, useState } from "react";
import { baseUrl, getRequest } from "../utils/services";

/**
 * Récupère les informations du destinataire pour un chat donné.
 * @param {Array} userChats - Liste des chats de l'utilisateur.
 * @param {Object} user - Utilisateur actuel.
 * @returns {Promise<Array>} - Liste des chats avec le nom du destinataire ajouté.
 */
export const fetchChatsWithRecipients = async (userChats, user) => {
  if (!userChats || userChats.length === 0) {
    return [];
  }

  return await Promise.all(
    userChats.map(async (chat) => {
      const recipientId = chat?.members?.find((id) => id !== user?._id);

      if (!recipientId) {
        return { ...chat, recipientName: "Unknown" };
      }

      try {
        const response = await getRequest(`${baseUrl}/users/find/${recipientId}`);
        return {
          ...chat,
          recipientName: response?.name || "Unknown",
        };
      } catch (err) {
        console.error(`Error fetching recipient for chat ${chat._id}`, err);
        return { ...chat, recipientName: "Error" };
      }
    })
  );
};


export const useFetchRecipientUser = (chat, user) => {
  const [recipientUser, setRecipientUser] = useState(null);
  const [error, setError] = useState(null);

  const recipientId = chat?.members?.find((id) => id !== user?._id);

  useEffect(() => {
    const getUser = async () => {
      if (!recipientId) return;

      try {
        const response = await getRequest(
          `${baseUrl}/users/find/${recipientId}`
        );

        if (response.error) {
          setError(response.error);
        } else {
          setRecipientUser(response);
        }
      } catch (err) {
        setError(err.message || "An unexpected error occurred");
      }
    };

    getUser();
  }, [recipientId]);

  return { recipientUser, error };
};
