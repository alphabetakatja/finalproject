import React, { useState, useEffect } from "react";
import axios from "axios";

const API_TOKEN = "Bearer ZVNCFJ4MIZKPW4EYKS";
const SEARCH_URL = "http://eventful.com/events?q=";

// API_TOKEN mTBHvgKb7QxXP352

export function Events() {
    const [events, setEvents] = useState([]);
    const [searchEvent, setSearchEvent] = useState("");
    // const [newEvents, setNewEvents] = useState([]);

    if (!events) {
        return null;
    }

    useEffect(() => {
        if (searchEvent != "") {
            axios
                .get(`${SEARCH_URL}${searchEvent}`, {
                    method: "GET",
                    headers: {
                        Authorization: API_TOKEN
                    }
                })
                .then(({ data }) => {
                    console.log("data in searchEvent API request: ", data);
                    setEvents(data);
                })
                .catch(err => console.log("error in searchEvent: ", err));
        }
    }, [searchEvent]);

    return (
        <div className="search-event">
            <h4>Are you looking for something in particular?</h4>
            <input
                className="search-field"
                onChange={e => setSearchEvent(e.target.value)}
                placeholder="Find Events by Category"
            />
        </div>
    );
}
