const Article= require('../models/articles');

const createArticle = async (req, res) => {
    try {
        const { title, content, date, professionalId, source, emailAddress} = req.body;
        
        
        // Create article entry
        const articleEntry = await Article.create({
            professional: professionalId,
            title,
            date,
            content,
            source,
            email: emailAddress,
        });

        return res.json(articleEntry)
        console.log("Professional Id:", professional)

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to create article entry', error: error.message });
    }
};


const getArticles = async (req, res) => {
    try {
        
        const articleEntry = await Article.find({});
        console.log(articleEntry, "article");
        // Send the response
        res.status(200).json({ success: true, articleEntry });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to fetch articles', error: error.message });
    }
};

// const deleteArticle = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const journalEntry = await Article.findByIdAndDelete(id);

//         if (!articleEntry) {
//             return res.status(404).json({ success: false, message: 'Article entry not found' });
//         }

//         res.status(200).json({ success: true, message: 'Article entry deleted' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: 'Failed to delete article entry' });
//     }
// };

module.exports = {
    createArticle,
    getArticles
}

