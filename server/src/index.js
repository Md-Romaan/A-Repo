import express from 'express';
import cors from 'cors';
import data from './FloorPlan.json' with {type: "json"}

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/floorplan", async (req, res) => {
    try {

        let floorplan = data;

        return res.status(200).json({
            success: true,
            message: "FloorPlan retrieved successfully",
            data: floorplan
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An error occurred while retrieving the floorplan" });
    }
})

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})