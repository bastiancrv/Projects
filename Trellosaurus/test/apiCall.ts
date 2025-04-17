import axios from 'axios';
import {envVars} from './envvars';

const EXPO_PUBLIC_API_URL = envVars['EXPO_PUBLIC_API_URL'];
const EXPO_PUBLIC_TRELLO_API_KEY = envVars['EXPO_PUBLIC_TRELLO_API_KEY'];
const EXPO_PUBLIC_TRELLO_TOKEN = envVars['EXPO_PUBLIC_TRELLO_TOKEN'];

const api = axios.create({
    baseURL:EXPO_PUBLIC_API_URL,
    timeout: 10000
})

api.interceptors.request.use((config) => {
    config.params = {
        ...config.params,
        key:EXPO_PUBLIC_TRELLO_API_KEY,
        token: EXPO_PUBLIC_TRELLO_TOKEN,
    };
    return config;
})

export const createBoard =(name: string, desc?:string) => api.post('/boards',{name,desc});
export const deleteBoard = (id: string) => api.delete(`/boards/${id}`);
export const getAllBoards = () => api.get('/members/me/boards');
export const getBoardIdByName = async (boardName: string): Promise<string | null> => {
    try {
        const response = await getAllBoards();
        const boards = response.data as { id: string; name: string }[];
        const board = boards.find(b => b.name.toLowerCase() === boardName.toLowerCase());
        return board ? board.id : null;
    } catch (error) {
        return null;
    }
};
export const deleteBoardByName = async (boardName: string) => {
    try {
        const id = await getBoardIdByName(boardName);
        if (id) {
            const response = await deleteBoard(id);
            console.log(`Board "${boardName}" supprimé avec succès.`, response.data);
        } else {
            console.error(`Board "${boardName}" non trouvé.`);
        }
    } catch (error) {
        console.error(`Erreur lors de la suppression du board "${boardName}":`, error);
    }
};

