import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('authToken');

  config.params = {
      ...config.params,
      key: process.env.EXPO_PUBLIC_TRELLO_API_KEY,
      token: token,
  };
  return config;
});

//BOARDS
// export const createBoard = (name: string, desc?: string) => api.post('/boards', { name, desc });
export const createBoard = (name: string, desc?: string,idBoardSource?:string) => {
    const cleanedName = name.trim();
    return api.post('/boards', { name: cleanedName, desc ,idBoardSource});
  };



export const getAllBoards = () => api.get('/members/me/boards');
export const getBoardIdByName = async (boardName: string): Promise<string | null> => {
    try {
      const response = await getAllBoards();
      const boards = response.data as { id: string; name: string }[];
      const board = boards.find(b =>
        b.name.toLowerCase().trim() === boardName.toLowerCase().trim()
      );
      return board ? board.id : null;
    } catch (error) {
      return null;
    }
  };


export const getBoard = (id: string) => api.get(`/boards/${id}`);

export const updateBoard = (id: string, updates: { name?: string; desc?: string;}) =>
  api.put(`/boards/${id}`, updates);
export const updateBoardByName = async (boardName: string, updates: { name?: string; desc?: string;}) => {
  try {
    const id = await getBoardIdByName(boardName);
    if (!id) {
      throw new Error(`Board "${boardName}" not found`);
    }
    const response = await updateBoard(id, updates);
    return response.data;
  } catch (error) {
    console.error(`Error updating board "${boardName}":`, error);
    throw error;
  }
};

export const deleteBoard = (id: string) => api.delete(`/boards/${id}`);
export const deleteBoardByName = async (boardName: string) => {
  try {
    const id = await getBoardIdByName(boardName);
    if (id) {
      const response = await deleteBoard(id);
      console.log(`Board "${boardName}" deleted`, response.data);
    } else {
      console.error(`Board "${boardName}" not found`);
    }
  } catch (error) {
    console.error(`Not suppressed "${boardName}":`, error);
  }
};

//LIST
export const createList = (name: string, idBoard: string) => api.post('/lists', { name, idBoard });
export const getAllListFromBoard = () => (id: string) => api.get(`boards/${id}/lists`);
export const getIdListByName = async (listName: string, boardName: string): Promise<string | null> => {
  try {
    const boardId = await getBoardIdByName(boardName);
    if (!boardId) {
      console.error(`Tableau "${boardName}" non trouvé`);
      return null;
    }

    const getAllLists = getAllListFromBoard();
    const response = await getAllLists(boardId);
    const lists = response.data as { id: string; name: string }[];

    const list = lists.find(l => l.name.toLowerCase() === listName.toLowerCase());
    return list ? list.id : null;
  } catch (error) {
    console.error(`Erreur lors de la récupération de l'ID de la liste "${listName}":`, error);
    return null;
  }
};
export const getList = (id: string) => api.get(`/lists/${id}`);
export const updateList = (id: string, updates: { name?: string; closed?: boolean;}) =>
  api.put(`/lists/${id}`, updates);
export const updateListByName = async (listName: string, boardName: string, updates: { name?: string; closed?: boolean;}) => {
  try {
    const listId = await getIdListByName(listName, boardName);
    if (!listId) {
      throw new Error(`Liste "${listName}" non trouvée dans le tableau "${boardName}"`);
    }
    const response = await updateList(listId, updates);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la mise à jour de la liste "${listName}":`, error);
    throw error;
  }
};
export const archiveList = (id: string) => updateList(id, { closed: true });
export const archiveListByName = async (listName: string, boardName: string) => {
  try {
    const listId = await getIdListByName(listName, boardName);
    if (!listId) {
      throw new Error(`Liste "${listName}" non trouvée dans le tableau "${boardName}"`);
    }
    const response = await archiveList(listId);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de l'archivage de la liste "${listName}":`, error);
    throw error;
  }
};

//CARDS
export const createCard = (name: string, idList: string, desc?: string) =>
  api.post('/cards', { name, idList, desc});
export const createCardInList = async (cardName: string, listName: string, boardName: string, desc?: string) => {
  try {
    const listId = await getIdListByName(listName, boardName);
    if (!listId) {
      throw new Error(`Liste "${listName}" non trouvée dans le tableau "${boardName}"`);
    }
    const response = await createCard(cardName, listId, desc);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la création de la carte "${cardName}":`, error);
    throw error;
  }
};
export const getCardByList = async (id: string) => {
  try {
    const response = await api.get(`/lists/${id}/cards`);
    return response.data.map((card: { name: string }) => card.name);
  } catch (error) {
    console.error(`Erreur lors de la récupération des cartes pour la liste avec ID "${id}":`, error);
    throw error;
  }
};

export const getCard = (id: string) => api.get(`/cards/${id}`);
export const getCardsByListName = async (listName: string, boardName: string) => {
  try {
    const listId = await getIdListByName(listName, boardName);
    if (!listId) {
      throw new Error(`Liste "${listName}" non trouvée dans le tableau "${boardName}"`);
    }
    const cards = await getCardByList(listId);
    return cards;
  } catch (error) {
    console.error(`Erreur lors de la récupération des cartes pour la liste "${listName}":`, error);
    throw error;
  }
};
export const getCardByName = async (cardName: string, listName: string, boardName: string) => {
    try {
      const listId = await getIdListByName(listName, boardName);
      if (!listId) {
        throw new Error(`Liste "${listName}" non trouvée dans le tableau "${boardName}"`);
      }

      const response = await api.get(`/lists/${listId}/cards`);
      const cards = response.data;
      const card = cards.find((c: { name: string }) => c.name.toLowerCase() === cardName.toLowerCase());

      if (!card) {
        throw new Error(`Carte "${cardName}" non trouvée dans la liste "${listName}"`);
      }

      return card; // contient name, desc, id, etc.
    } catch (error) {
      console.error(`Erreur lors de la récupération de la carte "${cardName}" :`, error);
      throw error;
    }
  };

export const getAllCardsInBoard = async (boardId: string) => {
  try {
    const response = await api.get(`/boards/${boardId}/cards`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération des cartes du tableau avec ID "${boardId}":`, error);
    throw error;
  }
};
export const updateCard = (id: string, updates: { name?: string; desc?: string;}) =>
  api.put(`/cards/${id}`, updates);



export const deleteCard = (id: string) => api.delete(`/cards/${id}`);
export const deleteCardByName = async (cardName: string, listName: string, boardName: string) => {
  try {
    const listId = await getIdListByName(listName, boardName);
    if (!listId) {
      throw new Error(`Liste "${listName}" non trouvée dans le tableau "${boardName}"`);
    }
    const response = await api.get(`/lists/${listId}/cards`);
    const cards = response.data;
    const card = cards.find((c: { name: string }) => c.name.toLowerCase() === cardName.toLowerCase());
    if (!card) {
      throw new Error(`Carte "${cardName}" non trouvée dans la liste "${listName}"`);
    }
    const deleteResponse = await deleteCard(card.id);
    return deleteResponse.data;
  } catch (error) {
    console.error(`Erreur lors de la suppression de la carte "${cardName}":`, error);
    throw error;
  }
};
export function getAllLists() {
    throw new Error("Function not implemented.");
}

export const getBoardMembers = async (boardId: string) => {
  try {
    const response = await api.get(`/boards/${boardId}/members`);
    return response.data;
  } catch (error) {
    console.error(`Error retrieving members for board ${boardId}:`, error);
    throw error;
  }
};

export const getBoardMembersByBoardName = async (boardName: string) => {
  try {
    const boardId = await getBoardIdByName(boardName);
    if (!boardId) {
      throw new Error(`Board "${boardName}" not found`);
    }
    return await getBoardMembers(boardId);
  } catch (error) {
    console.error(`Error retrieving members for board "${boardName}":`, error);
    throw error;
  }
};

export const addMemberToBoard = async (boardId: string, email: string) => {
  try {
    const response = await api.put(`/boards/${boardId}/members`, {
      email: email,
      type: 'normal'
    });
    return response.data;
  } catch (error) {
    console.error(`Error adding member ${email} to board ${boardId}:`, error);
    throw error;
  }
};

export const addMemberToBoardByName = async (boardName: string, email: string) => {
  try {
    const boardId = await getBoardIdByName(boardName);
    if (!boardId) {
      throw new Error(`Board "${boardName}" not found`);
    }
    return await addMemberToBoard(boardId, email);
  } catch (error) {
    console.error(`Error adding member ${email} to board "${boardName}":`, error);
    throw error;
  }
};
export const removeMemberFromBoard = async (boardId: string, memberId: string) => {
  try {
    const response = await api.delete(`/boards/${boardId}/members/${memberId}`);
    return response.data;
  } catch (error) {
    console.error(`Error removing member ${memberId} from board ${boardId}:`, error);
    throw error;
  }
};

export const removeMemberFromBoardByName = async (boardName: string, email: string) => {
  try {
    const boardId = await getBoardIdByName(boardName);
    if (!boardId) {
      throw new Error(`Board "${boardName}" not found`);
    }

    const members = await getBoardMembers(boardId);
    const member = members.find((m: { email: string; id: string }) => m.email === email);

    if (!member) {
      throw new Error(`Member with email ${email} not found on board "${boardName}"`);
    }

    return await removeMemberFromBoard(boardId, member.id);
  } catch (error) {
    console.error(`Error removing member ${email} from board "${boardName}":`, error);
    throw error;
  }
};
export const getCardMembers = async (cardId: string) => {
  try {
    const response = await api.get(`/cards/${cardId}/members`);
    return response.data;
  } catch (error) {
    console.error(`Error retrieving members for card ${cardId}:`, error);
    throw error;
  }
};

export const getCardMembersByName = async (cardName: string, listName: string, boardName: string) => {
  try {
    const listId = await getIdListByName(listName, boardName);
    if (!listId) {
      throw new Error(`Liste "${listName}" non trouvée dans le tableau "${boardName}"`);
    }

    const response = await api.get(`/lists/${listId}/cards`);
    const cards = response.data;
    const card = cards.find((c: { name: string; id: string }) => c.name.toLowerCase() === cardName.toLowerCase());

    if (!card) {
      throw new Error(`Carte "${cardName}" non trouvée dans la liste "${listName}"`);
    }

    return await getCardMembers(card.id);
  } catch (error) {
    console.error(`Erreur lors de la récupération des membres de la carte "${cardName}":`, error);
    throw error;
  }
};

export const addMemberToCard = async (cardId: string, memberId: string) => {
  try {
    const response = await api.post(`/cards/${cardId}/members`, {
      value: memberId
    });
    return response.data;
  } catch (error) {
    console.error(`Error adding member ${memberId} to card ${cardId}:`, error);
    throw error;
  }
};

export const addMemberToCardByName = async (cardName: string, listName: string, boardName: string, memberName: string) => {
  try {
    const boardId = await getBoardIdByName(boardName);
    if (!boardId) {
      throw new Error(`Board "${boardName}" not found`);
    }

    const boardMembers = await getBoardMembers(boardId);
    const member = boardMembers.find((m: { fullName: string; id: string }) => m.fullName.toLowerCase() === memberName.toLowerCase());

    if (!member) {
      throw new Error(`Member with name ${memberName} not found on board "${boardName}"`);
    }

    const listId = await getIdListByName(listName, boardName);
    if (!listId) {
      throw new Error(`Liste "${listName}" non trouvée dans le tableau "${boardName}"`);
    }

    const response = await api.get(`/lists/${listId}/cards`);
    const cards = response.data;
    const card = cards.find((c: { name: string; id: string }) => c.name.toLowerCase() === cardName.toLowerCase());

    if (!card) {
      throw new Error(`Carte "${cardName}" non trouvée dans la liste "${listName}"`);
    }

    return await addMemberToCard(card.id, member.id);
  } catch (error) {
    console.error(`Erreur lors de l'ajout du membre à la carte "${cardName}":`, error);
    throw error;
  }
};

export const removeMemberFromCard = async (cardId: string, memberId: string) => {
  try {
    const response = await api.delete(`/cards/${cardId}/members/${memberId}`);
    return response.data;
  } catch (error) {
    console.error(`Error removing member ${memberId} from card ${cardId}:`, error);
    throw error;
  }
};

export const removeMemberFromCardByName = async (cardName: string, listName: string, boardName: string, memberName: string) => {
  try {
    const boardId = await getBoardIdByName(boardName);
    if (!boardId) {
      throw new Error(`Board "${boardName}" not found`);
    }

    const boardMembers = await getBoardMembers(boardId);
    const member = boardMembers.find((m: { fullName: string; id: string }) => m.fullName.toLowerCase() === memberName.toLowerCase());

    if (!member) {
      throw new Error(`Member with name ${memberName} not found on board "${boardName}"`);
    }

    const listId = await getIdListByName(listName, boardName);
    if (!listId) {
      throw new Error(`Liste "${listName}" non trouvée dans le tableau "${boardName}"`);
    }

    const response = await api.get(`/lists/${listId}/cards`);
    const cards = response.data;
    const card = cards.find((c: { name: string; id: string }) => c.name.toLowerCase() === cardName.toLowerCase());

    if (!card) {
      throw new Error(`Carte "${cardName}" non trouvée dans la liste "${listName}"`);
    }

    return await removeMemberFromCard(card.id, member.id);
  } catch (error) {
    console.error(`Erreur lors de la suppression du membre de la carte "${cardName}":`, error);
    throw error;
  }
};

//ORGANISATIONS
export const createOrganization = (displayName: string) => {
  return api.post('/organizations', { displayName });
};

export const getAllOrganizations = () => api.get('/members/me/organizations');

export const getOrganizationIdByName = async (orgName: string): Promise<string | null> => {
  try {
    const response = await getAllOrganizations();
    const organizations = response.data as { id: string; displayName: string }[];
    const organization = organizations.find(org => 
      org.displayName.toLowerCase().trim() === orgName.toLowerCase().trim()
    );
    return organization ? organization.id : null;
  } catch (error) {
    console.error(`Erreur lors de la récupération de l'ID de l'organisation "${orgName}":`, error);
    return null;
  }
};

export const getOrganization = (id: string) => api.get(`/organizations/${id}`);

export const getOrganizationByName = async (orgName: string) => {
  try {
    const orgId = await getOrganizationIdByName(orgName);
    if (!orgId) {
      throw new Error(`Organisation "${orgName}" non trouvée`);
    }
    const response = await getOrganization(orgId);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération de l'organisation "${orgName}":`, error);
    throw error;
  }
};

export const updateOrganization = (id: string, updates: { displayName?: string;}) =>
  api.put(`/organizations/${id}`, updates);

export const updateOrganizationByName = async (orgName: string, updates: { displayName?: string;}) => {
  try {
    const orgId = await getOrganizationIdByName(orgName);
    if (!orgId) {
      throw new Error(`Organisation "${orgName}" non trouvée`);
    }
    const response = await updateOrganization(orgId, updates);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la mise à jour de l'organisation "${orgName}":`, error);
    throw error;
  }
};

export const deleteOrganization = (id: string) => api.delete(`/organizations/${id}`);

export const deleteOrganizationByName = async (orgName: string) => {
  try {
    const orgId = await getOrganizationIdByName(orgName);
    if (!orgId) {
      throw new Error(`Organisation "${orgName}" non trouvée`);
    }
    const response = await deleteOrganization(orgId);
    console.log(`Organisation "${orgName}" supprimée`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la suppression de l'organisation "${orgName}":`, error);
    throw error;
  }
};

export const getOrganizationBoards = async (orgId: string) => {
  try {
    const response = await api.get(`/organizations/${orgId}/boards`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération des tableaux de l'organisation avec ID "${orgId}":`, error);
    throw error;
  }
};

export const getOrganizationBoardsByName = async (orgName: string) => {
  try {
    const orgId = await getOrganizationIdByName(orgName);
    if (!orgId) {
      throw new Error(`Organisation "${orgName}" non trouvée`);
    }
    return await getOrganizationBoards(orgId);
  } catch (error) {
    console.error(`Erreur lors de la récupération des tableaux de l'organisation "${orgName}":`, error);
    throw error;
  }
};

export const createBoardInOrganization = async (name: string, orgId: string, desc?: string, idBoardSource?:string) => {
  try {
    const cleanedName = name.trim();
    return api.post('/boards', { name: cleanedName, desc, orgId, idBoardSource});
  } catch (error) {
    console.error(`Erreur lors de la création du tableau "${name}" dans l'organisation avec ID "${orgId}":`, error);
    throw error;
  }
};

export const createBoardInOrganizationByName = async (boardName: string, orgName: string, desc?: string, idBoardSource?:string) => {
  try {
    const orgId = await getOrganizationIdByName(orgName);
    if (!orgId) {
      throw new Error(`Organisation "${orgName}" non trouvée`);
    }
    return await createBoardInOrganization(boardName, orgId, desc, idBoardSource);
  } catch (error) {
    console.error(`Erreur lors de la création du tableau "${boardName}" dans l'organisation "${orgName}":`, error);
    throw error;
  }
};
