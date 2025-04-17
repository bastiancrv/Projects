import {createBoard, getAllBoards, getBoardIdByName, deleteBoard, deleteBoardByName} from './apiCall';

const BOARD_NAME = 'Test Board JEST';
const BOARD_DESC = 'Test du Board avec JEST';

describe('Tests API Trello', () => {
    let boardId: string | null = null;

    test('Créer un board', async () => {
        const response = await createBoard(BOARD_NAME, BOARD_DESC);
        boardId = response.data.id; 

        expect(response.status).toBe(200);
        expect(response.data.name).toBe(BOARD_NAME);
        console.log(`Board créé avec ID: ${boardId}`);
    });

    test('Récupérer tous les boards', async () => {
        const response = await getAllBoards();
        expect(response.status).toBe(200);
        expect(Array.isArray(response.data)).toBe(true);
    });

    test('Retourner l\'ID du board', async () => {
        const foundBoardId = await getBoardIdByName(BOARD_NAME);
        expect(foundBoardId).toBe(boardId);
    });

    test('Supprimer le board', async () => {
        if (boardId) {
            const response = await deleteBoard(boardId);
            expect(response.status).toBe(200);
            console.log(`Board supprimé avec succès: ${boardId}`);
        } else {
            throw new Error('Aucun board à supprimer');
        }
    });

    test('Retourner null après suppression', async () => {
        const foundBoardId = await getBoardIdByName(BOARD_NAME);
        expect(foundBoardId).toBeNull();
    });

    test('Afficher une erreur si le board n\'existe pas', async () => {
        console.error = jest.fn();
        await deleteBoardByName(BOARD_NAME);
        expect(console.error).toHaveBeenCalledWith(expect.stringContaining('non trouvé'));
    });
});
