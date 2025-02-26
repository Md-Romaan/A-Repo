import axios from 'axios';
import React, { useEffect, useState } from 'react';

const App = () => {

  const [floorPlanData, setFloorPlan] = useState({});
  const [error, setError] = useState("");


  const getFloorPlan = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/floorplan");
      if (response.data.success) {
        setFloorPlan(response.data.data);
      }
    } catch (error) {
      setError(error.response.data.message)
    }
  }

  useEffect(() => {
    getFloorPlan();
    // Clean up the function
    return () => {
      setError("")
    }
  }, [])


  return (
    <>
      {error && <h1 style={{ color: "red", backgroundColor: "pink", padding: "10px", borderRadius: "10px" }}>{error}</h1>}

      <div style={{ position: "relative", width: "1000px", height: "500px", border: "1px solid black" }}>
        {floorPlanData?.floorPlan?.rooms?.map((room) => (
          <div
            key={room.id}
            style={{
              position: "absolute",
              left: room.x,
              top: room.y,
              width: room.width,
              height: room.height,
              border: "2px solid black",
              boxSizing: "border-box"
            }}
          >
            <span style={{ position: "absolute", top: "10px", left: "10px" }}>{room.name}</span>
            {room?.doors?.map((door, index) => (
              <div
                key={index}
                style={{
                  position: "absolute",
                  left: door.x - room.x,
                  top: door.y - room.y,
                  width: door.width,
                  height: door.height,
                  backgroundColor: "brown"
                }}
              ></div>
            ))}
            {room?.windows?.map((window, index) => (
              <div
                key={index}
                style={{
                  position: "absolute",
                  left: window.x - room.x,
                  top: window.y - room.y,
                  width: window.width,
                  height: window.height,
                  backgroundColor: "blue"
                }}
              ></div>
            ))}
          </div>
        ))}
        {floorPlanData?.floorPlan?.walls?.map((wall, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              left: Math.min(wall.startX, wall.endX),
              top: Math.min(wall.startY, wall.endY),
              width: Math.abs(wall.endX - wall.startX) || 2,
              height: Math.abs(wall.endY - wall.startY) || 2,
              backgroundColor: "black"
            }}
          ></div>
        ))}
      </div>
    </>
  )
}

export default App