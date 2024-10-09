const localStorageService = require('../services/local-storage.service');

/**
 * @swagger
 * /api/result/{quizId}/{userId}:
 *   get:
 *     summary: Get results for a specific quiz by user ID.
 *     tags: [Results]
 *     parameters:
 *       - name: quizId
 *         in: path
 *         required: true
 *         description: The ID of the quiz for which results are being requested.
 *         schema:
 *           type: string
 *       - name: userId
 *         in: path
 *         required: true
 *         description: The ID of the user whose results are being requested.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved results.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Data fetched successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       quizId:
 *                         type: string
 *                         example: "1728452674674"
 *                       userId:
 *                         type: string
 *                         example: "123"
 *                       answers:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             questionId:
 *                               type: string
 *                               example: "1728452674675"
 *                             selectedOption:
 *                               type: string
 *                               example: "London"
 *                             isCorrect:
 *                               type: boolean
 *                               example: false
 *       404:
 *         description: Results not found.
 *       500:
 *         description: Internal server error.
 */
exports.getResults = (req, res) => {
    try {
        const { quizId, userId } = req.params;
        // Fetch results based on quizId and userId
        const results = localStorageService.getResultsByQuizId(quizId, userId);
        
        // If no results are found, return an appropriate message
        if (!results || results.length === 0) {
            return res.status(200).json({ statusCode: 200, message: 'No results found' });
        }

        // Return the fetched results
        res.status(200).json({statusCode: 200, message: 'Data fetch successfully', data: results});
    } catch (error) {
        // Log the error and send a 500 response with a generic error message
        console.error('Error fetching results:', error);
        res.status(500).json({ statusCode: 500, message: 'Internal server error' });
    }
};

