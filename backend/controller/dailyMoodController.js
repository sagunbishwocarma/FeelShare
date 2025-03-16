const DailyMood = require('../models/dailyMood');
const mongoose = require('mongoose')

const addDailyMood= async (req, res) => {
    try {
        const { mood, notes, date, userId } = req.body;   
        
        // Create journal entry
        const  dailyMood = await DailyMood.create({
            user: userId,
            mood,
            date,
            notes,
        });
        console.log("User ID:", userId);

        return res.json(dailyMood)

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to store daily Mood', error: error.message });
    }
};

const getDailyMood = async (req, res) => {
    try{
        
        const {userId} = req.query;
        console.log ('UserId:', userId)

        const moodEntries = await DailyMood.find({ user : userId }) .sort({ date: -1 });
        
        res.status(200).json({ success: true, moodEntries });

    } catch (error) {
        console.error(error);
        res.json('Failed to get the daily mood')
    }
}

const getMoodByID = async (req, res) => {
    try {
        const {moodId} = req.params;
        console.log(moodId)

        const moodById = await DailyMood.findById(moodId)

        if (!moodById){
            return res.status(404).json({ success: false, message: "Mood not found" });
        }

        res.status(200).json({ success: true, dailyMood: moodById });

        
    } catch (error){
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to fetch mood entries', error: error.message });
    }
};

const updateMood = async (req, res) => {
    try {
      const { moodId } = req.params;
      const { mood, notes } = req.body;
  
      // Find the journal by ID and update it
      const updatedMood = await DailyMood.findByIdAndUpdate(
        moodId,
        { mood, notes },
        { new: true } // Return the updated details
      );
  
      if (!updatedMood) {
        return res.status(404).json({ success: false, message: "Mood not found" });
      }
  
      res.status(200).json({ success: true, dailyMood: updatedMood });

    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to update selected Mood", error: error.message });
    }
  };

  const deleteDailyMood = async (req, res) => {
    try {
        const { id } = req.params;

        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid Daily Mood ID." });
        }

        console.log("Deleting Selected Mood:", id);

        const deletedMood = await DailyMood.findByIdAndDelete(id);

        if (!deletedMood) {
            return res.status(404).json({ error: "Selected mood not found." });
        }

        res.status(200).json({ message: "Mood deleted successfully." });
    } catch (error) {
        console.error("Error deleting selected mood:", error);
        res.status(500).json({ error: "Failed to delete selected mood." });
    }
};

module.exports = {
    addDailyMood,
    getDailyMood,
    getMoodByID,
    updateMood,
    deleteDailyMood
}