const Journal = require('../models/journal');
const mongoose = require('mongoose')

const createJournalEntry = async (req, res) => {
    try {
        const { title, content, date, userId } = req.body;
        
        
        // Create journal entry
        const journalEntry = await Journal.create({
            user: userId,
            title,
            date,
            content,
        });
        console.log("User ID:", userId);

        return res.json(journalEntry)

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to create journal entry', error: error.message });
    }
};


const getJournalEntries = async (req, res) => {
    try {
        const {userId} = req.query;

        const journalEntries = await Journal.find({ user: userId }).sort({ date: -1 });
        
        res.status(200).json({ success: true, journalEntries });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to fetch journal entries', error: error.message });
    }
};

const getJournalByID = async (req, res) => {
    try {
        const {journalId} = req.params;
        console.log(journalId)

        const journalById = await Journal.findById(journalId)

        if (!journalById){
            return res.status(404).json({ success: false, message: "Journal not found" });
        }

        res.status(200).json({ success: true, journal: journalById });

        
    } catch (error){
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to fetch journal entries', error: error.message });
    }
};



const deleteJournalEntry = async (req, res) => {
    try {
        const { id } = req.params;

        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid journal ID." });
        }

        console.log("Deleting Journal ID:", id);

        const deletedJournal = await Journal.findByIdAndDelete(id);

        if (!deletedJournal) {
            return res.status(404).json({ error: "Journal not found." });
        }

        res.status(200).json({ message: "Journal deleted successfully." });
    } catch (error) {
        console.error("Error deleting journal:", error);
        res.status(500).json({ error: "Failed to delete journal." });
    }
};

const updateJournal = async (req, res) => {
    try {
      const { journalId } = req.params;
      const { title, content } = req.body;
  
      // Find the journal by ID and update it
      const updatedJournal = await Journal.findByIdAndUpdate(
        journalId,
        { title, content },
        { new: true } // Return the updated details
      );
  
      if (!updatedJournal) {
        return res.status(404).json({ success: false, message: "Journal not found" });
      }
  
      res.status(200).json({ success: true, journal: updatedJournal });

    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to update journal", error: error.message });
    }
  };

module.exports = {
    createJournalEntry,
    getJournalEntries,
    deleteJournalEntry,
    getJournalByID,
    updateJournal
}

